<?php

namespace App\Support;

final class SupplyPermissions
{
    public const MANAGERS = [
        'dashboard' => ['super_admin', 'admin_suprimentos', 'admin_orcamentos', 'admin_contratos'],
        'requisicoes' => ['super_admin', 'admin_suprimentos'],
        'orcamentos' => ['super_admin', 'admin_orcamentos'],
        'contratos' => ['super_admin', 'admin_contratos'],
        'fornecedores' => ['super_admin', 'admin_suprimentos'],
        'importacoes' => ['super_admin', 'admin_suprimentos', 'admin_orcamentos', 'admin_contratos'],
        'usuarios' => ['super_admin'],
    ];

    public const VIEWERS = [
        'dashboard' => ['super_admin', 'admin_suprimentos', 'admin_orcamentos', 'admin_contratos', 'viewer_global', 'viewer'],
        'requisicoes' => ['super_admin', 'admin_suprimentos', 'viewer_global', 'viewer'],
        'orcamentos' => ['super_admin', 'admin_orcamentos', 'viewer_global', 'viewer'],
        'contratos' => ['super_admin', 'admin_contratos', 'viewer_global', 'viewer'],
        'fornecedores' => ['super_admin', 'admin_suprimentos', 'viewer_global', 'viewer'],
        'importacoes' => ['super_admin', 'admin_suprimentos', 'admin_orcamentos', 'admin_contratos'],
        'usuarios' => ['super_admin'],
    ];

    public static function canView(?string $role, string $module): bool
    {
        return $role !== null && in_array($role, self::VIEWERS[$module] ?? [], true);
    }

    public static function canManage(?string $role, string $module): bool
    {
        return $role !== null && in_array($role, self::MANAGERS[$module] ?? [], true);
    }

    public static function isGlobalViewer(?string $role): bool
    {
        return $role === 'viewer_global';
    }
}
