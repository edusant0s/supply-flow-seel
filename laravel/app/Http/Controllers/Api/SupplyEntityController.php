<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Contrato;
use App\Models\Fornecedor;
use App\Models\Importacao;
use App\Models\Orcamento;
use App\Models\Profile;
use App\Models\Requisicao;
use App\Support\SupplyPermissions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplyEntityController extends Controller
{
    /** @var array<string, class-string<Model>> */
    private array $models = [
        'requisicoes' => Requisicao::class,
        'orcamentos' => Orcamento::class,
        'contratos' => Contrato::class,
        'fornecedores' => Fornecedor::class,
        'importacoes' => Importacao::class,
    ];

    public function index(Request $request, string $entity): JsonResponse
    {
        $profile = $this->profile($request);
        $this->authorizeEntity($profile, $entity, 'view');

        /** @var class-string<Model> $model */
        $model = $this->model($entity);
        $query = $model::query()->latest($entity === 'importacoes' ? 'created_at' : 'updated_at');

        $this->applyObraScope($query, $profile, $entity);

        return response()->json($query->paginate((int) $request->integer('per_page', 100)));
    }

    public function store(Request $request, string $entity): JsonResponse
    {
        $profile = $this->profile($request);
        $this->authorizeEntity($profile, $entity, 'manage');

        /** @var class-string<Model> $model */
        $model = $this->model($entity);
        $record = $model::query()->create($request->all());

        $this->audit($profile, 'create', $entity, $record->getKey(), null, $record->toArray());

        return response()->json($record, 201);
    }

    public function update(Request $request, string $entity, string $id): JsonResponse
    {
        $profile = $this->profile($request);
        $this->authorizeEntity($profile, $entity, 'manage');

        /** @var class-string<Model> $model */
        $model = $this->model($entity);
        $record = $model::query()->findOrFail($id);
        $before = $record->toArray();
        $record->fill($request->all());
        $record->save();

        $this->audit($profile, 'update', $entity, $record->getKey(), $before, $record->toArray());

        return response()->json($record);
    }

    public function destroy(Request $request, string $entity, string $id): JsonResponse
    {
        $profile = $this->profile($request);
        $this->authorizeEntity($profile, $entity, 'manage');

        /** @var class-string<Model> $model */
        $model = $this->model($entity);
        $record = $model::query()->findOrFail($id);
        $before = $record->toArray();
        $record->delete();

        $this->audit($profile, 'delete', $entity, $id, $before, null);

        return response()->json(['deleted' => true]);
    }

    private function model(string $entity): string
    {
        abort_unless(isset($this->models[$entity]), 404, 'Entidade nao suportada.');

        return $this->models[$entity];
    }

    private function profile(Request $request): Profile
    {
        $profileId = $request->header('X-Profile-Id');
        abort_unless($profileId, 401, 'Perfil nao informado. Integrar com Sanctum/JWT antes de producao.');

        /** @var Profile $profile */
        $profile = Profile::query()->whereKey($profileId)->where('ativo', true)->firstOrFail();

        return $profile;
    }

    private function authorizeEntity(Profile $profile, string $entity, string $action): void
    {
        $allowed = $action === 'manage'
            ? SupplyPermissions::canManage($profile->role, $entity)
            : SupplyPermissions::canView($profile->role, $entity);

        abort_unless($allowed, 403, 'Sem permissao para esta operacao.');
    }

    private function applyObraScope(Builder $query, Profile $profile, string $entity): void
    {
        if ($profile->role !== 'viewer' || !in_array($entity, ['requisicoes', 'contratos'], true)) {
            return;
        }

        $query->whereIn('obra_id', function ($subquery) use ($profile) {
            $subquery->select('obra_id')->from('user_obras')->where('user_id', $profile->id);
        });
    }

    private function audit(Profile $profile, string $acao, string $entity, string $id, ?array $antes, ?array $depois): void
    {
        AuditLog::query()->create([
            'usuario_id' => $profile->id,
            'acao' => $acao,
            'entidade' => $entity,
            'entidade_id' => $id,
            'antes' => $antes,
            'depois' => $depois,
        ]);
    }
}
