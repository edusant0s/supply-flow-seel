var e=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEEL | Supply Flow - Cadastro de Itens</title>
<style>
:root{
  --navy:#0b3553;--navy2:#072a43;--blue:#075985;--blue2:#0a6d9d;--yellow:#f5c400;
  --bg:#f3f6f8;--surface:#fff;--line:#d9e3e8;--text:#173248;--muted:#6d8290;
  --green:#159a67;--orange:#ea7a19;--red:#dc3545;--slate:#64748b;--shadow:0 10px 30px rgba(15,53,80,.08);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,"Segoe UI",Arial,sans-serif;min-height:100vh}
button,input,select,textarea{font-family:inherit}
button{border:0;cursor:pointer;font-weight:800}
.hidden{display:none!important}
.sf-app{min-height:100vh;display:block}
.sidebar{position:fixed;inset:0 auto 0 0;width:248px;background:linear-gradient(180deg,var(--navy2),var(--navy));color:#fff;padding:20px 14px 16px;display:flex;flex-direction:column;z-index:60;box-shadow:12px 0 32px rgba(3,28,45,.12);transition:.25s}
.brand{display:flex;align-items:center;gap:12px;padding:0 8px 20px;border-bottom:1px solid rgba(255,255,255,.12)}
.brand-logo{width:48px;height:48px;border-radius:13px;background:var(--yellow);color:var(--navy);display:grid;place-items:center;font-weight:950;font-size:14px;letter-spacing:.08em;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.brand-copy{display:grid;gap:2px}.brand-copy strong{font-size:15px;letter-spacing:.08em}.brand-copy span{font-size:10px;color:#b9d1df}
.nav-label{font-size:10px;letter-spacing:.15em;color:#82a6ba;font-weight:900;padding:22px 14px 10px}
.side-nav{display:grid;gap:6px}.side-link{width:100%;min-height:46px;padding:0 13px;border-radius:12px;color:#cbdce6;background:transparent;display:flex;align-items:center;gap:12px;font-size:13px;text-align:left;position:relative}.side-link svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}.side-link:hover{background:rgba(255,255,255,.08);color:#fff}.side-link.active{background:linear-gradient(90deg,rgba(245,196,0,.2),rgba(245,196,0,.07));color:#fff}.side-link.active:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--yellow)}
.sidebar-spacer{flex:1}.sidebar-footer{display:flex;align-items:center;gap:10px;margin-top:14px;padding:12px 10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:14px}.avatar{width:36px;height:36px;background:var(--yellow);color:var(--navy);display:grid;place-items:center;border-radius:50%;font-size:11px;font-weight:900}.sidebar-footer div:last-child{display:grid;gap:2px}.sidebar-footer strong{font-size:11px}.sidebar-footer span{font-size:9px;color:#adc6d4}
.workspace{width:100%;margin-left:0;min-height:100vh}
.tabs{max-width:calc(1600px - 68px);margin:24px auto 0;position:sticky;top:0;z-index:40;background:#fff;backdrop-filter:blur(12px);border:1px solid #d6e1e7;border-radius:22px;padding:10px 12px;display:flex;gap:10px;box-shadow:0 8px 22px rgba(15,53,80,.06);overflow-x:auto}.tab{min-height:54px;border-radius:16px;color:#5f7889;padding:0 18px;background:transparent;display:flex;align-items:center;gap:10px;font-size:15px;font-weight:900;white-space:nowrap;flex:none;transition:all .18s ease}.tab:hover{background:#f6f9fb;color:var(--navy);transform:translateY(-1px)}.tab.active{background:var(--yellow);color:var(--navy);box-shadow:0 8px 20px rgba(245,196,0,.28)}.tab-icon{width:34px;height:34px;border-radius:11px;display:inline-flex;align-items:center;justify-content:center;flex:none;background:#edf4f7;border:1px solid #d7e3e9;color:var(--blue);transition:all .18s ease}.tab-icon svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}.tab:hover .tab-icon{background:#fff;border-color:#c8d8e1;color:var(--navy)}.tab.active .tab-icon{background:var(--navy);border-color:var(--navy);color:var(--yellow);box-shadow:0 5px 12px rgba(11,53,83,.2)}.tab-dot{display:none}
main{max-width:1600px;margin:0 auto;padding:22px 34px 46px}.view{display:none}.view.active{display:block;animation:fadeUp .24s ease both}@keyframes fadeUp{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
.panel,.section,.kpi,.chart-card,.toolbar{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow)}.panel{padding:24px}.panel-head{display:flex;justify-content:space-between;gap:16px;align-items:center;padding-bottom:18px;margin-bottom:20px;border-bottom:1px solid var(--line)}.panel-head h2{margin:0;color:var(--navy);font-size:22px}.panel-head p{margin:5px 0 0;color:var(--muted);font-size:13px;line-height:1.45}.pill{background:#eef5f8;color:var(--blue);border:1px solid #d8e8f0;border-radius:999px;padding:8px 12px;font-size:11px;font-weight:900;white-space:nowrap}
.section{margin-bottom:16px;overflow:hidden;box-shadow:none;border-radius:15px}.section-title{background:#f0f5f8;color:var(--navy);border-bottom:1px solid var(--line);padding:13px 16px;font-size:14px;font-weight:900}.section-title:before{content:"";display:inline-block;width:4px;height:16px;background:var(--yellow);border-radius:3px;vertical-align:-3px;margin-right:9px}.section-body{padding:18px 18px 20px}.form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px 16px}.field.full{grid-column:1/-1}.field.span2{grid-column:span 2}label{display:block;font-size:12px;font-weight:850;color:#365166}.req{color:var(--red)}input,select,textarea{width:100%;margin-top:7px;border:1px solid #cedbe3;border-radius:10px;background:#fff;padding:10px 11px;color:var(--text);font-size:13px;outline:0;transition:.15s}input:hover,select:hover,textarea:hover{border-color:#aebfca}input:focus,select:focus,textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(7,89,133,.1)}input[readonly]{background:#f3f7f9;color:#667f8e;cursor:not-allowed}textarea{min-height:90px;resize:vertical}.help{margin-top:6px;color:var(--muted);font-size:11px;line-height:1.35}.rule-box{background:#fff9d9;border:1px solid #f2d86d;border-left:4px solid var(--yellow);border-radius:12px;padding:11px 13px;color:#6b5900;font-size:11px;line-height:1.45;margin-top:12px}
.actions{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;padding-top:16px;border-top:1px solid var(--line);margin-top:16px}.action-group{display:flex;gap:9px;flex-wrap:wrap}.btn{min-height:40px;padding:0 15px;border-radius:10px;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:8px}.btn svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2}.btn-primary{background:var(--navy);color:#fff;border-bottom:3px solid var(--yellow)}.btn-secondary{background:#fff;color:var(--navy);border:1px solid var(--line)}.btn-soft{background:#edf6fa;color:var(--blue);border:1px solid #d5e5ed}.btn-danger{background:#fff1f2;color:#be123c;border:1px solid #fecdd3}.btn-success{background:#e7f8ef;color:#08734b;border:1px solid #b7e8cf}.btn-small{min-height:31px;padding:0 10px;font-size:11px;border-radius:9px}
.products-wrap{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff}.products-table{width:100%;border-collapse:collapse;min-width:880px}.products-table th{background:#edf4f7;color:#496676;padding:10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.04em}.products-table td{padding:8px;border-top:1px solid var(--line);vertical-align:middle}.products-table input{margin:0}.products-table .num{width:42px;text-align:center;font-weight:900;color:var(--muted)}.products-table .money,.products-table .total{white-space:nowrap;text-align:right}.products-table .total{font-weight:900;color:var(--navy);font-size:12px}.table-scroll{overflow:auto}.products-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;background:#f8fafb;border-top:1px solid var(--line)}.products-summary{display:flex;gap:18px;align-items:center;color:var(--muted);font-size:11px}.products-summary strong{display:block;color:var(--navy);font-size:17px;margin-top:2px;text-align:right}
.toolbar{padding:16px 18px;margin-bottom:16px;display:grid;grid-template-columns:1fr 1.8fr;gap:20px;align-items:end}.toolbar-copy h3{margin:0;color:var(--navy);font-size:17px}.toolbar-copy p{margin:5px 0 0;color:var(--muted);font-size:12px;line-height:1.4}.toolbar-controls{display:grid;grid-template-columns:1.2fr repeat(3,minmax(140px,.8fr)) auto;gap:10px;align-items:end}.toolbar-controls input,.toolbar-controls select{margin-top:5px}.toolbar-controls label{font-size:10px;text-transform:uppercase;letter-spacing:.04em}.kanban-toolbar .toolbar-controls,.dashboard-toolbar .toolbar-controls{grid-template-columns:repeat(auto-fit,minmax(145px,1fr))}.dashboard-toolbar{grid-template-columns:1fr}.dashboard-toolbar .toolbar-copy{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.dashboard-filter-summary{font-size:10px;color:var(--muted);font-weight:800;white-space:nowrap;padding-top:4px}
.kanban{display:grid;grid-template-columns:repeat(3,minmax(300px,1fr));gap:12px;align-items:start;overflow-x:auto;padding-bottom:10px}.column{background:#edf4f7;border:1px solid #cad9e2;border-radius:18px;padding:10px;min-height:360px;transition:.15s}.column.drag-over{outline:3px solid rgba(7,89,133,.18);background:#e6f1f6}.column-head{display:grid;grid-template-columns:auto 1fr auto;gap:9px;align-items:center;margin-bottom:9px}.column-icon{width:34px;height:34px;border-radius:11px;background:var(--navy);color:var(--yellow);display:grid;place-items:center}.column-icon svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2}.column-title{margin:0;color:var(--navy);font-size:14px;font-weight:950}.column-sub{font-size:9px;color:var(--muted);margin-top:2px}.column-count{min-width:32px;height:36px;border-radius:11px;background:#fff;color:var(--navy);display:grid;place-items:center;font-weight:900;font-size:13px;border:1px solid var(--line)}.column-metrics{display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.72);border:1px solid var(--line);border-radius:11px;padding:7px 9px;margin-bottom:8px;font-size:9px;color:var(--muted)}.column-metrics strong{color:var(--navy)}.empty{border:1px dashed #9eb8c7;border-radius:12px;padding:24px 12px;text-align:center;color:#718997;background:rgba(255,255,255,.45);font-size:11px;min-height:100px;display:grid;place-items:center}
.nf-card{background:#fff;border:1px solid #d7e1e8;border-left:5px solid var(--slate);border-radius:14px;padding:9px;margin-bottom:8px;box-shadow:0 6px 16px rgba(0,83,131,.08);cursor:pointer;transition:.14s}.nf-card:hover{transform:translateY(-1px);box-shadow:0 10px 22px rgba(0,83,131,.13)}.nf-card.status-new{border-left-color:var(--orange)}.nf-card.status-progress{border-left-color:var(--blue)}.nf-card.status-done{border-left-color:var(--green)}.nf-card.dragging{opacity:.45}.card-top{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:start}.card-code{font-size:9px;color:#7b93a2;font-weight:900}.card-title{font-size:12px;color:var(--navy);font-weight:950;line-height:1.15;text-transform:uppercase;margin-top:2px}.status-chip{padding:4px 7px;border-radius:999px;font-size:8px;font-weight:900;white-space:nowrap}.status-chip.new{background:#fff0dc;color:#b45309}.status-chip.progress{background:#dceef8;color:#075985}.status-chip.done{background:#ddf7e8;color:#08734b}.card-lines{display:grid;gap:3px;margin-top:7px}.card-line{display:grid;grid-template-columns:15px 1fr;gap:5px;color:#607887;font-size:9.5px;line-height:1.2}.card-line svg{width:13px;height:13px;fill:none;stroke:#6b8291;stroke-width:2}.card-route{margin-top:7px;padding:7px;background:#f6f9fb;border:1px solid #e0e9ee;border-radius:10px;font-size:9px;color:#607887;line-height:1.3}.card-route strong{color:var(--navy)}.card-badges{display:flex;gap:4px;flex-wrap:wrap;margin-top:7px}.mini-badge{padding:3px 6px;border-radius:999px;font-size:8px;font-weight:900;background:#edf4f7;color:#526d7d}.mini-badge.money{background:#e7f8ef;color:#08734b}.mini-badge.urgent{background:#ffedd5;color:#c2410c;border:1px solid #fed7aa}.mini-badge.normal{background:#dbeafe;color:#1d4ed8;border:1px solid #bfdbfe}.login-context-note{margin-top:10px;padding:9px 11px;border:1px solid #cfe0e8;border-left:4px solid var(--blue);border-radius:10px;background:#f3f8fb;color:#526d7d;font-size:11px;line-height:1.4}.login-context-note.waiting{border-left-color:var(--orange);background:#fff8ed;color:#8a5a18}.card-timer{display:flex;justify-content:space-between;gap:8px;margin-top:7px;padding:6px 7px;background:#f3f7fa;border:1px solid #d4e0e7;border-radius:10px;font-size:8.5px;color:#607887}.card-timer strong{color:var(--navy)}.card-actions{display:grid;gap:6px;margin-top:8px}.phase-control-label{font-size:8px;font-weight:900;color:#6b8291;text-transform:uppercase;letter-spacing:.04em}.phase-select-wrap{position:relative}.phase-select{width:100%;height:34px;margin:0;padding:0 34px 0 10px;border:1px solid #cbd9e1;border-radius:10px;background:#f7fafb;color:var(--navy);font-size:9.5px;font-weight:900;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;box-shadow:none}.phase-select:hover{border-color:#95adba;background:#fff}.phase-select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(7,89,133,.10)}.phase-select-wrap:after{content:"⌄";position:absolute;right:11px;top:50%;transform:translateY(-54%);color:var(--navy);font-size:16px;font-weight:900;pointer-events:none}.card-actions>.detail-btn{width:100%;min-height:27px;border-radius:8px;padding:0 7px;font-size:8.5px}.move-back{background:#fff;color:var(--navy);border:1px solid var(--line)}.move-next{background:var(--navy);color:#fff}.detail-btn{background:#eef5f8;color:var(--blue);border:1px solid #d4e4eb}

/* Semáforo e cronômetros no padrão dos módulos de Fretes, Contratos e Cadastro */
.nf-card{--sla-color:var(--green);--sla-soft:#eefaf4;--sla-border:#b9e6d0;border-left-color:var(--sla-color)!important}
.nf-card.sla-late{--sla-color:#dc2626;--sla-soft:#fff0ef;--sla-border:#efc1bd}
.nf-card.sla-warn{--sla-color:#d79b00;--sla-soft:#fff7df;--sla-border:#edd28a}
.nf-card.sla-ok{--sla-color:#23865f;--sla-soft:#eaf8f1;--sla-border:#b8e2cf}
.semaphore-badge{padding:3px 7px;border-radius:999px;font-size:8px;font-weight:950;white-space:nowrap;border:1px solid transparent}
.semaphore-badge.late{background:#fee2e2;color:#991b1b;border-color:#fecaca}
.semaphore-badge.warn{background:#fef3c7;color:#92400e;border-color:#fde68a}
.semaphore-badge.ok{background:#dcfce7;color:#166534;border-color:#bbf7d0}
.deadline-row{display:grid;grid-template-columns:1fr auto;gap:7px;align-items:center;margin-top:7px;padding:7px 8px;border:1px solid var(--sla-border);border-radius:10px;background:var(--sla-soft);font-size:8.5px;color:#607887}
.deadline-row strong{color:var(--sla-color);font-size:8.5px;text-align:right}
.timer-panel{display:grid;gap:4px;margin-top:7px;padding:7px 8px;background:#f3f7fa;border:1px solid #d4e0e7;border-radius:10px}
.timer-row{display:flex;justify-content:space-between;gap:8px;color:#607887;font-size:8.5px}
.timer-row strong{color:var(--navy);font-variant-numeric:tabular-nums;text-align:right}
.stage-time-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
.stage-time-card{background:#f7fafb;border:1px solid var(--line);border-radius:11px;padding:10px}
.stage-time-card.current{border-color:var(--yellow);box-shadow:inset 0 0 0 1px var(--yellow)}
.stage-time-card small{display:block;color:var(--muted);font-size:9px;font-weight:900;margin-bottom:5px}
.stage-time-card strong{color:var(--navy);font-size:12px;font-variant-numeric:tabular-nums}
@media(max-width:760px){.stage-time-grid{grid-template-columns:1fr}}

.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-bottom:15px}.kpi{padding:16px;border-left:4px solid var(--yellow)}.kpi small{display:block;color:var(--muted);font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.kpi strong{display:block;color:var(--navy);font-size:23px;margin-top:5px;line-height:1}.kpi span{display:block;color:#8a9ca7;font-size:9px;margin-top:6px}.charts{display:grid;grid-template-columns:1fr 1fr;gap:14px}.chart-card{padding:18px}.chart-card h3{margin:0;color:var(--navy);font-size:17px}.chart-card>p{margin:5px 0 0;color:var(--muted);font-size:12px}.bar-list{display:grid;gap:11px;margin-top:15px}.bar-row{display:grid;grid-template-columns:150px 1fr 112px;gap:10px;align-items:center}.bar-label{font-size:11px;font-weight:800;color:#405e70;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar-track{height:11px;border-radius:999px;background:#e1eaef;overflow:hidden}.bar-fill{height:100%;border-radius:999px;background:var(--blue)}.bar-fill.orange{background:var(--orange)}.bar-fill.green{background:var(--green)}.bar-fill.yellow{background:var(--yellow)}.bar-value{text-align:right;color:var(--navy);font-size:10px;font-weight:900;line-height:1.15}.bar-value b{display:inline;font-size:12px}.bar-value span{display:inline;color:#607988;font-size:9px;font-weight:800}.bar-value small{display:block;color:#7d929e;font-size:8px;font-weight:800;margin-top:3px}.month-chart{display:flex;align-items:end;gap:10px;height:220px;margin-top:15px;padding:10px 6px 0;border-bottom:1px solid var(--line)}.month-col{flex:1;min-width:38px;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px}.month-value{font-size:9px;font-weight:900;color:var(--navy)}.month-bar{width:min(44px,75%);min-height:3px;background:linear-gradient(180deg,var(--blue2),var(--navy));border-radius:8px 8px 2px 2px;position:relative}.month-label{font-size:9px;color:var(--muted);font-weight:800;white-space:nowrap}
.data-wrap{max-height:520px;overflow-x:auto;overflow-y:auto;scrollbar-gutter:stable both-edges;border:1px solid var(--line);border-radius:14px;background:#fff}.data-wrap::-webkit-scrollbar{width:12px;height:12px}.data-wrap::-webkit-scrollbar-track{background:#eef3f6;border-radius:999px}.data-wrap::-webkit-scrollbar-thumb{background:#9fb4c1;border:3px solid #eef3f6;border-radius:999px}.data-wrap::-webkit-scrollbar-thumb:hover{background:#6f8c9d}.data-table{width:100%;border-collapse:collapse;min-width:1350px}.data-table th{background:#edf4f7;color:#496676;padding:10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.04em;position:sticky;top:0}.data-table td{padding:10px;border-top:1px solid var(--line);font-size:11px;color:#4f6979;vertical-align:middle}.data-table tr:hover td{background:#f8fafb}.data-table strong{color:var(--navy)}.table-actions{display:flex;gap:5px}.table-actions button{min-height:28px;padding:0 8px;border-radius:8px;font-size:9px}
.modal-backdrop{position:fixed;inset:0;background:rgba(4,29,46,.62);backdrop-filter:blur(3px);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px}.modal-backdrop.show{display:flex}.modal{width:min(1080px,96vw);max-height:92vh;overflow:auto;background:#fff;border-radius:20px;box-shadow:0 28px 80px rgba(0,0,0,.32)}.modal-header{position:sticky;top:0;z-index:3;background:var(--navy);color:#fff;padding:18px 20px;display:flex;justify-content:space-between;gap:15px;align-items:flex-start;border-top:4px solid var(--yellow)}.modal-header h2{margin:0;color:#fff;font-size:22px}.modal-header p{margin:5px 0 0;color:#c9dce7;font-size:12px}.close-btn{width:40px;height:40px;border-radius:11px;background:#fff;color:var(--navy);font-size:20px}.modal-body{padding:18px 20px 24px}.detail-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:14px}.detail-kv{background:#f4f9fb;border:1px solid var(--line);border-radius:12px;padding:10px}.detail-kv small{display:block;color:var(--muted);font-size:9px;font-weight:900;text-transform:uppercase;margin-bottom:5px}.detail-kv strong{color:var(--navy);font-size:12px;word-break:break-word}.detail-section{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:12px}.detail-section-title{background:#edf4f7;border-bottom:1px solid var(--line);padding:11px 13px;color:var(--navy);font-weight:900;font-size:12px}.detail-content{padding:13px}.detail-products{width:100%;border-collapse:collapse;min-width:680px}.detail-products th,.detail-products td{padding:8px;border-bottom:1px solid var(--line);font-size:10px;text-align:left}.detail-products th{background:#f7fafb;color:#5c7483}.detail-products td:last-child,.detail-products th:last-child{text-align:right}.history-list{display:grid;gap:8px}.history-item{display:grid;grid-template-columns:115px 1fr;gap:10px;padding:9px 10px;border:1px solid var(--line);border-radius:11px;background:#fafcfd}.history-item time{font-size:9px;color:var(--muted)}.history-item div{font-size:10px;color:#4a6575}.history-item strong{color:var(--navy)}.internal-note{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end}.internal-note textarea{margin:0;min-height:76px}.modal-actions{display:flex;gap:9px;flex-wrap:wrap;margin:14px 0}
.toast{position:fixed;right:18px;bottom:18px;background:var(--navy);color:#fff;border-bottom:4px solid var(--yellow);border-radius:12px;padding:12px 14px;font-size:12px;font-weight:800;box-shadow:0 16px 40px rgba(0,0,0,.22);z-index:2000;display:none;max-width:360px}.toast.show{display:block;animation:toastIn .2s ease}@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.34);z-index:55}
@media(max-width:1320px){.kpi-grid{grid-template-columns:repeat(3,1fr)}.toolbar{grid-template-columns:1fr}.toolbar-controls{grid-template-columns:1.2fr repeat(3,1fr) auto}.charts{grid-template-columns:1fr}.form-grid{grid-template-columns:repeat(2,1fr)}.field.span2{grid-column:auto}.detail-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:980px){.sidebar{transform:translateX(-100%)}.sidebar.open{transform:none}.overlay.show{display:block}.workspace{width:100%;margin-left:0}.menu-btn{display:none}.tabs{margin:14px 18px 0}.toolbar-controls{grid-template-columns:1fr 1fr}.kanban{grid-template-columns:repeat(3,minmax(280px,1fr))}main{padding:18px}}
@media(max-width:650px){.form-grid,.kpi-grid,.detail-grid{grid-template-columns:1fr}.field.full,.field.span2{grid-column:auto}.panel{padding:15px}.panel-head{align-items:flex-start;flex-direction:column}.toolbar-controls{grid-template-columns:1fr}.products-footer,.actions{align-items:stretch;flex-direction:column}.action-group,.action-group .btn,.actions>.btn{width:100%}.internal-note{grid-template-columns:1fr}.bar-row{grid-template-columns:100px 1fr 92px}}

.form-field-hidden{display:none!important}
.form-editor-panel{padding:24px}.editor-info-box{display:flex;gap:14px;align-items:flex-start;background:#fff9d9;border:1px solid #efd56a;border-left:5px solid var(--yellow);border-radius:14px;padding:13px 15px;margin-bottom:16px;color:#6a5900;font-size:12px;line-height:1.5}.editor-info-box strong{white-space:nowrap;color:var(--navy)}
.form-editor-layout{display:grid;grid-template-columns:340px minmax(0,1fr);gap:16px;align-items:start}.form-editor-sidebar,.form-editor-main{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 8px 24px rgba(15,53,80,.05)}.form-editor-sidebar{padding:14px;position:sticky;top:90px}.form-editor-main{padding:18px}.editor-side-head{display:grid;gap:10px;padding-bottom:12px;border-bottom:1px solid var(--line)}.editor-side-head h3,.editor-main-head h3{margin:0;color:var(--navy)}.editor-side-head h3{font-size:16px}.editor-side-head p{margin:4px 0 0;color:var(--muted);font-size:10px}.editor-side-head input{margin:0}.editor-question-list{display:grid;gap:7px;margin-top:12px;max-height:620px;overflow:auto;padding-right:3px}.editor-question-item{width:100%;text-align:left;background:#f8fafb;color:var(--text);border:1px solid var(--line);border-radius:12px;padding:10px 11px;display:grid;gap:5px}.editor-question-item:hover{background:#eef5f8}.editor-question-item.active{background:#eaf3f8;border-color:#9cc3d5;box-shadow:0 0 0 3px rgba(7,89,133,.08)}.editor-question-item b{color:var(--navy);font-size:11px;line-height:1.3}.editor-question-item span{display:flex;gap:5px;flex-wrap:wrap}.editor-mini-badge{font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:.03em;padding:3px 6px;border-radius:999px;background:#e7eef2;color:#587180}.editor-mini-badge.select{background:#dcfce7;color:#08734b}.editor-mini-badge.required{background:#ffedd5;color:#b45309}.editor-mini-badge.hidden-field{background:#fee2e2;color:#b91c1c}
.editor-main-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding-bottom:15px;border-bottom:1px solid var(--line);margin-bottom:16px}.editor-section-tag{display:inline-flex;background:#eef5f8;color:var(--blue);border-radius:999px;padding:5px 9px;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px}.editor-field-type{background:var(--navy);color:#fff;border-bottom:3px solid var(--yellow);padding:7px 10px;border-radius:10px;font-size:9px;font-weight:900;text-transform:uppercase}.editor-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.editor-form-grid .full{grid-column:1/-1}.editor-toggle{display:flex;align-items:flex-start;gap:10px;border:1px solid var(--line);border-radius:13px;padding:12px;background:#f8fafb;cursor:pointer}.editor-toggle input{width:18px;height:18px;margin:1px 0 0}.editor-toggle span{display:grid;gap:3px}.editor-toggle b{color:var(--navy);font-size:12px}.editor-toggle small{color:var(--muted);font-size:10px;line-height:1.35}.editor-options-box{margin-top:16px;border:1px solid var(--line);border-radius:14px;overflow:hidden}.editor-options-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:13px 14px;background:#edf4f7;border-bottom:1px solid var(--line)}.editor-options-head h4{margin:0;color:var(--navy);font-size:13px}.editor-options-head p{margin:4px 0 0;color:var(--muted);font-size:10px}.editor-options-head span{background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 9px;color:var(--blue);font-size:9px;font-weight:900;white-space:nowrap}.editor-options-textarea{margin:0;border:0;border-radius:0;min-height:300px;font-family:Consolas,"Courier New",monospace;font-size:11px;line-height:1.55;resize:vertical}.editor-options-textarea:focus{box-shadow:inset 0 0 0 3px rgba(7,89,133,.1)}.editor-list-note{padding:10px 13px;background:#fff9d9;border-top:1px solid #efd56a;color:#6a5900;font-size:10px;line-height:1.45}.editor-actions{display:flex;justify-content:flex-end;gap:9px;flex-wrap:wrap;margin-top:16px;padding-top:16px;border-top:1px solid var(--line)}
@media(max-width:1050px){.form-editor-layout{grid-template-columns:1fr}.form-editor-sidebar{position:static}.editor-question-list{max-height:320px}}@media(max-width:650px){.editor-form-grid{grid-template-columns:1fr}.editor-form-grid .full{grid-column:auto}.editor-actions .btn{width:100%}.editor-info-box{flex-direction:column}}



/* Editor de formulário avançado */
.editor-v2{padding:22px}.editor-panel-head{align-items:flex-start}.editor-header-actions{justify-content:flex-end}.editor-quick-guide{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}.editor-quick-guide>div{display:flex;align-items:center;gap:10px;background:#f6f9fb;border:1px solid var(--line);border-radius:13px;padding:11px 13px;color:#5b7383;font-size:11px;font-weight:800}.editor-quick-guide b{width:26px;height:26px;border-radius:9px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:11px}.editor-layout-v2{grid-template-columns:320px minmax(0,1fr);gap:14px}.editor-sidebar-v2{padding:12px}.editor-main-v2{padding:16px}.editor-search-row{display:grid;grid-template-columns:1fr 112px;gap:8px}.editor-search-row input,.editor-search-row select{margin:0;height:38px;font-size:11px}.editor-question-list{max-height:690px}.editor-list-section{display:grid;gap:6px;margin-bottom:12px}.editor-list-section-title{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:5px 4px;color:#6a8291;font-size:9px;font-weight:950;text-transform:uppercase;letter-spacing:.06em}.editor-list-section-title span{background:#edf3f6;border:1px solid #dce6eb;border-radius:999px;padding:3px 7px;color:#527082}.editor-question-item{grid-template-columns:1fr auto;align-items:center;gap:8px;padding:9px 10px}.editor-question-item-main{display:grid;gap:4px;min-width:0}.editor-question-item b{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.editor-question-item-meta{display:flex;gap:4px;flex-wrap:wrap}.editor-order-badge{width:25px;height:25px;border-radius:8px;background:#edf3f6;color:#567183;display:grid;place-items:center;font-size:9px;font-weight:950}.editor-question-item.active .editor-order-badge{background:var(--navy);color:#fff}.editor-title-tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:7px}.editor-protection-tag{display:inline-flex;align-items:center;border-radius:999px;padding:5px 9px;background:#eef2f5;color:#657c8b;font-size:9px;font-weight:900;text-transform:uppercase}.editor-protection-tag.custom{background:#dcfce7;color:#08734b}.editor-main-head-v2{margin-bottom:12px}.editor-quick-actions{display:flex;gap:7px;flex-wrap:wrap;padding:9px;background:#f7fafb;border:1px solid var(--line);border-radius:13px;margin-bottom:14px}.editor-icon-btn{min-height:34px;padding:0 11px;border-radius:9px;background:#fff;border:1px solid var(--line);color:#36566b;font-size:12px;display:inline-flex;align-items:center;gap:6px}.editor-icon-btn:hover{background:#eef5f8}.editor-icon-btn.danger{color:#b42318;border-color:#f1c4c0;background:#fff8f7}.editor-icon-btn:disabled{opacity:.45;cursor:not-allowed}.editor-fields-v2{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.editor-fields-v2 textarea{min-height:72px}.editor-options-head-v2{align-items:center}.editor-option-quick-add{display:grid;grid-template-columns:1fr 1.3fr auto;gap:8px;padding:11px 12px;background:#f8fafb;border-bottom:1px solid var(--line)}.editor-option-quick-add input{margin:0;height:37px}.editor-option-tools{display:flex;gap:7px;flex-wrap:wrap;padding:9px 12px;border-bottom:1px solid var(--line)}.editor-option-rows{display:grid;gap:7px;padding:11px 12px;max-height:310px;overflow:auto}.editor-option-row{display:grid;grid-template-columns:1fr 1.35fr .9fr 34px;gap:7px;align-items:center}.editor-option-row input{margin:0;height:36px;font-size:11px}.editor-option-remove{width:34px;height:34px;border-radius:9px;background:#fff1f2;color:#be123c;border:1px solid #fecdd3;font-size:17px}.editor-option-empty{padding:18px;text-align:center;border:1px dashed #c9d8e1;border-radius:11px;color:#7b909d;font-size:11px}.editor-preview-card{margin-top:14px;border:1px solid var(--line);border-radius:14px;background:#fbfdfe;overflow:hidden}.editor-preview-head{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:11px 13px;background:#eef4f7;border-bottom:1px solid var(--line)}.editor-preview-head h4{margin:0;color:var(--navy);font-size:13px}.editor-preview-head p{margin:3px 0 0;color:var(--muted);font-size:10px}.editor-preview-head span{padding:5px 8px;border-radius:999px;background:#dcfce7;color:#08734b;font-size:9px;font-weight:900}.editor-preview-head span.hidden-state{background:#fee2e2;color:#b91c1c}.editor-preview-field{padding:16px}.editor-preview-field .field{max-width:680px}.editor-preview-field input,.editor-preview-field select,.editor-preview-field textarea{pointer-events:none;background:#fff}.editor-actions-v2{position:sticky;bottom:0;background:#fff;margin-top:14px;padding:12px 0 0;z-index:3}.custom-form-section{margin-top:16px}.custom-field-disabled{opacity:.68}.custom-field-readonly{background:#f3f7f9!important;color:#667f8e!important}.editor-system-note{padding:9px 11px;background:#f4f8fa;border:1px solid #dce7ed;border-radius:10px;color:#607989;font-size:10px;line-height:1.4}.editor-import-summary{margin-top:8px;color:#607989;font-size:10px}
@media(max-width:1080px){.editor-layout-v2{grid-template-columns:1fr}.editor-sidebar-v2{position:static}.editor-question-list{max-height:360px}.editor-quick-guide{grid-template-columns:1fr}}
@media(max-width:720px){.editor-header-actions,.editor-header-actions .btn{width:100%}.editor-search-row,.editor-fields-v2,.editor-option-quick-add,.editor-option-row{grid-template-columns:1fr}.editor-option-remove{width:100%}.editor-quick-actions{display:grid;grid-template-columns:1fr 1fr}.editor-icon-btn{justify-content:center}.editor-preview-head{align-items:flex-start;flex-direction:column}}
</style>

<style>
/* Editor V3 - organização visual, arrastar, ocultar e excluir */
.form-section-editor-hidden{display:none!important}
.editor-section-block{border:1px solid #dbe5eb;border-radius:13px;background:#fbfdfe;overflow:hidden;margin-bottom:10px}
.editor-section-block.section-hidden{opacity:.68;background:#f4f6f8}
.editor-section-header{padding:8px 9px!important;background:#eef4f7;border-bottom:1px solid #dbe5eb;gap:8px;align-items:center}
.editor-section-name{display:flex;align-items:center;gap:6px;min-width:0}.editor-section-name b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--navy)}.editor-section-name span{flex:none}.editor-section-name i{font-style:normal;font-size:8px;background:#fee2e2;color:#b91c1c;border-radius:999px;padding:3px 6px}
.editor-section-actions{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}.editor-section-actions button{min-height:25px;padding:0 7px;border-radius:7px;background:#fff;border:1px solid #d5e1e7;color:#526d7d;font-size:8px;font-weight:900}.editor-section-actions button:hover{background:#e8f1f5}.editor-section-actions button.danger{color:#b42318;border-color:#f0c7c3;background:#fff8f7}
.editor-section-dropzone{display:grid;gap:6px;padding:7px;min-height:42px;transition:.15s}.editor-section-dropzone.drag-over{background:#e8f4f9;box-shadow:inset 0 0 0 2px rgba(7,89,133,.18)}
.editor-section-empty{border:1px dashed #bfd0da;border-radius:9px;padding:12px;text-align:center;color:#7b909d;font-size:9px;background:#fff}
.editor-question-item{display:grid!important;grid-template-columns:22px minmax(0,1fr) auto!important;cursor:grab;user-select:none;margin:0!important;background:#fff!important}.editor-question-item:active{cursor:grabbing}.editor-question-item.dragging{opacity:.4;border-style:dashed!important}.editor-question-item.drag-over{border-color:var(--blue)!important;box-shadow:0 0 0 3px rgba(7,89,133,.12)!important}
.editor-drag-handle{width:20px;height:30px;border-radius:7px;display:grid;place-items:center;background:#edf3f6;color:#728896;font-size:15px;font-weight:900;letter-spacing:-3px}.editor-question-item.active .editor-drag-handle{background:var(--navy);color:#fff}
.editor-question-quick{display:flex;align-items:center;gap:5px}.editor-question-quick button{min-height:25px;padding:0 7px;border-radius:7px;background:#f5f8fa;border:1px solid #d7e2e8;color:#526d7d;font-size:8px;font-weight:900}.editor-question-quick button:hover{background:#e7f0f5}.editor-question-quick .editor-order-badge{flex:none}
.editor-no-selection .editor-fields-v2,.editor-no-selection .editor-quick-actions,.editor-no-selection .editor-options-box,.editor-no-selection .editor-preview-card,.editor-no-selection .editor-actions-v2{opacity:.48;pointer-events:none}
@media(max-width:720px){.editor-section-header{align-items:flex-start;flex-direction:column}.editor-section-actions{width:100%;justify-content:flex-start}.editor-question-item{grid-template-columns:22px minmax(0,1fr)!important}.editor-question-quick{grid-column:2;justify-content:flex-start}}
</style>
</head>
<body>
<div class="sf-app">
  <div class="workspace">


    <nav class="tabs" aria-label="Navegação do módulo">
      <button class="tab active" data-view="form"><span class="tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg></span>Nova solicitação</button>
      <button class="tab" data-view="kanban"><span class="tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/></svg></span>Kanban</button>
      <button class="tab" data-view="dashboard"><span class="tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19V3"/><path d="M2 19h20"/></svg></span>Dashboard</button>
      <button class="tab" data-view="base"><span class="tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg></span>Base geral</button>
      <button class="tab" data-view="editor"><span class="tab-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h10"/><path d="M18 6h2"/><circle cx="16" cy="6" r="2"/><path d="M4 12h2"/><path d="M10 12h10"/><circle cx="8" cy="12" r="2"/><path d="M4 18h8"/><path d="M16 18h4"/><circle cx="14" cy="18" r="2"/></svg></span>Editor do formulário</button>
    </nav>

    <main>
      <section class="view active" id="view-form">
        <div class="panel">
          <div class="panel-head"><div><h2 id="formTitle">Nova solicitação de Cadastro de Itens</h2><p id="formSubtitle">Preencha os dados do solicitante, origem, destino, frete e produtos. A solicitação entrará em "Não Iniciado".</p></div><div class="pill" id="formModePill">NOVO CADASTRO</div></div>
          <form id="requestForm" novalidate>
            <input type="hidden" id="editId">
            <div class="section"><div class="section-title">Identificacao da solicitação</div><div class="section-body"><div class="form-grid">
              <div class="field"><label>Código da solicitação</label><input id="requestCode" readonly></div>
              <div class="field"><label>Data da solicitação</label><input id="requestDate" readonly></div>
              <div class="field"><label>Status inicial</label><input value="Não Iniciado" readonly></div>
              <div class="field"><label for="priority">Prioridade da solicitação <span class="req">*</span></label><select id="priority" required><option value="Normal" selected>Normal - 2 dias úteis</option><option value="Urgente">Urgente - 1 dia útil</option></select><div class="help">A prioridade define automaticamente a data limite.</div></div>
              <div class="field"><label for="deadline">Data limite de atendimento <span class="req">*</span></label><input id="deadline" type="date" required readonly><div class="help" id="deadlineHelp">Normal: atendimento em até 2 dias úteis.</div></div>
            </div></div></div>

            <div class="section"><div class="section-title">1. Dados do solicitante</div><div class="section-body"><div class="form-grid">
              <div class="field"><label for="requesterName">Nome do solicitante <span class="req">*</span></label><input id="requesterName" required autocomplete="name" placeholder="Carregado pelo login" readonly></div>
              <div class="field span2"><label for="requesterEmail">E-mail para envio da Nota Fiscal <span class="req">*</span></label><input id="requesterEmail" type="email" required autocomplete="email" placeholder="Carregado pelo login" readonly></div>
            </div><div class="login-context-note waiting" id="loginUserStatus">Aguardando a identificação do usuário conectado no aplicativo principal.</div></div></div>

            <div class="section"><div class="section-title">2. Dados do emitente</div><div class="section-body"><div class="form-grid">
              <div class="field span2"><label for="issuerCnpj">CNPJ emitente <span class="req">*</span></label><select id="issuerCnpj" required><option value="">Selecione</option><option value="72.030.927/0005-09">72.030.927/0005-09 - Caxias (Sede)</option><option value="72.030.927/0001-85">72.030.927/0001-85 - Obras RJ</option><option value="72.030.927/0007-70">72.030.927/0007-70 - Obras MG</option><option value="72.030.927/0006-90">72.030.927/0006-90 - Obras SC</option></select></div>
              <div class="field"><label for="issuerDepartment">Obra / Departamento do emitente <span class="req">*</span></label><select id="issuerDepartment" required><option value="">Selecione a obra ou departamento</option></select><div class="help" data-form-help="issuerDepartment">Lista integrada aos módulos de Fretes, Cadastro e Contratos.</div></div>
            </div></div></div>

            <div class="section"><div class="section-title">3. Dados do destinatário</div><div class="section-body"><div class="form-grid">
              <div class="field span2"><label for="recipientCnpj">CNPJ destinatário <span class="req">*</span></label><select id="recipientCnpj" required><option value="">Selecione</option><option value="72.030.927/0005-09">72.030.927/0005-09 - Caxias (Sede)</option><option value="72.030.927/0001-85">72.030.927/0001-85 - Rio de Janeiro</option><option value="72.030.927/0007-70">72.030.927/0007-70 - Minas Gerais</option><option value="72.030.927/0006-90">72.030.927/0006-90 - Sul</option></select></div>
              <div class="field"><label for="recipientDepartment">Obra / Departamento do destinatário <span class="req">*</span></label><select id="recipientDepartment" required><option value="">Selecione a obra ou departamento</option></select><div class="help" data-form-help="recipientDepartment">Lista integrada aos módulos de Fretes, Cadastro e Contratos.</div></div>
              <div class="field full"><label for="recipientAddress">Endereço completo do destinatário <span class="req">*</span></label><textarea id="recipientAddress" required placeholder="Logradouro, numero, complemento, bairro, cidade, UF e CEP"></textarea></div>
            </div></div></div>

            <div class="section"><div class="section-title">4. Responsavel pelo frete</div><div class="section-body"><div class="form-grid">
              <div class="field"><label for="freightResponsible">Responsavel pelo frete <span class="req">*</span></label><select id="freightResponsible" required><option value="">Selecione</option><option value="Veículo SEEL">Veículo SEEL</option><option value="Transportadora">Transportadora</option></select></div>
              <div class="field"><label for="carrierName">Nome da transportadora <span class="req">*</span></label><input id="carrierName" required placeholder="Informe a transportadora"></div>
              <div class="field"><label for="carrierCnpj">CNPJ da transportadora <span class="req">*</span></label><input id="carrierCnpj" required inputmode="numeric" maxlength="18" placeholder="00.000.000/0000-00"></div>
            </div><div class="rule-box" id="freightRule">Selecione o responsavel pelo frete. Para Veículo SEEL, os dados da transportadora seráo preenchidos e bloqueados automaticamente.</div></div></div>

            <div class="section" id="productsFormSection"><div class="section-title" id="productsFormSectionTitle">5. Produtos</div><div class="section-body">
              <div class="products-wrap"><div class="table-scroll"><table class="products-table"><thead><tr><th data-product-field-v7="description" style="width:260px">Descrição do item</th><th data-product-field-v7="ncm" style="width:160px">NCM</th><th data-product-field-v7="itemGroup" style="width:230px">Grupo de itens</th><th data-product-field-v7="actions" style="width:70px;text-align:center">Ações</th></tr></thead><tbody id="productsBody"></tbody></table></div>
              <div class="products-footer"><button type="button" class="btn btn-soft btn-small" id="addProduct">+ Adicionar produto</button><div class="products-summary"><div id="productsItemsSummaryLabel">Itens<strong id="productsCount">0</strong></div><div id="productsValueSummaryLabel">Valor total<strong id="productsGrandTotal">R$ 0,00</strong></div></div></div></div>
              <div class="help" id="productsFormHelp">Inclua quantas linhas forem necessárias. Descrição, quantidade, valor unitário e NCM são obrigatórios.</div>
            </div></div>

            <div id="customFieldsHost"></div>
            <div class="actions"><button type="button" class="btn btn-secondary" id="clearForm">Limpar formulário</button><div class="action-group"><button type="button" class="btn btn-secondary hidden" id="cancelEdit">Cancelar edição</button><button type="submit" class="btn btn-primary" id="saveRequest">Salvar e enviar para o Kanban</button></div></div>
          </form>
        </div>
      </section>

      <section class="view" id="view-kanban">
        <div class="toolbar kanban-toolbar"><div class="toolbar-copy"><h3>Kanban de Cadastro de Itens</h3><p>Arraste os cards entre as fases ou selecione a fase no campo suspenso de cada card. O cronômetro é salvo por etapa e para ao concluir o cadastro no sistema.</p></div><div class="toolbar-controls">
          <div><label>Buscar</label><input id="filterSearch" placeholder="Código, solicitante ou obra"></div>
          <div><label>Emitente</label><select id="filterIssuer"><option value="">Todos</option></select></div>
          <div><label>Destinatário</label><select id="filterRecipient"><option value="">Todos</option></select></div>
          <div><label>Frete</label><select id="filterFreight"><option value="">Todos</option><option>Veículo SEEL</option><option>Transportadora</option></select></div>
          <div><label>Prioridade</label><select id="filterPriority"><option value="">Todas</option><option>Urgente</option><option>Normal</option></select></div>
          <div><label>Semáforo</label><select id="filterSemaphore"><option value="">Todos</option><option value="late">Em atraso</option><option value="warn">Em alerta</option><option value="ok">No prazo</option></select></div>
          <button class="btn btn-secondary" id="clearFilters">Limpar filtros</button>
        </div></div>
        <div class="kanban" id="kanbanBoard"></div>
      </section>

      <section class="view" id="view-dashboard">
        <div class="toolbar dashboard-toolbar">
          <div class="toolbar-copy"><div><h3>Filtros do Dashboard</h3><p>Os cartões e todos os gráficos abaixo são recalculados conforme os filtros selecionados.</p></div><span class="dashboard-filter-summary" id="dashboardFilterSummary">Exibindo toda a base</span></div>
          <div class="toolbar-controls">
            <div><label>Buscar</label><input id="dashboardFilterSearch" placeholder="Código, solicitante ou obra"></div>
            <div><label>Data inicial</label><input id="dashboardFilterStart" type="date"></div>
            <div><label>Data final</label><input id="dashboardFilterEnd" type="date"></div>
            <div><label>Fase</label><select id="dashboardFilterPhase"><option value="">Todas</option><option>Não Iniciado</option><option>Em Tratativa</option><option>Cadastrado no Sistema</option></select></div>
            <div><label>Prioridade</label><select id="dashboardFilterPriority"><option value="">Todas</option><option>Urgente</option><option>Normal</option></select></div>
            <div><label>Semáforo</label><select id="dashboardFilterSemaphore"><option value="">Todos</option><option value="late">Em atraso</option><option value="warn">Em alerta</option><option value="ok">No prazo</option></select></div>
            <div><label>Frete</label><select id="dashboardFilterFreight"><option value="">Todos</option><option>Veículo SEEL</option><option>Transportadora</option></select></div>
            <div><label>Emitente</label><select id="dashboardFilterIssuer"><option value="">Todos</option></select></div>
            <button class="btn btn-secondary" id="clearDashboardFilters">Limpar filtros</button>
          </div>
        </div>
        <div class="kpi-grid" id="kpiGrid"></div>
        <div class="charts">
          <article class="chart-card"><h3>Solicitações por fase</h3><p>Quantidade e percentual das solicitações em cada fase.</p><div class="bar-list" id="stageChart"></div></article>
          <article class="chart-card"><h3>Semáforo de filas</h3><p>Quantidade e percentual das solicitações abertas por situação do prazo.</p><div class="bar-list" id="semaphoreChart"></div></article>
          <article class="chart-card"><h3>Prioridade das solicitações</h3><p>Quantidade e percentual das solicitações normais e urgentes.</p><div class="bar-list" id="priorityChart"></div></article>
          <article class="chart-card"><h3>Responsavel pelo frete</h3><p>Quantidade e percentual por responsável pelo frete.</p><div class="bar-list" id="freightChart"></div></article>
          <article class="chart-card"><h3>Volume por CNPJ emitente</h3><p>Quantidade, percentual e valor total das solicitações por unidade emitente.</p><div class="bar-list" id="issuerChart"></div></article>
          <article class="chart-card"><h3>SLA médio por fase</h3><p>Tempo médio acumulado em cada etapa. Em Cadastrado no Sistema, considera o ciclo total encerrado.</p><div class="bar-list" id="slaPhaseChart"></div></article>
        </div>
      </section>


      <section class="view" id="view-editor">
        <div class="panel form-editor-panel editor-v2">
          <div class="panel-head editor-panel-head">
            <div><h2>Editor do formulário</h2><p>Arraste perguntas para alterar a posição, mova entre seções e oculte ou exclua perguntas e seções.</p></div>
            <div class="action-group editor-header-actions">
              <button class="btn btn-soft" id="editorNewQuestion">+ Nova pergunta</button><button class="btn btn-soft" id="editorNewSection">+ Nova seção</button>
              <button class="btn btn-secondary" id="exportFormEditor">Exportar configuração</button>
              <button class="btn btn-secondary" id="importFormEditor">Importar configuração</button>
              <input id="importFormEditorFile" type="file" accept="application/json,.json" hidden>
              <button class="btn btn-secondary" id="refreshIntegratedWorks">Sincronizar obras</button>
              <button class="btn btn-danger" id="resetAllFormEditor">Restaurar padrão</button>
            </div>
          </div>

          <div class="editor-quick-guide">
            <div><b>1</b><span>Selecione ou crie uma pergunta</span></div>
            <div><b>2</b><span>Arraste para subir, descer ou trocar de seção</span></div>
            <div><b>3</b><span>Oculte ou exclua quando necessário</span></div>
          </div>

          <div class="form-editor-layout editor-layout-v2">
            <aside class="form-editor-sidebar editor-sidebar-v2">
              <div class="editor-side-head">
                <div><h3>Estrutura do formulário</h3><p id="editorQuestionCount"></p></div>
                <div class="editor-search-row">
                  <input id="editorQuestionSearch" type="search" placeholder="Buscar pergunta ou seção">
                  <select id="editorQuestionFilter" aria-label="Filtrar perguntas">
                    <option value="all">Todas</option>
                    <option value="visible">Visíveis</option>
                    <option value="required">Obrigatórias</option>
                    <option value="custom">Criadas por você</option>
                    <option value="hidden">Ocultas</option>
                  </select>
                </div>
              </div>
              <div class="editor-question-list" id="editorQuestionList"></div>
            </aside>

            <section class="form-editor-main editor-main-v2">
              <div class="editor-main-head editor-main-head-v2">
                <div>
                  <div class="editor-title-tags"><span class="editor-section-tag" id="editorSectionTag">Seção</span><span class="editor-protection-tag" id="editorFieldProtection">Campo padrão</span></div>
                  <h3 id="editorQuestionTitle">Selecione uma pergunta</h3>
                </div>
                <span class="editor-field-type" id="editorFieldType">Campo</span>
              </div>

              <div class="editor-quick-actions">
                <button class="editor-icon-btn" id="editorMoveUp" title="Mover para cima">↑ <span>Subir</span></button>
                <button class="editor-icon-btn" id="editorMoveDown" title="Mover para baixo">↓ <span>Descer</span></button>
                <button class="editor-icon-btn" id="editorDuplicateQuestion" title="Duplicar pergunta">⧉ <span>Duplicar</span></button>
                <button class="editor-icon-btn danger" id="editorDeleteQuestion" title="Excluir pergunta">× <span>Excluir</span></button>
              </div>

              <div class="editor-form-grid editor-fields-v2">
                <div class="field full"><label for="editorQuestionLabel">Texto da pergunta</label><input id="editorQuestionLabel" placeholder="Digite o texto exibido no formulário"></div>
                <div class="field full"><label for="editorQuestionHelp">Texto de apoio</label><textarea id="editorQuestionHelp" placeholder="Orientação exibida abaixo do campo"></textarea></div>
                <div class="field"><label for="editorQuestionPlaceholder">Texto interno do campo</label><input id="editorQuestionPlaceholder" placeholder="Ex.: Digite a informação"></div>
                <div class="field"><label for="editorQuestionSection">Seção do formulário</label><input id="editorQuestionSection" list="editorSectionSuggestions" placeholder="Ex.: 6. Informações adicionais"><datalist id="editorSectionSuggestions"></datalist></div>
                <div class="field"><label for="editorQuestionType">Tipo de resposta</label><select id="editorQuestionType"><option value="text">Texto curto</option><option value="textarea">Texto longo</option><option value="email">E-mail</option><option value="number">Número</option><option value="date">Data</option><option value="select">Lista suspensa</option></select></div>
                <div class="field"><label for="editorQuestionWidth">Largura no formulário</label><select id="editorQuestionWidth"><option value="1">1 coluna</option><option value="2">2 colunas</option><option value="full">Linha inteira</option></select></div>
                <label class="editor-toggle"><input id="editorQuestionRequired" type="checkbox"><span><b>Obrigatória</b><small>Impede o envio sem resposta.</small></span></label>
                <label class="editor-toggle"><input id="editorQuestionVisible" type="checkbox"><span><b>Visível</b><small>Exibe ou oculta sem apagar.</small></span></label>
                <label class="editor-toggle"><input id="editorQuestionReadonly" type="checkbox"><span><b>Somente leitura</b><small>Mostra o campo sem permitir alteração.</small></span></label>
              </div>

              <div class="editor-options-box hidden" id="editorOptionsBox">
                <div class="editor-options-head editor-options-head-v2">
                  <div><h4>Opções da lista</h4><p>Cadastre valor, rótulo e grupo de forma simples.</p></div><span id="editorOptionCount">0 opções</span>
                </div>
                <div class="editor-option-quick-add">
                  <input id="editorOptionQuickValue" placeholder="Valor interno">
                  <input id="editorOptionQuickLabel" placeholder="Texto exibido">
                  <button class="btn btn-soft btn-small" id="addEditorOption" type="button">Adicionar</button>
                </div>
                <div class="editor-option-tools">
                  <button class="btn btn-secondary btn-small" id="sortEditorOptions" type="button">Ordenar A-Z</button>
                  <button class="btn btn-secondary btn-small" id="dedupeEditorOptions" type="button">Remover duplicadas</button>
                  <button class="btn btn-secondary btn-small" id="clearEditorOptions" type="button">Limpar opções</button>
                </div>
                <div class="editor-option-rows" id="editorOptionRows"></div>
                <div class="editor-list-note" id="editorListNote"></div>
              </div>

              <div class="editor-preview-card">
                <div class="editor-preview-head"><div><h4>Prévia do campo</h4><p>Atualização em tempo real antes de salvar.</p></div><span id="editorPreviewStatus">Visível</span></div>
                <div id="editorLivePreview"></div>
              </div>

              <div class="editor-actions editor-actions-v2">
                <button class="btn btn-secondary" id="resetCurrentQuestion">Restaurar pergunta</button>
                <button class="btn btn-soft hidden" id="syncCurrentWorkList">Usar lista automática de obras</button>
                <button class="btn btn-primary" id="saveCurrentQuestion">Salvar alterações</button>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section class="view" id="view-base">
        <div class="panel"><div class="panel-head"><div><h2>Base de solicitações de Cadastro de Itens</h2><p>Consulta consolidada, edição, exportação e exclusao dos registros.</p></div><div class="action-group"><button class="btn btn-secondary" id="exportCsv">Exportar CSV</button><button class="btn btn-primary" id="baseNew">Nova solicitação</button></div></div>
          <div class="data-wrap"><table class="data-table"><thead><tr><th>Código</th><th>Data</th><th>Solicitante</th><th>Emitente</th><th>Destino</th><th>Frete</th><th>Itens</th><th>Valor</th><th>Prioridade</th><th>Status</th><th>Data limite</th><th>Semáforo</th><th>Tempo total</th><th>Ações</th></tr></thead><tbody id="baseTableBody"></tbody></table></div>
        </div>
      </section>
    </main>
  </div>
</div>

<div class="modal-backdrop" id="detailModal"><div class="modal"><div class="modal-header"><div><h2 id="detailTitle">Detalhes da solicitação</h2><p id="detailSubtitle"></p></div><button class="close-btn" id="closeDetail">x</button></div><div class="modal-body" id="detailBody"></div></div></div>
<div class="toast" id="toast"></div>

<script>
(() => {
'use strict';
const STORAGE_KEY = 'seel_cadastro_itens_v1';
const PHASES = ['Não Iniciado','Em Tratativa','Cadastrado no Sistema'];
const PRIORITY_SLA_DAYS={Urgente:1,Normal:2};
const DEFAULT_PRIORITY='Normal';
const LOGIN_CACHE_KEY='seel_supply_flow_login_user_v1';
const PHASE_META = {
  'Não Iniciado': {css:'new', icon:'clock', subtitle:'Solicitações recebidas e ainda não tratadas'},
  'Em Tratativa': {css:'progress', icon:'tool', subtitle:'Análise, validação e cadastro do item em andamento'},
  'Cadastrado no Sistema': {css:'done', icon:'check', subtitle:'Item cadastrado no sistema e processo concluído'}
};
const CNPJ_LABELS = {
  '72.030.927/0005-09':'Caxias (Sede)',
  '72.030.927/0001-85':'Rio de Janeiro / Obras RJ',
  '72.030.927/0007-70':'Minas Gerais / Obras MG',
  '72.030.927/0006-90':'Sul / Obras SC'
};
let requests = loadRequests();
const FORM_EDITOR_STORAGE_KEY='seel_cadastro_itens_formulario_editor_v1';
const CONTRACT_WORK_CENTERS=["CIC UN ENERGIA", "793 - LAMSA", "827 - PETROBRAS TRANSPORTE S.A - TRANSPETRO - SC", "852 - POCO FUNDO ENERGIA S/A", "857 - ENGETEC CONSTRUCOES E MONTAGENS SA - SP", "862 - HOSPITAL NAVAL MARCILIO DIAS - RJ", "866 - MJRE CONSTRUTORA LTDA - RJ", "868 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO", "869 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO", "871 - CEMIG GERACAO SUL S.A - MG", "874 - CEMIG GERACAO SUL S.A.", "875 - AESAN ENGENHARIA E PARTICIPACOES LTDA - RJ", "877 - 1 ASSOCIACAO INSTITUTO NACIONAL DE MATEMATICA PURA - RJ", "878 - FUND. INST. DE GEOTECNIA DO MUN. DO R.J - GEORIO - RJ", "881 - PETRÓLEO BRASILEIRO S/A - PETROBRÁS - RJ", "882 - MRS LOGISTICA S/A - RJ", "883 - AUTOPISTA LITORAL SUL S.A - SC", "884 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO", "885 - EMPRESA MUNICIPAL DE MORADIA URBANIZACAO E SANEAME - RJ", "886 - EMPRESA MUNICIPAL DE MORADIA URBANIZACAO E SANEAME - RJ", "887 - LIGHT - ENERGIA S/A - RJ", "889 - DNIT-DEPARTAMENTO NACIONAL DE INFRAEST DE TRANSPOR - SP", "890 - GERDAU - MG", "891 - SANTA FE ENERGIA S/A - ES", "892 - 1 MRS LOGISTICA S/A", "892-2 MRS LOGISTICA S/A", "892-3 MRS LOGISTICA S/A", "892-4 MRS LOGISTICA S/A", "892-6 MRS LOGISTICA S/A", "892-7 MRS LOGISTICA S/A", "892-8 MRS LOGISTICA S/A", "892-9 MRS LOGISTICA S/A", "892-10 MRS LOGISTICA S/A", "892-11 MRS LOGISTICA S/A", "892-12 MRS LOGISTICA S/A", "893 - AUTOPISTA PLANALTO SUL S.A - SC", "894 - PREFEITURA DA CIDADE DO RIO DE JANEIRO", "895-1 - AESAN ENGENHARIA E PARTICIPACOES LTDA - RJ", "895-2 AESAN ENGENHARIA E PARTICIPACOES LTDA - RJ", "896 - CEMIG GERACAO E TRANSMISSAO S.A", "897 - CONSORCIO CANDONGA", "898 - CONCESSIONARIA DO SISTEMA ANHANGUERA-BANDEIRANTES", "900 - FURNAS CENTRAIS ELÉTRICAS S/A", "901 - AUTOPISTA LITORAL SUL S.A.", "902 - CONCESSIONARIA DAS RODOVIAS INTEGRADAS DO SUL S.A.", "903 - AESAN ENGENHARIA E PARTICIPACOES LTDA", "904 - MRS LOGISTICA S/A", "905 - EMPRESA DE TECNOLOGIA E INFORMACOES DA PREVIDENCIA", "906 - AUTOPISTA LITORAL SUL S.A.", "907 - MRS LOGISTICA S/A", "908 - CEMIG DISTRIBUICAO S.A", "909 - CEMIG DISTRIBUICAO S.A", "910 - PETROBRAS TRANSPORTE S.A. -TRANSPETRO", "911 - ENGIE SOLUCOES DE OPERACAO E MANUTENCAO LTDA.", "912 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO", "913 - AUTOPISTA LITORAL SUL S.A.", "914 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAU", "915 - AUTOPISTA PLANALTO SUL S.A", "916 - GERDAU ACOS LONGOS S.A", "917 - PETROBRAS TRANSPORTE S.A. -TRANSPETRO", "918 - MRS", "919 - GEORIO", "920 - CCR VIACOSTEIRA", "921 - SEIC", "922 - CEMIG", "923 - CCR VIA SUL", "924 - CEMIG", "925 - ARTERIS", "926 - CEEE-G", "927 - DNIT-DEPARTAMENTO NACIONAL DE INFRAEST DE TRANSPOR - SP", "928 - ARTERIS", "929 - ARTERIS", "930 - SEIOP", "931 - GERDAU", "932 - ECORIOMINAS", "933 - AEGEA", "934 - IGUÁ - RJ", "935 - ENGIE - RN", "936 - ARTERIS", "937 - CCR", "938 - AEGEA", "939 - AEGEA", "940 - CCR", "941 - ECORIOMINAS", "942 - RUMO", "943 - ARTERIS", "944 - STATE", "945 - CCR", "946 - CCR", "947 - CCR", "948 - G5 ENGENHARIA", "949 - DNIT", "950 - CSG", "951 - ECORIOMINAS", "952 - CCR", "953 - BRASFELS", "954 - AUTOPISTA PLANALTO SUL", "955 - RUMO", "956 - CORSAN", "957 - EPR", "958 - AGUAS DO RIO 4 SPE", "959 - CCR", "960 - VLI", "961 - METRO BH", "962 - ION EMUSA", "OBRA 963 - CSG", "OBRA 964 - AUTOPISTA L SUL", "966 - SABESP", "967 - ARTERIS", "968 - RUMO", "971 - EMAE"];
const ADMIN_DEPARTMENTS=["SUPPLY CHAIN", "EQUIPAMENTOS", "COMERCIAL", "PESSOAS (RH/DP)", "MARKETING", "DIRETORIA", "FINANÇAS (CONTABILIDADE/FINANCEIRO)", "CADASTRO", "PLANEJAMENTO & CONTROLE", "TI", "ENGENHARIA", "PLANEJAMENTO ESTRATÉGICO", "QSMS", "SEDE"];
const WORK_CENTER_RECORD_FIELDS=['centroCusto','centroDeCusto','costCenter','numeroObra','obra','obraDepto','obraDepartamento','centro_obra','centro_departamento','centro_custo','cc','work','issuerDepartment','recipientDepartment'];
let formEditorConfig=null;
let selectedEditorFieldId='priority';
let currentDetailId = null;
let toastTimer = null;
let activeLoginUser = null;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function icon(name){
  const icons={
    clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    tool:'<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5-5L12 4 4 12l-2 5 5-2 8-8Z"/><path d="m14 10 7 7-4 4-7-7"/></svg>',
    check:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    building:'<svg viewBox="0 0 24 24"><path d="M4 21V5l8-3 8 3v16"/><path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1"/></svg>',
    truck:'<svg viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    box:'<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v8l9 5 9-5V8M12 13v8"/></svg>',
    pin:'<svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></svg>'
  }; return icons[name]||icons.box;
}
function loadRequests(){try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(raw)?raw:[]}catch(e){return []}}
function saveRequests(){localStorage.setItem(STORAGE_KEY,JSON.stringify(requests))}
function nowIso(){return new Date().toISOString()}
function escapeHtml(v){return String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

function normalizeWorkCenterValue(value){
  const txt=String(value??'').trim().replace(/\\s+/g,' ');if(!txt)return '';
  const normalized=txt.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
  if(['-','todos','todas','selecione','selecione...','sem obra','sem centro de custo','nao informado','obra/depto','obra / departamento'].includes(normalized))return '';
  return txt.replace(/^obra\\s*\\/\\s*depto\\s+/i,'').trim();
}
function collectWorkCenterRecord(target,record){
  if(!record||typeof record!=='object')return;
  WORK_CENTER_RECORD_FIELDS.forEach(key=>{const value=record[key];if(value&&typeof value!=='object'){const clean=normalizeWorkCenterValue(value);if(clean)target.add(clean)}});
  ['values','data','formData'].forEach(container=>{const source=record[container];if(!source||typeof source!=='object')return;WORK_CENTER_RECORD_FIELDS.forEach(key=>{const entry=source[key];const value=entry&&typeof entry==='object'&&'value' in entry?entry.value:entry;const clean=normalizeWorkCenterValue(value);if(clean)target.add(clean)})});
}
function collectIntegratedWorkCenterOptions(){
  const workSet=new Set(CONTRACT_WORK_CENTERS.map(normalizeWorkCenterValue).filter(Boolean));
  const departmentSet=new Set(ADMIN_DEPARTMENTS.map(normalizeWorkCenterValue).filter(Boolean));
  const integrated=new Set();
  const preferred=['gestao_fretes_solicitacoes_v1','seel_fornecedores_items_v1','seel_requests_google_forms_exato_v1','frota_veiculos_v4_importacao_inicial'];
  const keys=new Set(preferred);
  try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key&&/(frete|fornecedor|contrato|cadastro|frota)/i.test(key))keys.add(key)}}catch(e){}
  keys.forEach(key=>{try{const parsed=JSON.parse(localStorage.getItem(key)||'null');const rows=Array.isArray(parsed)?parsed:Array.isArray(parsed?.items)?parsed.items:Array.isArray(parsed?.records)?parsed.records:Array.isArray(parsed?.requests)?parsed.requests:[];rows.forEach(row=>collectWorkCenterRecord(integrated,row))}catch(e){}});
  try{requests.forEach(row=>{[row.issuerDepartment,row.recipientDepartment].forEach(value=>{const clean=normalizeWorkCenterValue(value);if(clean)integrated.add(clean)})})}catch(e){}
  const options=[];
  [...workSet].sort((a,b)=>a.localeCompare(b,'pt-BR',{numeric:true,sensitivity:'base'})).forEach(value=>options.push({group:'Obras',value,label:value}));
  [...departmentSet].sort((a,b)=>a.localeCompare(b,'pt-BR',{numeric:true,sensitivity:'base'})).forEach(value=>options.push({group:'Departamentos administrativos',value,label:value}));
  [...integrated].filter(value=>!workSet.has(value)&&!departmentSet.has(value)).sort((a,b)=>a.localeCompare(b,'pt-BR',{numeric:true,sensitivity:'base'})).forEach(value=>options.push({group:'Dados integrados dos módulos',value,label:value}));
  return options;
}
function normalizedEditorOptions(options){return (Array.isArray(options)?options:[]).map(item=>typeof item==='string'?{value:item,label:item,group:''}:{value:String(item?.value??item?.label??''),label:String(item?.label??item?.value??''),group:String(item?.group||'')}).filter(item=>item.value)}
function defaultFormFieldDefinitions(){
  const cnpjIssuer=[{value:'72.030.927/0005-09',label:'72.030.927/0005-09 - Caxias (Sede)'},{value:'72.030.927/0001-85',label:'72.030.927/0001-85 - Obras RJ'},{value:'72.030.927/0007-70',label:'72.030.927/0007-70 - Obras MG'},{value:'72.030.927/0006-90',label:'72.030.927/0006-90 - Obras SC'}];
  const cnpjRecipient=[{value:'72.030.927/0005-09',label:'72.030.927/0005-09 - Caxias (Sede)'},{value:'72.030.927/0001-85',label:'72.030.927/0001-85 - Rio de Janeiro'},{value:'72.030.927/0007-70',label:'72.030.927/0007-70 - Minas Gerais'},{value:'72.030.927/0006-90',label:'72.030.927/0006-90 - Sul'}];
  const works=collectIntegratedWorkCenterOptions();
  return [
    {id:'priority',section:'Identificação da solicitação',label:'Prioridade da solicitação',type:'select',required:true,visible:true,help:'A prioridade define automaticamente a data limite.',placeholder:'Selecione a prioridade',width:'1',order:10,system:true,options:[{value:'Normal',label:'Normal - 2 dias úteis'},{value:'Urgente',label:'Urgente - 1 dia útil'}],systemValues:['Normal','Urgente']},
    {id:'requesterName',section:'1. Dados do solicitante',label:'Nome do solicitante',type:'text',required:true,visible:true,help:'Preenchido automaticamente pelo login do aplicativo principal.',placeholder:'Carregado pelo login',width:'1',order:20,system:true,readonly:true},
    {id:'requesterEmail',section:'1. Dados do solicitante',label:'E-mail para envio da solicitação',type:'email',required:true,visible:true,help:'Preenchido automaticamente pelo login do aplicativo principal.',placeholder:'Carregado pelo login',width:'2',order:30,system:true,readonly:true},
    {id:'issuerCnpj',section:'2. Dados do emitente',label:'CNPJ emitente',type:'select',required:true,visible:true,help:'Selecione a unidade responsável pela solicitação.',placeholder:'Selecione',width:'2',order:40,system:true,options:cnpjIssuer},
    {id:'issuerDepartment',section:'2. Dados do emitente',label:'Obra / Departamento do emitente',type:'select',required:true,visible:true,help:'Lista integrada aos módulos de Fretes, Cadastro e Contratos.',placeholder:'Selecione a obra ou departamento',width:'1',order:50,system:true,options:works,integratedList:true},
    {id:'recipientCnpj',section:'3. Dados do destinatário',label:'CNPJ destinatário',type:'select',required:true,visible:true,help:'Selecione a unidade destinatária.',placeholder:'Selecione',width:'2',order:60,system:true,options:cnpjRecipient},
    {id:'recipientDepartment',section:'3. Dados do destinatário',label:'Obra / Departamento do destinatário',type:'select',required:true,visible:true,help:'Lista integrada aos módulos de Fretes, Cadastro e Contratos.',placeholder:'Selecione a obra ou departamento',width:'1',order:70,system:true,options:works,integratedList:true},
    {id:'recipientAddress',section:'3. Dados do destinatário',label:'Endereço completo do destinatário',type:'textarea',required:true,visible:true,help:'Informe logradouro, número, complemento, bairro, cidade, UF e CEP.',placeholder:'Logradouro, número, complemento, bairro, cidade, UF e CEP',width:'full',order:80,system:true},
    {id:'freightResponsible',section:'4. Responsável pelo frete',label:'Responsável pelo frete',type:'select',required:true,visible:true,help:'A opção Veículo SEEL preenche automaticamente os dados da transportadora.',placeholder:'Selecione',width:'1',order:90,system:true,options:[{value:'Veículo SEEL',label:'Veículo SEEL'},{value:'Transportadora',label:'Transportadora'}],systemValues:['Veículo SEEL','Transportadora']},
    {id:'carrierName',section:'4. Responsável pelo frete',label:'Nome da transportadora',type:'text',required:true,visible:true,help:'Preenchido automaticamente para Veículo SEEL ou informado para transportadora externa.',placeholder:'Informe a transportadora',width:'1',order:100,system:true},
    {id:'carrierCnpj',section:'4. Responsável pelo frete',label:'CNPJ da transportadora',type:'text',required:true,visible:true,help:'Use o formato 00.000.000/0000-00.',placeholder:'00.000.000/0000-00',width:'1',order:110,system:true}
  ];
}
function normalizeFieldDefinition(field,index=0){
  const clean={...field};clean.id=String(clean.id||\`custom_\${Date.now()}_\${index}\`);clean.label=String(clean.label||'Nova pergunta');clean.section=String(clean.section||'6. Informações adicionais');clean.type=['text','textarea','email','number','date','select'].includes(clean.type)?clean.type:'text';clean.required=!!clean.required;clean.visible=clean.visible!==false;clean.readonly=!!clean.readonly;clean.help=String(clean.help||'');clean.placeholder=String(clean.placeholder||'');clean.width=['1','2','full'].includes(String(clean.width))?String(clean.width):'1';clean.order=Number.isFinite(Number(clean.order))?Number(clean.order):(index+1)*10;clean.system=!!clean.system;clean.custom=!clean.system;clean.options=normalizedEditorOptions(clean.options);return clean;
}
function loadFormEditorConfig(){
  const defaults=defaultFormFieldDefinitions();let stored=null;try{stored=JSON.parse(localStorage.getItem(FORM_EDITOR_STORAGE_KEY)||'null')}catch(e){}
  const storedFields=stored?.fields&&typeof stored.fields==='object'?stored.fields:{};const fields={};
  defaults.forEach((def,index)=>{const saved=storedFields[def.id]||{};const merged=normalizeFieldDefinition({...def,...saved,system:true},index);merged.required=saved.required===undefined?def.required:!!saved.required;merged.visible=saved.visible===undefined?def.visible:saved.visible!==false;merged.options=normalizedEditorOptions(def.integratedList&&saved.manualOptions!==true?def.options:(saved.options||def.options));fields[def.id]=merged});
  Object.values(storedFields).filter(field=>field&&field.id&&!fields[field.id]).forEach((field,index)=>{const normalized=normalizeFieldDefinition({...field,system:false,custom:true},defaults.length+index);fields[normalized.id]=normalized});
  return {version:2,fields};
}
function saveFormEditorConfig(){try{localStorage.setItem(FORM_EDITOR_STORAGE_KEY,JSON.stringify(formEditorConfig))}catch(e){showToast('Não foi possível salvar a configuração do formulário.')}}
function ensureSelectValue(select,value){if(!select||value===undefined||value===null)return;const text=String(value);if(text&&!Array.from(select.options).some(option=>option.value===text)){const option=document.createElement('option');option.value=text;option.textContent=text+' (registro atual)';select.appendChild(option)}select.value=text}
function populateConfiguredSelect(select,field){
  if(!select)return;const current=select.value;select.innerHTML='';const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent=field.placeholder||'Selecione';select.appendChild(placeholder);
  const options=normalizedEditorOptions(field.options);const grouped=new Map();const plain=[];options.forEach(option=>{if(option.group){if(!grouped.has(option.group))grouped.set(option.group,[]);grouped.get(option.group).push(option)}else plain.push(option)});
  plain.forEach(item=>{const option=document.createElement('option');option.value=item.value;option.textContent=item.label;select.appendChild(option)});
  grouped.forEach((items,group)=>{const optgroup=document.createElement('optgroup');optgroup.label=group;items.forEach(item=>{const option=document.createElement('option');option.value=item.value;option.textContent=item.label;optgroup.appendChild(option)});select.appendChild(optgroup)});
  if(current)ensureSelectValue(select,current);
}
function editorFieldList(){return Object.values(formEditorConfig?.fields||{}).sort((a,b)=>Number(a.order||0)-Number(b.order||0)||String(a.label).localeCompare(String(b.label),'pt-BR'))}
function customFieldControlId(id){return \`customField_\${id}\`}
function fieldWidthClass(width){return width==='full'?'full':width==='2'?'span2':''}
function customFieldHtml(field,value=''){
  const id=customFieldControlId(field.id);const req=field.required?'required':'';const ro=field.readonly?'readonly':'';const cls=fieldWidthClass(field.width);let control='';
  if(field.type==='textarea')control=\`<textarea id="\${escapeHtml(id)}" data-custom-field="\${escapeHtml(field.id)}" \${req} \${ro} placeholder="\${escapeHtml(field.placeholder||'')}">\${escapeHtml(value||'')}</textarea>\`;
  else if(field.type==='select')control=\`<select id="\${escapeHtml(id)}" data-custom-field="\${escapeHtml(field.id)}" \${req}><option value="">\${escapeHtml(field.placeholder||'Selecione')}</option>\${normalizedEditorOptions(field.options).map(option=>\`<option value="\${escapeHtml(option.value)}" \${String(value)===String(option.value)?'selected':''}>\${escapeHtml(option.label)}</option>\`).join('')}</select>\`;
  else control=\`<input id="\${escapeHtml(id)}" data-custom-field="\${escapeHtml(field.id)}" type="\${escapeHtml(field.type)}" value="\${escapeHtml(value||'')}" \${req} \${ro} placeholder="\${escapeHtml(field.placeholder||'')}">\`;
  return \`<div class="field \${cls}"><label for="\${escapeHtml(id)}">\${escapeHtml(field.label)}\${field.required?' <span class="req">*</span>':''}</label>\${control}\${field.help?\`<div class="help">\${escapeHtml(field.help)}</div>\`:''}</div>\`;
}
function collectCurrentCustomValues(){const values={};$$('[data-custom-field]').forEach(control=>{values[control.dataset.customField]=control.value});return values}
function renderCustomFields(values=null){
  const host=$('#customFieldsHost');if(!host)return;const preserved=values||collectCurrentCustomValues();const customFields=editorFieldList().filter(field=>field.custom&&field.visible!==false);const groups=new Map();customFields.forEach(field=>{const section=field.section||'6. Informações adicionais';if(!groups.has(section))groups.set(section,[]);groups.get(section).push(field)});
  host.innerHTML=[...groups.entries()].map(([section,fields])=>\`<div class="section custom-form-section" data-custom-section="\${escapeHtml(section)}"><div class="section-title">\${escapeHtml(section)}</div><div class="section-body"><div class="form-grid">\${fields.map(field=>customFieldHtml(field,preserved[field.id]??'')).join('')}</div></div></div>\`).join('');
}
function collectCustomFieldValues(){const result={};editorFieldList().filter(field=>field.custom).forEach(field=>{const control=document.getElementById(customFieldControlId(field.id));if(control)result[field.id]=control.value});return result}
function setCustomFieldValues(values={}){renderCustomFields(values);Object.entries(values||{}).forEach(([id,value])=>{const control=document.getElementById(customFieldControlId(id));if(control)control.value=value??''})}
function customFieldDetailsHtml(values={}){const fields=editorFieldList().filter(field=>field.custom&&field.visible!==false&&String(values?.[field.id]??'').trim()!=='');if(!fields.length)return '';return \`<div class="detail-section"><div class="detail-section-title">Informações adicionais</div><div class="detail-content"><div class="detail-grid" style="margin:0">\${fields.map(field=>\`<div class="detail-kv"><small>\${escapeHtml(field.label)}</small><strong>\${escapeHtml(values[field.id]??'-')}</strong></div>\`).join('')}</div></div></div>\`}
function applyFormEditorConfig(){
  if(!formEditorConfig)formEditorConfig=loadFormEditorConfig();
  const systemFields=editorFieldList().filter(field=>field.system);
  systemFields.forEach(field=>{const control=document.getElementById(field.id);if(!control)return;const wrapper=control.closest('.field');if(wrapper){wrapper.classList.toggle('form-field-hidden',field.visible===false);wrapper.classList.remove('span2','full');const widthClass=fieldWidthClass(field.width);if(widthClass)wrapper.classList.add(widthClass)}control.disabled=field.visible===false;control.required=!!field.required&&field.visible!==false;if('readOnly' in control)control.readOnly=!!field.readonly;control.placeholder=field.placeholder||control.placeholder||'';
    const label=wrapper?.querySelector(\`label[for="\${field.id}"]\`);if(label)label.innerHTML=\`\${escapeHtml(field.label)}\${field.required?' <span class="req">*</span>':''}\`;
    let help=wrapper?.querySelector(\`[data-form-help="\${field.id}"]\`)||wrapper?.querySelector('.help');if(help&&!help.dataset.formHelp)help.dataset.formHelp=field.id;if(!help&&field.help){help=document.createElement('div');help.className='help';help.dataset.formHelp=field.id;control.insertAdjacentElement('afterend',help)}if(help){help.textContent=field.help||'';help.classList.toggle('hidden',!field.help)}
    if(field.type==='select'&&control.tagName==='SELECT')populateConfiguredSelect(control,field);
  });
  const parentGroups=new Map();systemFields.forEach(field=>{const wrapper=document.getElementById(field.id)?.closest('.field');const grid=wrapper?.parentElement;if(wrapper&&grid){if(!parentGroups.has(grid))parentGroups.set(grid,[]);parentGroups.get(grid).push({field,wrapper})}});parentGroups.forEach(items=>items.sort((a,b)=>a.field.order-b.field.order).forEach(item=>item.wrapper.parentElement.appendChild(item.wrapper)));
  renderCustomFields();
  ['issuerCnpj','recipientCnpj'].forEach(id=>normalizedEditorOptions(formEditorConfig.fields[id]?.options).forEach(option=>{CNPJ_LABELS[option.value]=option.label.replace(option.value,'').replace(/^\\s*-\\s*/,'')||option.label}));
}
function optionToEditorLine(option){const prefix=option.group?\`\${option.group} :: \`:'';return \`\${prefix}\${option.value}\${option.label!==option.value?\` | \${option.label}\`:''}\`}
function parseEditorOptionLines(value){const result=[];const seen=new Set();String(value||'').split(/\\r?\\n/).map(line=>line.trim()).filter(Boolean).forEach(line=>{let group='';let payload=line;const groupIndex=line.indexOf('::');if(groupIndex>=0){group=line.slice(0,groupIndex).trim();payload=line.slice(groupIndex+2).trim()}const separator=payload.indexOf('|');const optionValue=(separator>=0?payload.slice(0,separator):payload).trim();const label=(separator>=0?payload.slice(separator+1):payload).trim()||optionValue;if(optionValue&&!seen.has(optionValue)){seen.add(optionValue);result.push({group,value:optionValue,label})}});return result}
function renderEditorOptionRows(options=[]){const rows=$('#editorOptionRows');if(!rows)return;const normalized=normalizedEditorOptions(options);rows.innerHTML=normalized.length?normalized.map((option,index)=>\`<div class="editor-option-row" data-option-row="\${index}"><input class="editor-option-value" value="\${escapeHtml(option.value)}" placeholder="Valor"><input class="editor-option-label" value="\${escapeHtml(option.label)}" placeholder="Texto exibido"><input class="editor-option-group" value="\${escapeHtml(option.group||'')}" placeholder="Grupo opcional"><button class="editor-option-remove" type="button" title="Remover">×</button></div>\`).join(''):'<div class="editor-option-empty">Nenhuma opção cadastrada.</div>';$('#editorOptionCount').textContent=\`\${normalized.length} opção(ões)\`;$$('.editor-option-remove').forEach(button=>button.addEventListener('click',()=>{button.closest('.editor-option-row')?.remove();refreshEditorOptionCount();renderEditorPreview()}));$$('#editorOptionRows input').forEach(input=>input.addEventListener('input',()=>{refreshEditorOptionCount();renderEditorPreview()}))}
function collectEditorOptionRows(){return $$('.editor-option-row').map(row=>({value:row.querySelector('.editor-option-value')?.value.trim()||'',label:row.querySelector('.editor-option-label')?.value.trim()||'',group:row.querySelector('.editor-option-group')?.value.trim()||''})).filter(option=>option.value).map(option=>({...option,label:option.label||option.value}))}
function refreshEditorOptionCount(){const count=$$('.editor-option-row').length;const badge=$('#editorOptionCount');if(badge)badge.textContent=\`\${count} opção(ões)\`}
function addEditorOptionRow(value='',label='',group=''){const options=collectEditorOptionRows();options.push({value:value||\`opcao_\${options.length+1}\`,label:label||value||\`Opção \${options.length+1}\`,group});renderEditorOptionRows(options);setTimeout(()=>{$$('.editor-option-row').at(-1)?.querySelector('.editor-option-value')?.focus()},0)}
function selectedEditorField(){return formEditorConfig?.fields?.[selectedEditorFieldId]||editorFieldList()[0]||null}
function sectionSuggestions(){return [...new Set(editorFieldList().map(field=>field.section).filter(Boolean))]}
function renderEditorQuestionList(fields){const list=$('#editorQuestionList');if(!list)return;const groups=new Map();fields.forEach(field=>{const section=field.section||'Sem seção';if(!groups.has(section))groups.set(section,[]);groups.get(section).push(field)});list.innerHTML=fields.length?[...groups.entries()].map(([section,items])=>\`<div class="editor-list-section"><div class="editor-list-section-title"><b>\${escapeHtml(section)}</b><span>\${items.length}</span></div>\${items.map(field=>\`<button type="button" class="editor-question-item \${field.id===selectedEditorFieldId?'active':''}" data-editor-field="\${escapeHtml(field.id)}"><span class="editor-question-item-main"><b title="\${escapeHtml(field.label)}">\${escapeHtml(field.label)}</b><span class="editor-question-item-meta"><i class="editor-mini-badge \${field.type==='select'?'select':''}">\${field.type==='select'?'Lista':field.type}</i>\${field.custom?'<i class="editor-mini-badge select">Personalizada</i>':''}\${field.required?'<i class="editor-mini-badge required">Obrigatória</i>':''}\${field.visible===false?'<i class="editor-mini-badge hidden-field">Oculta</i>':''}</span></span><span class="editor-order-badge">\${Math.round(Number(field.order||0)/10)}</span></button>\`).join('')}</div>\`).join(''):'<div class="empty">Nenhuma pergunta encontrada.</div>';$$('[data-editor-field]').forEach(button=>button.addEventListener('click',()=>{selectedEditorFieldId=button.dataset.editorField;renderFormEditor()}))}
function renderEditorPreview(){const preview=$('#editorLivePreview');if(!preview)return;const visible=$('#editorQuestionVisible')?.checked!==false;const label=$('#editorQuestionLabel')?.value.trim()||'Texto da pergunta';const help=$('#editorQuestionHelp')?.value.trim()||'';const placeholder=$('#editorQuestionPlaceholder')?.value||'';const type=$('#editorQuestionType')?.value||'text';const required=$('#editorQuestionRequired')?.checked;const readonly=$('#editorQuestionReadonly')?.checked;let control='';const options=collectEditorOptionRows();if(type==='textarea')control=\`<textarea placeholder="\${escapeHtml(placeholder)}" \${readonly?'readonly':''}></textarea>\`;else if(type==='select')control=\`<select><option>\${escapeHtml(placeholder||'Selecione')}</option>\${options.slice(0,5).map(option=>\`<option>\${escapeHtml(option.label)}</option>\`).join('')}</select>\`;else control=\`<input type="\${escapeHtml(type)}" placeholder="\${escapeHtml(placeholder)}" \${readonly?'readonly':''}>\`;preview.innerHTML=\`<div class="editor-preview-field \${visible?'':'custom-field-disabled'}"><div class="field"><label>\${escapeHtml(label)}\${required?' <span class="req">*</span>':''}</label>\${control}\${help?\`<div class="help">\${escapeHtml(help)}</div>\`:''}</div></div>\`;const status=$('#editorPreviewStatus');if(status){status.textContent=visible?'Visível':'Oculto';status.classList.toggle('hidden-state',!visible)}}
function renderFormEditor(){
  if(!formEditorConfig)formEditorConfig=loadFormEditorConfig();const query=($('#editorQuestionSearch')?.value||'').trim().toLowerCase();const mode=$('#editorQuestionFilter')?.value||'all';const fields=editorFieldList();if(!formEditorConfig.fields[selectedEditorFieldId])selectedEditorFieldId=fields[0]?.id||'';const visible=fields.filter(field=>{const text=[field.label,field.section,field.id].join(' ').toLowerCase();const modeOk=mode==='all'||(mode==='visible'&&field.visible!==false)||(mode==='required'&&field.required)||(mode==='custom'&&field.custom)||(mode==='hidden'&&field.visible===false);return modeOk&&(!query||text.includes(query))});
  $('#editorQuestionCount').textContent=\`\${fields.length} pergunta(s) · \${fields.filter(field=>field.custom).length} personalizada(s)\`;renderEditorQuestionList(visible);
  const field=selectedEditorField();if(!field)return;selectedEditorFieldId=field.id;$('#editorSectionTag').textContent=field.section;$('#editorQuestionTitle').textContent=field.label;$('#editorFieldType').textContent=field.type==='select'?'Lista suspensa':field.type;$('#editorFieldProtection').textContent=field.custom?'Pergunta personalizada':'Campo padrão protegido';$('#editorFieldProtection').classList.toggle('custom',field.custom);
  $('#editorQuestionLabel').value=field.label;$('#editorQuestionHelp').value=field.help||'';$('#editorQuestionPlaceholder').value=field.placeholder||'';$('#editorQuestionSection').value=field.section||'';$('#editorQuestionType').value=field.type;$('#editorQuestionWidth').value=field.width||'1';$('#editorQuestionRequired').checked=!!field.required;$('#editorQuestionVisible').checked=field.visible!==false;$('#editorQuestionReadonly').checked=!!field.readonly;
  $('#editorQuestionSection').disabled=!field.custom;$('#editorQuestionType').disabled=!field.custom;$('#editorDeleteQuestion').disabled=!field.custom;const sections=sectionSuggestions();$('#editorSectionSuggestions').innerHTML=sections.map(section=>\`<option value="\${escapeHtml(section)}"></option>\`).join('');
  const options=normalizedEditorOptions(field.options);$('#editorOptionsBox').classList.toggle('hidden',field.type!=='select');renderEditorOptionRows(options);$('#syncCurrentWorkList').classList.toggle('hidden',!field.integratedList);$('#editorListNote').textContent=field.integratedList?(field.manualOptions===true?'Lista personalizada. Use “Usar lista automática de obras” para restaurar a integração.':'Lista automática integrada aos módulos da plataforma.'):(field.systemValues?.length?'Valores obrigatórios para as regras: '+field.systemValues.join(', ')+'.':'Você pode cadastrar, ordenar e agrupar as opções.');renderEditorPreview();
}
function saveCurrentEditorField(){
  const field=selectedEditorField();if(!field)return;const label=$('#editorQuestionLabel').value.trim();if(!label){showToast('Informe o texto da pergunta.');return}field.label=label;field.help=$('#editorQuestionHelp').value.trim();field.placeholder=$('#editorQuestionPlaceholder').value.trim();field.width=$('#editorQuestionWidth').value||'1';field.required=$('#editorQuestionRequired').checked;field.visible=$('#editorQuestionVisible').checked;field.readonly=$('#editorQuestionReadonly').checked;if(field.custom){field.section=$('#editorQuestionSection').value.trim()||'6. Informações adicionais';field.type=$('#editorQuestionType').value||'text'}
  if(field.type==='select'){const options=collectEditorOptionRows();if(!options.length){showToast('A lista suspensa precisa ter ao menos uma opção.');return}if(field.systemValues?.length){const values=new Set(options.map(option=>option.value));const missing=field.systemValues.filter(value=>!values.has(value));if(missing.length){showToast('Mantenha os valores obrigatórios: '+missing.join(', ')+'.');return}}field.options=options;if(field.integratedList)field.manualOptions=true}
  saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();updateFreightRule();showToast('Alterações salvas no formulário.');
}
function normalizeEditorOrders(){editorFieldList().forEach((field,index)=>field.order=(index+1)*10)}
function createCustomEditorField(){normalizeEditorOrders();const fields=editorFieldList();const id=\`custom_\${Date.now().toString(36)}_\${Math.random().toString(36).slice(2,6)}\`;formEditorConfig.fields[id]=normalizeFieldDefinition({id,label:'Nova pergunta',section:'6. Informações adicionais',type:'text',required:false,visible:true,readonly:false,help:'',placeholder:'',width:'1',order:(fields.length+1)*10,system:false,custom:true},fields.length);selectedEditorFieldId=id;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Nova pergunta criada. Edite e salve.')}
function duplicateCurrentEditorField(){const field=selectedEditorField();if(!field)return;normalizeEditorOrders();const id=\`custom_\${Date.now().toString(36)}_\${Math.random().toString(36).slice(2,6)}\`;const copy=normalizeFieldDefinition({...field,id,label:\`\${field.label} - cópia\`,system:false,custom:true,integratedList:false,manualOptions:true,systemValues:[],order:Number(field.order||0)+5},editorFieldList().length);formEditorConfig.fields[id]=copy;normalizeEditorOrders();selectedEditorFieldId=id;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Pergunta duplicada.')}
function deleteCurrentEditorField(){const field=selectedEditorField();if(!field)return;if(!field.custom){showToast('Campos padrão não podem ser excluídos. Você pode ocultá-los.');return}if(!confirm(\`Excluir a pergunta “\${field.label}”? Os valores antigos permanecerão nos registros já salvos.\`))return;delete formEditorConfig.fields[field.id];selectedEditorFieldId=editorFieldList()[0]?.id||'';saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Pergunta excluída.')}
function moveCurrentEditorField(direction){const fields=editorFieldList();const index=fields.findIndex(field=>field.id===selectedEditorFieldId);const target=index+direction;if(index<0||target<0||target>=fields.length)return;const current=fields[index],other=fields[target];const temp=current.order;current.order=other.order;other.order=temp;normalizeEditorOrders();saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(direction<0?'Pergunta movida para cima.':'Pergunta movida para baixo.')}
function resetCurrentEditorField(){const field=selectedEditorField();if(!field)return;const defaults=defaultFormFieldDefinitions();const standard=defaults.find(item=>item.id===field.id);if(!confirm('Restaurar esta pergunta?'))return;if(standard){const order=field.order;formEditorConfig.fields[field.id]=normalizeFieldDefinition({...standard,order,system:true},0)}else{formEditorConfig.fields[field.id]=normalizeFieldDefinition({...field,label:'Nova pergunta',help:'',placeholder:'',required:false,visible:true,readonly:false,type:'text',options:[]},0)}saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();updateFreightRule();showToast('Pergunta restaurada.')}
function resetAllEditorFields(){if(!confirm('Restaurar o formulário padrão? Perguntas personalizadas serão removidas.'))return;try{localStorage.removeItem(FORM_EDITOR_STORAGE_KEY)}catch(e){}formEditorConfig=loadFormEditorConfig();selectedEditorFieldId='priority';applyFormEditorConfig();renderFormEditor();resetForm();showToast('Formulário padrão restaurado.')}
function syncIntegratedWorkLists(){const options=collectIntegratedWorkCenterOptions();['issuerDepartment','recipientDepartment'].forEach(id=>{const field=formEditorConfig.fields[id];if(field){field.options=options;field.manualOptions=false}});saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(\`\${options.length} obras e departamentos sincronizados.\`)}
function exportFormEditorConfig(){const payload={module:'Cadastro de Itens',exportedAt:nowIso(),version:2,config:formEditorConfig};downloadFile(JSON.stringify(payload,null,2),'configuracao_formulario_cadastro_itens.json','application/json;charset=utf-8');showToast('Configuração exportada.')}
function importFormEditorConfig(file){if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const imported=parsed?.config||parsed;if(!imported?.fields||typeof imported.fields!=='object')throw new Error('Formato inválido');const defaults=defaultFormFieldDefinitions();const merged={version:2,fields:{}};defaults.forEach((def,index)=>{const saved=imported.fields[def.id]||{};merged.fields[def.id]=normalizeFieldDefinition({...def,...saved,system:true},index)});Object.values(imported.fields).filter(field=>field?.id&&!merged.fields[field.id]).forEach((field,index)=>{const normalized=normalizeFieldDefinition({...field,system:false,custom:true},defaults.length+index);merged.fields[normalized.id]=normalized});formEditorConfig=merged;normalizeEditorOrders();saveFormEditorConfig();applyFormEditorConfig();selectedEditorFieldId=editorFieldList()[0]?.id||'';renderFormEditor();showToast('Configuração importada com sucesso.')}catch(error){showToast('Arquivo de configuração inválido.')}};reader.readAsText(file)}
function initializeFormEditor(){
  formEditorConfig=loadFormEditorConfig();applyFormEditorConfig();
  $('#editorQuestionSearch')?.addEventListener('input',renderFormEditor);$('#editorQuestionFilter')?.addEventListener('change',renderFormEditor);$('#saveCurrentQuestion')?.addEventListener('click',saveCurrentEditorField);$('#resetCurrentQuestion')?.addEventListener('click',resetCurrentEditorField);$('#resetAllFormEditor')?.addEventListener('click',resetAllEditorFields);$('#refreshIntegratedWorks')?.addEventListener('click',syncIntegratedWorkLists);$('#syncCurrentWorkList')?.addEventListener('click',syncIntegratedWorkLists);$('#editorNewQuestion')?.addEventListener('click',createCustomEditorField);$('#editorDuplicateQuestion')?.addEventListener('click',duplicateCurrentEditorField);$('#editorDeleteQuestion')?.addEventListener('click',deleteCurrentEditorField);$('#editorMoveUp')?.addEventListener('click',()=>moveCurrentEditorField(-1));$('#editorMoveDown')?.addEventListener('click',()=>moveCurrentEditorField(1));$('#exportFormEditor')?.addEventListener('click',exportFormEditorConfig);$('#importFormEditor')?.addEventListener('click',()=>$('#importFormEditorFile')?.click());$('#importFormEditorFile')?.addEventListener('change',event=>{importFormEditorConfig(event.target.files?.[0]);event.target.value=''});
  $('#addEditorOption')?.addEventListener('click',()=>{const value=$('#editorOptionQuickValue').value.trim();const label=$('#editorOptionQuickLabel').value.trim();addEditorOptionRow(value,label);$('#editorOptionQuickValue').value='';$('#editorOptionQuickLabel').value=''});$('#sortEditorOptions')?.addEventListener('click',()=>renderEditorOptionRows(collectEditorOptionRows().sort((a,b)=>a.label.localeCompare(b.label,'pt-BR'))));$('#dedupeEditorOptions')?.addEventListener('click',()=>{const seen=new Set();renderEditorOptionRows(collectEditorOptionRows().filter(option=>{const key=option.value.toLowerCase();if(seen.has(key))return false;seen.add(key);return true}))});$('#clearEditorOptions')?.addEventListener('click',()=>{if(confirm('Limpar todas as opções desta lista?'))renderEditorOptionRows([])});
  ['editorQuestionLabel','editorQuestionHelp','editorQuestionPlaceholder','editorQuestionSection','editorQuestionType','editorQuestionWidth','editorQuestionRequired','editorQuestionVisible','editorQuestionReadonly'].forEach(id=>$('#'+id)?.addEventListener(['editorQuestionRequired','editorQuestionVisible','editorQuestionReadonly'].includes(id)?'change':'input',()=>{if(id==='editorQuestionType')$('#editorOptionsBox').classList.toggle('hidden',$('#editorQuestionType').value!=='select');renderEditorPreview()}));$('#editorQuestionType')?.addEventListener('change',()=>{$('#editorOptionsBox').classList.toggle('hidden',$('#editorQuestionType').value!=='select');renderEditorPreview()});
  renderFormEditor();
}

function formatDate(v,withTime=false){if(!v)return '-';const d=new Date(v);if(Number.isNaN(d.getTime()))return '-';return new Intl.DateTimeFormat('pt-BR',withTime?{dateStyle:'short',timeStyle:'short'}:{dateStyle:'short'}).format(d)}
function formatMoney(v){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0)}
function formatDuration(ms){ms=Math.max(0,Number(ms)||0);const sec=Math.floor(ms/1000);const days=Math.floor(sec/86400);const hours=Math.floor((sec%86400)/3600);const mins=Math.floor((sec%3600)/60);const secs=sec%60;return \`\${days}d \${String(hours).padStart(2,'0')}h \${String(mins).padStart(2,'0')}m \${String(secs).padStart(2,'0')}s\`}
function todayISO(){return new Date().toISOString().slice(0,10)}
function isBusinessDay(d){const day=d.getDay();return day!==0&&day!==6}
function workdayAdd(dateStr,days){let d=new Date(String(dateStr).slice(0,10)+'T12:00:00');let added=0;while(added<days){d.setDate(d.getDate()+1);if(isBusinessDay(d))added++}return d.toISOString().slice(0,10)}
function slaDaysFor(priority){return PRIORITY_SLA_DAYS[priority]||PRIORITY_SLA_DAYS[DEFAULT_PRIORITY]}
function deadlineFor(priority,dateStr=todayISO()){return workdayAdd(dateStr,slaDaysFor(priority))}
function businessDaysDiff(a,b){const A=new Date(String(a).slice(0,10)+'T12:00:00'),B=new Date(String(b).slice(0,10)+'T12:00:00');if(Number.isNaN(A.getTime())||Number.isNaN(B.getTime()))return 0;if(A.toDateString()===B.toDateString())return 0;const sign=B>A?1:-1;let d=new Date(A),count=0;while((sign===1&&d<B)||(sign===-1&&d>B)){d.setDate(d.getDate()+sign);if(isBusinessDay(d))count+=sign}return count}
function slaStatus(r){if(r.status==='Cadastrado no Sistema')return {txt:'Concluído',cls:'ok',rank:3,diff:0,label:'Processo encerrado'};const deadline=r.deadline||deadlineFor(r.priority||DEFAULT_PRIORITY,String(r.createdAt||nowIso()).slice(0,10));const diff=businessDaysDiff(todayISO(),deadline);if(diff<0)return {txt:'Em atraso',cls:'late',rank:0,diff,label:\`Vencido há \${Math.abs(diff)} dia(s) útil(is)\`};if(diff<=1)return {txt:'Em alerta',cls:'warn',rank:1,diff,label:diff===0?'Vence hoje':'Vence em 1 dia útil'};return {txt:'No prazo',cls:'ok',rank:2,diff,label:\`Vence em \${diff} dias úteis\`}}
function semaphoreLabel(st){if(st.cls==='late')return '🔴 Atraso';if(st.cls==='warn')return '🟡 Alerta';return '🟢 No prazo'}
function deadlineTime(r){return r.deadline?new Date(r.deadline+'T12:00:00').getTime():Number.MAX_SAFE_INTEGER}
function sumProduct(p){return (Number(p.quantity)||0)*(Number(p.unitValue)||0)}
function requestTotal(r){return (r.products||[]).reduce((s,p)=>s+sumProduct(p),0)}
function getPhaseElapsed(r,phase){let ms=Number(r.phaseDurations?.[phase])||0;if(r.status===phase&&phase!=='Cadastrado no Sistema'&&r.phaseStartedAt)ms+=Date.now()-new Date(r.phaseStartedAt).getTime();return Math.max(0,ms)}
function getTotalElapsed(r){return PHASES.reduce((s,p)=>s+getPhaseElapsed(r,p),0)}
function getCurrentRunElapsed(r){if(!r||r.status==='Cadastrado no Sistema'||!r.phaseStartedAt)return 0;return Math.max(0,Date.now()-new Date(r.phaseStartedAt).getTime())}
function renderStageTimes(r){return \`<div class="detail-section"><div class="detail-section-title">Tempos salvos por fase</div><div class="detail-content"><div class="stage-time-grid">\${PHASES.map(phase=>\`<div class="stage-time-card \${r.status===phase?'current':''}"><small>\${escapeHtml(phase)}\${r.status===phase?' • fase atual':''}</small><strong>\${formatDuration(getPhaseElapsed(r,phase))}</strong></div>\`).join('')}</div></div></div>\`}
function avg(arr){return arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:0}
function cnpjMask(value){const d=String(value||'').replace(/\\D/g,'').slice(0,14);return d.replace(/^(\\d{2})(\\d)/,'$1.$2').replace(/^(\\d{2})\\.(\\d{3})(\\d)/,'$1.$2.$3').replace(/\\.(\\d{3})(\\d)/,'.$1/$2').replace(/(\\d{4})(\\d)/,'$1-$2')}
function normalizeLoginUser(payload){
  if(!payload||typeof payload!=='object')return null;
  let source=payload.user||payload.usuario||payload.currentUser||payload.loggedUser||payload.authUser||payload.payload||payload.detail||payload;
  if(source&&source.user&&typeof source.user==='object')source=source.user;
  const name=String(source?.name||source?.nome||source?.fullName||source?.displayName||source?.userName||source?.username||'').trim();
  const email=String(source?.email||source?.mail||source?.userEmail||source?.loginEmail||'').trim().toLowerCase();
  const id=String(source?.id||source?.userId||source?.uid||source?.codigo||'').trim();
  if(!name||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))return null;
  return {name,email,id};
}
function readJsonStorage(storage,key){try{const raw=storage?.getItem(key);if(!raw)return null;return normalizeLoginUser(JSON.parse(raw))||normalizeLoginUser({name:storage.getItem('userName')||storage.getItem('nomeUsuario'),email:storage.getItem('userEmail')||storage.getItem('emailUsuario')})}catch(e){return null}}
function resolveLoginUser(){
  const params=new URLSearchParams(location.search);const fromQuery=normalizeLoginUser({name:params.get('userName')||params.get('name')||params.get('nome'),email:params.get('userEmail')||params.get('email'),id:params.get('userId')||params.get('uid')});if(fromQuery)return fromQuery;
  const globals=[window.SUPPLY_FLOW_USER,window.currentUser,window.loggedUser,window.authUser];for(const item of globals){const user=normalizeLoginUser(item);if(user)return user}
  const keys=['supplyFlowUser','supply_flow_user','supplyFlowAuthUser','loggedUser','currentUser','authUser','usuarioLogado','usuario','user'];
  const stores=[];try{stores.push(localStorage,sessionStorage)}catch(e){}
  try{if(window.parent&&window.parent!==window){stores.push(window.parent.localStorage,window.parent.sessionStorage);const parentGlobals=[window.parent.SUPPLY_FLOW_USER,window.parent.currentUser,window.parent.loggedUser,window.parent.authUser];for(const item of parentGlobals){const user=normalizeLoginUser(item);if(user)return user}}}catch(e){}
  for(const storage of stores){for(const key of keys){const user=readJsonStorage(storage,key);if(user)return user}}
  try{const cached=normalizeLoginUser(JSON.parse(localStorage.getItem(LOGIN_CACHE_KEY)||'null'));if(cached)return cached}catch(e){}
  return null;
}
function applyLoginUser(user,{persist=true,statusText='Dados preenchidos automaticamente pelo login do aplicativo principal.'}={}){
  const normalized=normalizeLoginUser(user);if(!normalized)return false;activeLoginUser=normalized;
  const name=$('#requesterName'),email=$('#requesterEmail'),status=$('#loginUserStatus');if(name)name.value=normalized.name;if(email)email.value=normalized.email;if(status){status.textContent=statusText;status.classList.remove('waiting')}
  if(persist){try{localStorage.setItem(LOGIN_CACHE_KEY,JSON.stringify(normalized))}catch(e){}}
  return true;
}
function setWaitingForLogin(){activeLoginUser=null;const name=$('#requesterName'),email=$('#requesterEmail'),status=$('#loginUserStatus');if(name)name.value='';if(email)email.value='';if(status){status.textContent='Aguardando a identificação do usuário conectado no aplicativo principal.';status.classList.add('waiting')}}
function requestLoginContext(){try{if(window.parent&&window.parent!==window)window.parent.postMessage({type:'SUPPLY_FLOW_REQUEST_USER_CONTEXT',module:'cadastro-itens'},'*')}catch(e){}}
function loadRequesterFromLogin(){const user=resolveLoginUser();if(user)applyLoginUser(user);else{setWaitingForLogin();requestLoginContext()}}
window.addEventListener('message',event=>{if(window.parent!==window&&event.source!==window.parent&&event.source!==window.top)return;const data=event.data||{};const acceptedTypes=['SUPPLY_FLOW_USER_CONTEXT','SUPPLY_FLOW_USER','AUTH_USER','CURRENT_USER','USER_CONTEXT'];if(data.type&&!acceptedTypes.includes(data.type)&&!data.user&&!data.usuario)return;const user=normalizeLoginUser(data);if(user)applyLoginUser(user)});
function showToast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3200)}
function codeForNext(){const d=new Date();const yy=String(d.getFullYear()).slice(-2);const mm=String(d.getMonth()+1).padStart(2,'0');const prefix=\`CI-\${mm}\${yy}-\`;const nums=requests.filter(r=>String(r.code).startsWith(prefix)).map(r=>Number(String(r.code).split('-').pop())||0);return prefix+String(Math.max(0,...nums)+1).padStart(3,'0')}
function productId(){return 'P'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function requestId(){return 'CI'+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function migrateRequests(){let changed=false;requests.forEach(r=>{if(!r.customFields||typeof r.customFields!=='object'){r.customFields={};changed=true}r.phaseDurations=r.phaseDurations||{'Não Iniciado':0,'Em Tratativa':0,'Cadastrado no Sistema':0};PHASES.forEach(p=>{if(r.phaseDurations[p]===undefined){r.phaseDurations[p]=0;changed=true}});if(!r.priority){const base=String(r.createdAt||nowIso()).slice(0,10);const days=r.deadline?businessDaysDiff(base,r.deadline):2;r.priority=days<=1?'Urgente':'Normal';changed=true}if(!r.deadline){r.deadline=deadlineFor(r.priority,String(r.createdAt||nowIso()).slice(0,10));changed=true}if(r.status!=='Cadastrado no Sistema'&&!r.phaseStartedAt){r.phaseStartedAt=r.updatedAt||r.createdAt||nowIso();changed=true}if(r.status==='Cadastrado no Sistema'&&r.phaseStartedAt){r.phaseStartedAt=null;changed=true}});if(changed)saveRequests()}

function showView(name){
  $$('.view').forEach(v=>v.classList.toggle('active',v.id===\`view-\${name}\`));
  $$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
  if(name==='kanban')renderKanban();if(name==='dashboard')renderDashboard();if(name==='editor')renderFormEditor();if(name==='base')renderBase();
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('.tab').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
$('#baseNew').addEventListener('click',()=>{resetForm();showView('form')});

function addProductRow(data={}){
  const tr=document.createElement('tr');tr.dataset.productId=data.id||productId();
  tr.innerHTML=\`<td class="num"></td><td><input class="p-desc" placeholder="Descrição do produto" value="\${escapeHtml(data.description||'')}"></td><td><input class="p-qty" type="number" min="0.0001" step="0.0001" placeholder="0" value="\${data.quantity??''}"></td><td><input class="p-ncm" inputmode="numeric" maxlength="8" placeholder="8 dígitos" value="\${escapeHtml(data.ncm||'')}"></td><td class="total">R$ 0,00</td><td><button type="button" class="btn btn-danger btn-small remove-product" title="Excluir">x</button></td>\`;
  $('#productsBody').appendChild(tr);
  tr.querySelectorAll('input').forEach(i=>i.addEventListener('input',updateProductsSummary));
  tr.querySelector('.p-ncm').addEventListener('input',e=>e.target.value=e.target.value.replace(/\\D/g,'').slice(0,8));
  tr.querySelector('.remove-product').addEventListener('click',()=>{if($('#productsBody').children.length===1){showToast('A solicitação precisa ter ao menos um produto.');return}tr.remove();updateProductsSummary()});
  updateProductsSummary();
}
function updateProductsSummary(){
  let total=0;$$('#productsBody tr').forEach((tr,i)=>{tr.querySelector('.num').textContent=i+1;const row=(Number(tr.querySelector('.p-qty').value)||0)*(Number(tr.querySelector('.p-value').value)||0);tr.querySelector('.total').textContent=formatMoney(row);total+=row});
  $('#productsCount').textContent=$$('#productsBody tr').length;$('#productsGrandTotal').textContent=formatMoney(total);
}
$('#addProduct').addEventListener('click',()=>addProductRow());
function collectProducts(){return $$('#productsBody tr').map(tr=>({id:tr.dataset.productId,description:tr.querySelector('.p-desc').value.trim(),quantity:Number(tr.querySelector('.p-qty').value),unitValue:Number(tr.querySelector('.p-value').value),ncm:tr.querySelector('.p-ncm').value.trim()}))}
function validateProducts(products){for(let i=0;i<products.length;i++){const p=products[i];if(!p.description||!(p.quantity>0)||p.unitValue<0||!/^\\d{8}$/.test(p.ncm)){showToast(\`Revise o produto \${i+1}: preencha descrição, quantidade, valor e NCM com 8 dígitos.\`);return false}}return true}

function updateFreightRule(){
  const type=$('#freightResponsible').value;const name=$('#carrierName'),cnpj=$('#carrierCnpj');
  if(type==='Veículo SEEL'){name.value='SEEL Serviços Especiais de Engenharia Ltda.';cnpj.value='72.030.927/0005-09';name.readOnly=true;cnpj.readOnly=true;$('#freightRule').textContent='Veículo SEEL selecionado: nome e CNPJ da transportadora foram preenchidos automaticamente e estão bloqueados para edição.'}
  else if(type==='Transportadora'){if(name.readOnly)name.value='';if(cnpj.readOnly)cnpj.value='';name.readOnly=false;cnpj.readOnly=false;$('#freightRule').textContent='Transportadora selecionada: informe obrigatoriamente o nome e o CNPJ da empresa responsavel pelo frete.'}
  else{name.value='';cnpj.value='';name.readOnly=false;cnpj.readOnly=false;$('#freightRule').textContent='Selecione o responsavel pelo frete. Para Veículo SEEL, os dados da transportadora seráo preenchidos e bloqueados automaticamente.'}
}
$('#freightResponsible').addEventListener('change',updateFreightRule);
$('#carrierCnpj').addEventListener('input',e=>{if(!e.target.readOnly)e.target.value=cnpjMask(e.target.value)});
function updateDeadlineFromPriority(){const priority=$('#priority').value||DEFAULT_PRIORITY;$('#deadline').value=deadlineFor(priority,todayISO());$('#deadlineHelp').textContent=priority==='Urgente'?'Urgente: atendimento em até 1 dia útil.':'Normal: atendimento em até 2 dias úteis.'}
$('#priority').addEventListener('change',updateDeadlineFromPriority);
function resetForm(){
  $('#requestForm').reset();$('#editId').value='';$('#requestCode').value=codeForNext();$('#requestDate').value=formatDate(nowIso());$('#priority').value=DEFAULT_PRIORITY;updateDeadlineFromPriority();loadRequesterFromLogin();$('#productsBody').innerHTML='';addProductRow();renderCustomFields({});updateFreightRule();
  $('#formTitle').textContent='Nova solicitação de Cadastro de Itens';$('#formSubtitle').textContent='Preencha os dados do solicitante, origem, destino, frete e produtos. A solicitação entrará em "Não Iniciado".';$('#formModePill').textContent='NOVO CADASTRO';$('#cancelEdit').classList.add('hidden');$('#saveRequest').textContent='Salvar e enviar para o Kanban';
}
$('#clearForm').addEventListener('click',()=>{if(confirm('Limpar todos os campos do formulário?'))resetForm()});
$('#cancelEdit').addEventListener('click',resetForm);

$('#requestForm').addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!$('#requesterName').value||!$('#requesterEmail').value){showToast('Não foi possível identificar o solicitante. Acesse este módulo pelo aplicativo principal com o login ativo.');requestLoginContext();return}
  if(!form.checkValidity()){form.reportValidity();showToast('Preencha todos os campos obrigatórios.');return}
  const productsSectionActive=isProductsSectionActiveV5();const products=productsSectionActive?collectProducts():[];if(productsSectionActive&&!validateProducts(products))return;
  if($('#freightResponsible').value==='Transportadora' && !/^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$/.test($('#carrierCnpj').value)){showToast('Informe um CNPJ válido no formato 00.000.000/0000-00.');$('#carrierCnpj').focus();return}
  const editId=$('#editId').value;const existing=requests.find(r=>r.id===editId);const data={
    id:existing?.id||requestId(),code:existing?.code||$('#requestCode').value,createdAt:existing?.createdAt||nowIso(),updatedAt:nowIso(),
    priority:$('#priority').value||DEFAULT_PRIORITY,deadline:$('#deadline').value||existing?.deadline||deadlineFor($('#priority').value||DEFAULT_PRIORITY),requesterName:$('#requesterName').value.trim(),requesterEmail:$('#requesterEmail').value.trim(),requesterUserId:existing?.requesterUserId||activeLoginUser?.id||'',issuerCnpj:$('#issuerCnpj').value,issuerDepartment:$('#issuerDepartment').value.trim(),recipientCnpj:$('#recipientCnpj').value,recipientDepartment:$('#recipientDepartment').value.trim(),recipientAddress:$('#recipientAddress').value.trim(),freightResponsible:$('#freightResponsible').value,carrierName:$('#carrierName').value.trim(),carrierCnpj:$('#carrierCnpj').value.trim(),products,customFields:{...(existing?.customFields||{}),...collectCustomFieldValues()},
    status:existing?.status||'Não Iniciado',phaseStartedAt:existing?.phaseStartedAt||nowIso(),phaseDurations:existing?.phaseDurations||{'Não Iniciado':0,'Em Tratativa':0,'Cadastrado no Sistema':0},history:existing?.history||[{at:nowIso(),text:'Solicitação de cadastro de item criada e enviada para Não Iniciado.'}],completedAt:existing?.completedAt||null,internalNote:existing?.internalNote||''
  };
  if(existing){data.history=[...data.history,{at:nowIso(),text:'Dados da solicitação atualizados.'}];requests=requests.map(r=>r.id===editId?data:r)}else requests.unshift(data);
  saveRequests();showToast(existing?'Solicitação atualizada com sucesso.':'Solicitação de cadastro criada e enviada para o Kanban.');resetForm();renderAll();showView('kanban');
});

function editRequest(id){
  const r=requests.find(x=>x.id===id);if(!r)return;
  $('#editId').value=r.id;$('#requestCode').value=r.code;$('#requestDate').value=formatDate(r.createdAt);$('#priority').value=r.priority||DEFAULT_PRIORITY;$('#deadline').value=r.deadline||deadlineFor(r.priority||DEFAULT_PRIORITY,String(r.createdAt).slice(0,10));$('#deadlineHelp').textContent=(r.priority||DEFAULT_PRIORITY)==='Urgente'?'Urgente: atendimento em até 1 dia útil.':'Normal: atendimento em até 2 dias úteis.';$('#requesterName').value=r.requesterName;$('#requesterEmail').value=r.requesterEmail;const loginStatus=$('#loginUserStatus');if(loginStatus){loginStatus.textContent='Solicitante registrado na criação desta solicitação.';loginStatus.classList.remove('waiting')}ensureSelectValue($('#issuerCnpj'),r.issuerCnpj);ensureSelectValue($('#issuerDepartment'),r.issuerDepartment);ensureSelectValue($('#recipientCnpj'),r.recipientCnpj);ensureSelectValue($('#recipientDepartment'),r.recipientDepartment);$('#recipientAddress').value=r.recipientAddress;$('#freightResponsible').value=r.freightResponsible;updateFreightRule();$('#carrierName').value=r.carrierName;$('#carrierCnpj').value=r.carrierCnpj;
  $('#productsBody').innerHTML='';(r.products||[]).forEach(addProductRow);if(!(r.products||[]).length)addProductRow();setCustomFieldValues(r.customFields||{});
  $('#formTitle').textContent=\`Editar solicitação \${r.code}\`;$('#formSubtitle').textContent='Altere os dados necessarios. A fase e os cronômetros atuais seráo preservados.';$('#formModePill').textContent='MODO EDICAO';$('#cancelEdit').classList.remove('hidden');$('#saveRequest').textContent='Salvar alterações';closeDetail();showView('form');
}
function deleteRequest(id){const r=requests.find(x=>x.id===id);if(!r)return;if(!confirm(\`Excluir definitivamente a solicitação \${r.code}?\`))return;requests=requests.filter(x=>x.id!==id);saveRequests();closeDetail();renderAll();showToast('Solicitação excluida.')}
function changePhase(id,newPhase){
  const r=requests.find(x=>x.id===id);if(!r||!PHASES.includes(newPhase)||r.status===newPhase)return;
  const old=r.status;const now=Date.now();r.phaseDurations=r.phaseDurations||{};
  if(old!=='Cadastrado no Sistema'&&r.phaseStartedAt){r.phaseDurations[old]=(Number(r.phaseDurations[old])||0)+Math.max(0,now-new Date(r.phaseStartedAt).getTime())}
  r.status=newPhase;r.updatedAt=new Date(now).toISOString();r.phaseStartedAt=newPhase==='Cadastrado no Sistema'?null:new Date(now).toISOString();r.completedAt=newPhase==='Cadastrado no Sistema'?new Date(now).toISOString():null;r.history=r.history||[];r.history.push({at:new Date(now).toISOString(),text:\`Fase alterada de \${old} para \${newPhase}.\`});saveRequests();renderAll();if(currentDetailId===id)openDetail(id);showToast(\`\${r.code} movida para \${newPhase}.\`)
}
function moveRelative(id,delta){const r=requests.find(x=>x.id===id);if(!r)return;const idx=PHASES.indexOf(r.status);const next=PHASES[idx+delta];if(next)changePhase(id,next)}

function filteredRequests(){
  const q=($('#filterSearch')?.value||$('#globalSearch')?.value||'').trim().toLowerCase();
  const issuer=$('#filterIssuer')?.value||'';
  const recipient=$('#filterRecipient')?.value||'';
  const freight=$('#filterFreight')?.value||'';
  const priority=$('#filterPriority')?.value||'';
  const semaphore=$('#filterSemaphore')?.value||'';
  return requests.filter(r=>{
    const hay=[r.code,r.requesterName,r.requesterEmail,r.issuerDepartment,r.recipientDepartment,r.recipientAddress,r.carrierName].join(' ').toLowerCase();
    const semaphoreMatch=!semaphore||(r.status!=='Cadastrado no Sistema'&&slaStatus(r).cls===semaphore);
    return(!q||hay.includes(q))&&(!issuer||r.issuerCnpj===issuer)&&(!recipient||r.recipientCnpj===recipient)&&(!freight||r.freightResponsible===freight)&&(!priority||(r.priority||DEFAULT_PRIORITY)===priority)&&semaphoreMatch;
  });
}
function dashboardFilteredRequests(){
  const q=($('#dashboardFilterSearch')?.value||'').trim().toLowerCase();
  const start=$('#dashboardFilterStart')?.value||'';
  const end=$('#dashboardFilterEnd')?.value||'';
  const phase=$('#dashboardFilterPhase')?.value||'';
  const priority=$('#dashboardFilterPriority')?.value||'';
  const semaphore=$('#dashboardFilterSemaphore')?.value||'';
  const freight=$('#dashboardFilterFreight')?.value||'';
  const issuer=$('#dashboardFilterIssuer')?.value||'';
  return requests.filter(r=>{
    const hay=[r.code,r.requesterName,r.requesterEmail,r.issuerDepartment,r.recipientDepartment,r.recipientAddress,r.carrierName].join(' ').toLowerCase();
    const created=String(r.createdAt||'').slice(0,10);
    const semaphoreMatch=!semaphore||(r.status!=='Cadastrado no Sistema'&&slaStatus(r).cls===semaphore);
    return(!q||hay.includes(q))&&(!start||created>=start)&&(!end||created<=end)&&(!phase||r.status===phase)&&(!priority||(r.priority||DEFAULT_PRIORITY)===priority)&&semaphoreMatch&&(!freight||r.freightResponsible===freight)&&(!issuer||r.issuerCnpj===issuer);
  });
}
function fillFilters(){
  const fill=(sel,values,emptyLabel='Todos')=>{if(!sel)return;const current=sel.value;sel.innerHTML=\`<option value="">\${emptyLabel}</option>\`+values.map(v=>\`<option value="\${escapeHtml(v)}">\${escapeHtml(CNPJ_LABELS[v]||v)}</option>\`).join('');sel.value=current};
  const issuers=[...new Set(requests.map(r=>r.issuerCnpj).filter(Boolean))];
  const recipients=[...new Set(requests.map(r=>r.recipientCnpj).filter(Boolean))];
  fill($('#filterIssuer'),issuers);
  fill($('#filterRecipient'),recipients);
  fill($('#dashboardFilterIssuer'),issuers);
}
function cardHtml(r){
  const meta=PHASE_META[r.status],total=requestTotal(r),st=slaStatus(r),terminal=r.status==='Cadastrado no Sistema';return \`<article class="nf-card status-\${meta.css} sla-\${st.cls}" draggable="true" data-id="\${r.id}">
    <div class="card-top"><div><div class="card-code">\${escapeHtml(r.code)}</div><div class="card-title">\${escapeHtml(r.requesterName)}</div></div><span class="status-chip \${meta.css}">\${escapeHtml(r.status)}</span></div>
    <div class="card-lines"><div class="card-line">\${icon('building')}<span><b>Emitente:</b> \${escapeHtml(r.issuerDepartment)} - \${escapeHtml(CNPJ_LABELS[r.issuerCnpj]||r.issuerCnpj)}</span></div><div class="card-line">\${icon('pin')}<span><b>Destino:</b> \${escapeHtml(r.recipientDepartment)} - \${escapeHtml(CNPJ_LABELS[r.recipientCnpj]||r.recipientCnpj)}</span></div><div class="card-line">\${icon('truck')}<span><b>Frete:</b> \${escapeHtml(r.freightResponsible)}</span></div></div>
    <div class="card-route"><strong>\${r.products.length} item(ns)</strong> | \${escapeHtml(r.products[0]?.description||'Sem produto')}\${r.products.length>1?\` +\${r.products.length-1}\`:''}</div>
    <div class="card-badges"><span class="mini-badge money">\${formatMoney(total)}</span><span class="mini-badge \${(r.priority||DEFAULT_PRIORITY).toLowerCase()}">\${escapeHtml(r.priority||DEFAULT_PRIORITY)}</span><span class="semaphore-badge \${st.cls}">\${semaphoreLabel(st)}</span>\${r.internalNote?'<span class="mini-badge">Com observação</span>':''}</div>
    <div class="deadline-row"><span>Prazo: <b>\${formatDate(r.deadline)}</b></span><strong>\${escapeHtml(st.label)}</strong></div>
    <div class="timer-panel">
      <div class="timer-row"><span>Na fase agora</span><strong data-live-timer="current" data-timer-id="\${r.id}">\${terminal?'Encerrado':formatDuration(getCurrentRunElapsed(r))}</strong></div>
      <div class="timer-row"><span>Acumulado da fase</span><strong data-live-timer="phase" data-timer-id="\${r.id}">\${formatDuration(getPhaseElapsed(r,r.status))}</strong></div>
      <div class="timer-row"><span>Tempo total</span><strong data-live-timer="total" data-timer-id="\${r.id}">\${formatDuration(getTotalElapsed(r))}</strong></div>
    </div>
    <div class="card-actions"><div class="phase-control-label">Fase da solicitação</div><div class="phase-select-wrap"><select class="phase-select" aria-label="Selecionar fase da solicitação">\${PHASES.map(phase=>\`<option value="\${escapeHtml(phase)}" \${r.status===phase?'selected':''}>\${escapeHtml(phase)}</option>\`).join('')}</select></div><button class="detail-btn" data-action="detail">Ver detalhes</button></div>
  </article>\`}
function renderKanban(){
  fillFilters();const list=filteredRequests();const board=$('#kanbanBoard');board.innerHTML='';PHASES.forEach(phase=>{const items=list.filter(r=>r.status===phase).sort((a,b)=>slaStatus(a).rank-slaStatus(b).rank||deadlineTime(a)-deadlineTime(b)||new Date(a.createdAt)-new Date(b.createdAt));const avgPhase=phase==='Cadastrado no Sistema'?avg(items.map(r=>getTotalElapsed(r))):avg(items.map(r=>getPhaseElapsed(r,phase)));const col=document.createElement('section');col.className='column';col.dataset.phase=phase;col.innerHTML=\`<div class="column-head"><div class="column-icon">\${icon(PHASE_META[phase].icon)}</div><div><div class="column-title">\${phase}</div><div class="column-sub">\${PHASE_META[phase].subtitle}</div></div><div class="column-count">\${items.length}</div></div><div class="column-metrics"><span>Tempo medio na fase</span><strong>\${formatDuration(avgPhase)}</strong></div><div class="column-cards">\${items.length?items.map(cardHtml).join(''):'<div class="empty">Nenhuma solicitação nestá fase.</div>'}</div>\`;board.appendChild(col)});
  $$('.nf-card').forEach(card=>{const id=card.dataset.id;const phaseSelect=card.querySelector('.phase-select');phaseSelect?.addEventListener('click',e=>e.stopPropagation());phaseSelect?.addEventListener('change',e=>{e.stopPropagation();changePhase(id,e.target.value)});card.addEventListener('click',e=>{const button=e.target.closest('button');const action=button?.dataset.action;if(action){e.stopPropagation();if(action==='detail')openDetail(id)}else if(!e.target.closest('select'))openDetail(id)});card.addEventListener('dragstart',e=>{if(e.target.closest('button,select')){e.preventDefault();return}card.classList.add('dragging');e.dataTransfer.setData('text/plain',id)});card.addEventListener('dragend',()=>card.classList.remove('dragging'))});
  $$('.column').forEach(col=>{col.addEventListener('dragover',e=>{e.preventDefault();col.classList.add('drag-over')});col.addEventListener('dragleave',()=>col.classList.remove('drag-over'));col.addEventListener('drop',e=>{e.preventDefault();col.classList.remove('drag-over');changePhase(e.dataTransfer.getData('text/plain'),col.dataset.phase)})});
}
['filterSearch','filterIssuer','filterRecipient','filterFreight','filterPriority','filterSemaphore'].forEach(id=>$('#'+id).addEventListener(id==='filterSearch'?'input':'change',renderKanban));
$('#clearFilters').addEventListener('click',()=>{['filterSearch','filterIssuer','filterRecipient','filterFreight','filterPriority','filterSemaphore'].forEach(id=>{$('#'+id).value=''});const gs=$('#globalSearch');if(gs)gs.value='';renderKanban()});
const dashboardFilterIds=['dashboardFilterSearch','dashboardFilterStart','dashboardFilterEnd','dashboardFilterPhase','dashboardFilterPriority','dashboardFilterSemaphore','dashboardFilterFreight','dashboardFilterIssuer'];
dashboardFilterIds.forEach(id=>$('#'+id).addEventListener(id==='dashboardFilterSearch'?'input':'change',renderDashboard));
$('#clearDashboardFilters').addEventListener('click',()=>{dashboardFilterIds.forEach(id=>{$('#'+id).value=''});renderDashboard()});
const globalSearch=$('#globalSearch');if(globalSearch)globalSearch.addEventListener('input',()=>{if($('#view-kanban').classList.contains('active')){$('#filterSearch').value=globalSearch.value;renderKanban()}else if($('#view-base').classList.contains('active'))renderBase()});

function renderDashboard(){
  fillFilters();
  const list=dashboardFilteredRequests();
  const total=list.length;
  const totalProducts=list.reduce((sum,r)=>sum+(Array.isArray(r.products)?r.products.length:0),0);
  const totalValue=list.reduce((sum,r)=>sum+requestTotal(r),0);
  const averageTicket=total?totalValue/total:0;
  const averageItems=total?totalProducts/total:0;
  const finalized=list.filter(r=>r.status==='Cadastrado no Sistema');
  const totalSlaAvg=avg(finalized.map(getTotalElapsed));

  const open=list.filter(r=>r.status!=='Cadastrado no Sistema');
  const openTotal=open.length;
  const late=open.filter(r=>slaStatus(r).cls==='late').length;
  const alert=open.filter(r=>slaStatus(r).cls==='warn').length;
  const onTime=open.filter(r=>slaStatus(r).cls==='ok').length;
  const urgent=list.filter(r=>(r.priority||DEFAULT_PRIORITY)==='Urgente').length;
  const normal=list.filter(r=>(r.priority||DEFAULT_PRIORITY)==='Normal').length;

  const kpis=[
    ['Total de solicitações',total,\`\${total} de \${requests.length} registro(s) na seleção\`],
    ['Total de produtos',totalProducts,'Itens incluídos nas solicitações filtradas'],
    ['Valor total solicitado',formatMoney(totalValue),'Somatório da seleção atual'],
    ['Ticket médio',formatMoney(averageTicket),'Valor médio por solicitação'],
    ['Média de itens',averageItems.toFixed(1).replace('.',','),'Produtos por solicitação'],
    ['SLA total médio',formatDuration(totalSlaAvg),\`\${finalized.length} processo(s) cadastrado(s) no sistema na seleção\`]
  ];
  $('#kpiGrid').innerHTML=kpis.map(k=>\`<article class="kpi"><small>\${k[0]}</small><strong>\${k[1]}</strong><span>\${k[2]}</span></article>\`).join('');
  const summary=$('#dashboardFilterSummary');if(summary)summary.textContent=total===requests.length?'Exibindo toda a base':\`Exibindo \${total} de \${requests.length} solicitação(ões)\`;

  renderBarChart('#stageChart',PHASES.map((p,i)=>({
    label:p,
    count:list.filter(r=>r.status===p).length,
    cls:['orange','', 'green'][i]
  })),total);

  renderBarChart('#semaphoreChart',[
    {label:'🔴 Em atraso',count:late,cls:'orange'},
    {label:'🟡 Em alerta',count:alert,cls:'yellow'},
    {label:'🟢 No prazo',count:onTime,cls:'green'}
  ],openTotal);

  renderBarChart('#priorityChart',[
    {label:'Urgente - 1 dia útil',count:urgent,cls:'orange'},
    {label:'Normal - 2 dias úteis',count:normal,cls:''}
  ],total);

  renderBarChart('#freightChart',['Veículo SEEL','Transportadora'].map((p,i)=>({
    label:p,
    count:list.filter(r=>r.freightResponsible===p).length,
    cls:i?'orange':'green'
  })),total);

  const issuers=Object.keys(CNPJ_LABELS).map(c=>{
    const issuerRequests=list.filter(r=>r.issuerCnpj===c);
    return {
      label:CNPJ_LABELS[c],
      count:issuerRequests.length,
      extra:formatMoney(issuerRequests.reduce((s,r)=>s+requestTotal(r),0)),
      cls:''
    };
  });
  renderBarChart('#issuerChart',issuers,total);
  renderSlaPhaseChart(list);
}

function formatPct(value){
  return \`\${Number(value||0).toFixed(1).replace('.',',')}%\`;
}

function renderBarChart(selector,data,baseTotal){
  const max=Math.max(1,...data.map(x=>x.count));
  $(selector).innerHTML=data.map(x=>{
    const denominator=Number.isFinite(Number(x.base))?Number(x.base):Number(baseTotal)||0;
    const pct=denominator?x.count/denominator*100:0;
    return \`<div class="bar-row">
      <div class="bar-label" title="\${escapeHtml(x.label)}">\${escapeHtml(x.label)}</div>
      <div class="bar-track"><div class="bar-fill \${x.cls||''}" style="width:\${x.count/max*100}%"></div></div>
      <div class="bar-value"><b>\${x.count}</b> <span>| \${formatPct(pct)}</span>\${x.extra?\`<small>\${escapeHtml(x.extra)}</small>\`:''}</div>
    </div>\`;
  }).join('')||'<div class="empty">Sem dados.</div>';
}

function renderSlaPhaseChart(list){
  const data=PHASES.map((phase,index)=>{
    let values=[];
    let label=phase;
    if(phase==='Cadastrado no Sistema'){
      values=list.filter(r=>r.status==='Cadastrado no Sistema').map(getTotalElapsed);
      label='Cadastrado no Sistema (ciclo total)';
    }else{
      values=list
        .filter(r=>r.status===phase||getPhaseElapsed(r,phase)>0)
        .map(r=>getPhaseElapsed(r,phase));
    }
    return {
      label,
      value:avg(values),
      count:values.length,
      cls:['orange','', 'green'][index]
    };
  });
  const max=Math.max(1,...data.map(x=>x.value));
  $('#slaPhaseChart').innerHTML=data.map(x=>\`<div class="bar-row">
    <div class="bar-label" title="\${escapeHtml(x.label)}">\${escapeHtml(x.label)}</div>
    <div class="bar-track"><div class="bar-fill \${x.cls||''}" style="width:\${x.value/max*100}%"></div></div>
    <div class="bar-value"><b>\${formatDuration(x.value)}</b><small>\${x.count} solicitação(ões)</small></div>
  </div>\`).join('')||'<div class="empty">Sem dados.</div>';
}

function renderBase(){
  const q=($('#globalSearch')?.value||'').trim().toLowerCase();const list=requests.filter(r=>!q||[r.code,r.requesterName,r.issuerDepartment,r.recipientDepartment,r.carrierName].join(' ').toLowerCase().includes(q));
  $('#baseTableBody').innerHTML=list.length?list.map(r=>{const st=slaStatus(r);return \`<tr><td><strong>\${escapeHtml(r.code)}</strong></td><td>\${formatDate(r.createdAt)}</td><td>\${escapeHtml(r.requesterName)}<br><span style="font-size:9px">\${escapeHtml(r.requesterEmail)}</span></td><td>\${escapeHtml(r.issuerDepartment)}<br><span style="font-size:9px">\${escapeHtml(r.issuerCnpj)}</span></td><td>\${escapeHtml(r.recipientDepartment)}<br><span style="font-size:9px">\${escapeHtml(r.recipientCnpj)}</span></td><td>\${escapeHtml(r.freightResponsible)}</td><td>\${r.products.length}</td><td><strong>\${formatMoney(requestTotal(r))}</strong></td><td><span class="mini-badge \${(r.priority||DEFAULT_PRIORITY).toLowerCase()}">\${escapeHtml(r.priority||DEFAULT_PRIORITY)}</span></td><td><span class="status-chip \${PHASE_META[r.status].css}">\${r.status}</span></td><td>\${formatDate(r.deadline)}</td><td><span class="semaphore-badge \${st.cls}">\${semaphoreLabel(st)}</span><br><span style="font-size:9px">\${escapeHtml(st.label)}</span></td><td>\${formatDuration(getTotalElapsed(r))}</td><td><div class="table-actions"><button class="detail-btn" data-base-action="detail" data-id="\${r.id}">Detalhes</button><button class="move-back" data-base-action="edit" data-id="\${r.id}">Editar</button><button class="btn-danger" data-base-action="delete" data-id="\${r.id}">Excluir</button></div></td></tr>\`}).join(''):'<tr><td colspan="14"><div class="empty">Nenhuma solicitação cadastrada.</div></td></tr>';
  $$('[data-base-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.baseAction,id=b.dataset.id;if(a==='detail')openDetail(id);if(a==='edit')editRequest(id);if(a==='delete')deleteRequest(id)}));
}

function openDetail(id){
  const r=requests.find(x=>x.id===id);if(!r)return;currentDetailId=id;$('#detailTitle').textContent=\`\${r.code} - \${r.requesterName}\`;$('#detailSubtitle').textContent=\`\${r.status} | Criada em \${formatDate(r.createdAt,true)} | Atualizada em \${formatDate(r.updatedAt,true)}\`;
  const history=[...(r.history||[])].reverse(),st=slaStatus(r),terminal=r.status==='Cadastrado no Sistema';$('#detailBody').innerHTML=\`
    <div class="detail-grid"><div class="detail-kv"><small>Status</small><strong>\${escapeHtml(r.status)}</strong></div><div class="detail-kv"><small>Prioridade</small><strong><span class="mini-badge \${(r.priority||DEFAULT_PRIORITY).toLowerCase()}">\${escapeHtml(r.priority||DEFAULT_PRIORITY)}</span><br>\${slaDaysFor(r.priority||DEFAULT_PRIORITY)} dias úteis</strong></div><div class="detail-kv"><small>Semáforo</small><strong><span class="semaphore-badge \${st.cls}">\${semaphoreLabel(st)}</span><br>\${escapeHtml(st.label)}</strong></div><div class="detail-kv"><small>Data limite</small><strong>\${formatDate(r.deadline)}</strong></div><div class="detail-kv"><small>Valor total</small><strong>\${formatMoney(requestTotal(r))}</strong></div><div class="detail-kv"><small>Na fase agora</small><strong>\${terminal?'Encerrado':formatDuration(getCurrentRunElapsed(r))}</strong></div><div class="detail-kv"><small>Acumulado da fase</small><strong>\${formatDuration(getPhaseElapsed(r,r.status))}</strong></div><div class="detail-kv"><small>Tempo total</small><strong>\${formatDuration(getTotalElapsed(r))}</strong></div><div class="detail-kv"><small>Itens</small><strong>\${r.products.length}</strong></div></div>
    <div class="modal-actions"><button class="btn btn-primary" id="detailEdit">Editar solicitação</button><button class="btn btn-secondary" id="detailDeadline">Alterar data limite</button><button class="btn btn-secondary" id="detailEmail">Enviar e-mail</button><button class="btn btn-danger" id="detailDelete">Excluir</button></div>
    <div class="detail-section"><div class="detail-section-title">Solicitante e unidades</div><div class="detail-content"><div class="detail-grid" style="margin:0"><div class="detail-kv"><small>Solicitante</small><strong>\${escapeHtml(r.requesterName)}</strong></div><div class="detail-kv"><small>E-mail</small><strong>\${escapeHtml(r.requesterEmail)}</strong></div><div class="detail-kv"><small>Emitente</small><strong>\${escapeHtml(r.issuerCnpj)}<br>\${escapeHtml(r.issuerDepartment)}</strong></div><div class="detail-kv"><small>Destinatário</small><strong>\${escapeHtml(r.recipientCnpj)}<br>\${escapeHtml(r.recipientDepartment)}</strong></div></div><div class="detail-kv" style="margin-top:9px"><small>Endereço completo</small><strong>\${escapeHtml(r.recipientAddress)}</strong></div></div></div>
    <div class="detail-section"><div class="detail-section-title">Frete</div><div class="detail-content"><div class="detail-grid" style="margin:0"><div class="detail-kv"><small>Responsavel</small><strong>\${escapeHtml(r.freightResponsible)}</strong></div><div class="detail-kv"><small>Transportadora</small><strong>\${escapeHtml(r.carrierName)}</strong></div><div class="detail-kv"><small>CNPJ</small><strong>\${escapeHtml(r.carrierCnpj)}</strong></div><div class="detail-kv"><small>SLA operacional</small><strong>\${escapeHtml(st.txt)}</strong></div></div></div></div>
    \${renderStageTimes(r)}
    \${customFieldDetailsHtml(r.customFields||{})}
    <div class="detail-section"><div class="detail-section-title">Produtos</div><div class="detail-content table-scroll"><table class="detail-products"><thead><tr><th>#</th><th>Descrição</th><th>Quantidade</th><th>Valor unitário</th><th>NCM</th><th>Total</th></tr></thead><tbody>\${r.products.map((p,i)=>\`<tr><td>\${i+1}</td><td>\${escapeHtml(p.description)}</td><td>\${p.quantity}</td><td>\${formatMoney(p.unitValue)}</td><td>\${escapeHtml(p.ncm)}</td><td>\${formatMoney(sumProduct(p))}</td></tr>\`).join('')}</tbody></table></div></div>
    <div class="detail-section"><div class="detail-section-title">Controle da tratativa</div><div class="detail-content"><div class="internal-note"><div><label for="detailNote">Observação interna do responsavel</label><textarea id="detailNote" placeholder="Registre pendências, retorno ao solicitante ou informações do cadastro do item.">\${escapeHtml(r.internalNote||'')}</textarea></div><button class="btn btn-primary" id="saveDetailNote">Salvar observação</button></div></div></div>
    <div class="detail-section"><div class="detail-section-title">Histórico do processo</div><div class="detail-content"><div class="history-list">\${history.map(h=>\`<div class="history-item"><time>\${formatDate(h.at,true)}</time><div>\${escapeHtml(h.text)}</div></div>\`).join('')}</div></div></div>\`;
  $('#detailModal').classList.add('show');
  $('#detailEdit').addEventListener('click',()=>editRequest(id));$('#detailDelete').addEventListener('click',()=>deleteRequest(id));$('#detailDeadline').addEventListener('click',()=>{const d=prompt('Nova data limite (AAAA-MM-DD):',r.deadline||'');if(!d)return;if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(d)){showToast('Data inválida.');return}r.deadline=d;r.updatedAt=nowIso();r.history=r.history||[];r.history.push({at:nowIso(),text:'Data limite alterada para '+formatDate(d)+'.'});saveRequests();renderAll();openDetail(id);showToast('Data limite atualizada.')} );$('#detailEmail').addEventListener('click',()=>{location.href=\`mailto:\${encodeURIComponent(r.requesterEmail)}?subject=\${encodeURIComponent('Cadastro de Itens - '+r.code)}&body=\${encodeURIComponent('Olá '+r.requesterName+',\\n\\nSegue atualização da solicitação de cadastro de itens '+r.code+'.\\nStatus: '+r.status+'\\n\\nAtenciosamente,')}\`});
  $('#saveDetailNote').addEventListener('click',()=>{r.internalNote=$('#detailNote').value.trim();r.updatedAt=nowIso();r.history.push({at:nowIso(),text:'Observação interna atualizada.'});saveRequests();renderAll();showToast('Observação salva.');openDetail(id)});
}
function closeDetail(){$('#detailModal').classList.remove('show');currentDetailId=null}
$('#closeDetail').addEventListener('click',closeDetail);$('#detailModal').addEventListener('click',e=>{if(e.target===$('#detailModal'))closeDetail()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail()});

function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"'}
function exportCsv(){
  const header=['Código','Data','Solicitante','E-mail','CNPJ Emitente','Obra/Departamento Emitente','CNPJ Destinatário','Obra/Departamento Destinatário','Endereço Destinatário','Responsavel Frete','Transportadora','CNPJ Transportadora','Produtos','Campos adicionais','Valor Total','Prioridade','SLA em dias úteis','Status','Data limite','Semáforo','Tempo Total','Tempos por fase'];
  const rows=requests.map(r=>[r.code,formatDate(r.createdAt),r.requesterName,r.requesterEmail,r.issuerCnpj,r.issuerDepartment,r.recipientCnpj,r.recipientDepartment,r.recipientAddress,r.freightResponsible,r.carrierName,r.carrierCnpj,r.products.map(p=>\`\${p.description} | Qtd \${p.quantity} | NCM \${p.ncm}\`).join(' ; '),editorFieldList().filter(field=>field.custom&&String(r.customFields?.[field.id]??'').trim()!=='').map(field=>\`\${field.label}: \${r.customFields[field.id]}\`).join(' | '),requestTotal(r).toFixed(2).replace('.',','),r.priority||DEFAULT_PRIORITY,slaDaysFor(r.priority||DEFAULT_PRIORITY),r.status,formatDate(r.deadline),semaphoreLabel(slaStatus(r))+' - '+slaStatus(r).label,formatDuration(getTotalElapsed(r)),PHASES.map(p=>p+': '+formatDuration(getPhaseElapsed(r,p))).join(' | ')]);
  downloadFile('\\ufeff'+[header,...rows].map(row=>row.map(csvCell).join(';')).join('\\n'),'solicitacoes_cadastro_de_itens.csv','text/csv;charset=utf-8')
}
function downloadFile(content,name,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('#exportCsv').addEventListener('click',exportCsv);$('#quickExport')?.addEventListener('click',exportCsv);

function renderAll(){renderKanban();renderDashboard();renderBase()}
function refreshLiveTimers(){
  $$('[data-live-timer]').forEach(el=>{const r=requests.find(x=>x.id===el.dataset.timerId);if(!r)return;const type=el.dataset.liveTimer;if(type==='current')el.textContent=r.status==='Cadastrado no Sistema'?'Encerrado':formatDuration(getCurrentRunElapsed(r));if(type==='phase')el.textContent=formatDuration(getPhaseElapsed(r,r.status));if(type==='total')el.textContent=formatDuration(getTotalElapsed(r))});
}
setInterval(refreshLiveTimers,1000);
setInterval(()=>{if($('#view-dashboard').classList.contains('active'))renderDashboard()},30000);


window.addEventListener('storage',event=>{if(!event.key||/(frete|fornecedor|contrato|cadastro|frota)/i.test(event.key)){const issuer=formEditorConfig?.fields?.issuerDepartment;const recipient=formEditorConfig?.fields?.recipientDepartment;if(issuer?.manualOptions!==true||recipient?.manualOptions!==true){const options=collectIntegratedWorkCenterOptions();if(issuer?.manualOptions!==true)issuer.options=options;if(recipient?.manualOptions!==true)recipient.options=options;saveFormEditorConfig();applyFormEditorConfig();if($('#view-editor')?.classList.contains('active'))renderFormEditor()}}});


/* Editor de formulário V3: seções, exclusão, ocultação e arrastar/soltar */
function normalizeSectionKeyV3(value){
  return String(value||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
function sectionIdV3(title){
  const key=normalizeSectionKeyV3(title).replace(/\\s+/g,'-').slice(0,54)||'secao';
  return 'sec_'+key;
}
function allEditorFieldsV3(){
  return Object.values(formEditorConfig?.fields||{});
}
function ensureSectionsV3(config){
  if(!config||typeof config!=='object')return config;
  const stored=Array.isArray(config.sections)?config.sections:[];
  const map=new Map();
  stored.forEach((section,index)=>{
    const title=String(section?.title||'').trim();if(!title)return;
    const key=normalizeSectionKeyV3(title);
    map.set(key,{id:String(section.id||sectionIdV3(title)),title,visible:section.visible!==false,deleted:!!section.deleted,order:Number.isFinite(Number(section.order))?Number(section.order):(index+1)*10,system:!!section.system});
  });
  const activeFields=Object.values(config.fields||{});
  const defaultSectionNames=[];
  defaultFormFieldDefinitions().forEach(field=>{const title=String(field.section||'').trim();if(title&&!defaultSectionNames.some(item=>normalizeSectionKeyV3(item)===normalizeSectionKeyV3(title)))defaultSectionNames.push(title)});
  const titles=[...defaultSectionNames,...activeFields.map(field=>String(field.section||'').trim()).filter(Boolean)];
  titles.forEach((title,index)=>{
    const key=normalizeSectionKeyV3(title);if(!key)return;
    const existing=map.get(key);
    if(existing){if(defaultSectionNames.some(item=>normalizeSectionKeyV3(item)===key))existing.system=true;return}
    map.set(key,{id:sectionIdV3(title),title,visible:true,deleted:false,order:(map.size+1)*10,system:defaultSectionNames.some(item=>normalizeSectionKeyV3(item)===key)});
  });
  config.sections=[...map.values()].sort((a,b)=>Number(a.order||0)-Number(b.order||0)||a.title.localeCompare(b.title,'pt-BR'));
  config.version=3;
  return config;
}
function sectionListV3(includeDeleted=false){
  ensureSectionsV3(formEditorConfig);
  return (formEditorConfig?.sections||[]).filter(section=>includeDeleted||!section.deleted).sort((a,b)=>Number(a.order||0)-Number(b.order||0)||a.title.localeCompare(b.title,'pt-BR'));
}
function sectionByTitleV3(title,includeDeleted=true){
  const key=normalizeSectionKeyV3(title);
  return sectionListV3(includeDeleted).find(section=>normalizeSectionKeyV3(section.title)===key)||null;
}
function ensureSectionEntryV3(title,{system=false}={}){
  const clean=String(title||'').trim();if(!clean)return null;
  ensureSectionsV3(formEditorConfig);
  let section=sectionByTitleV3(clean,true);
  if(!section){section={id:sectionIdV3(clean),title:clean,visible:true,deleted:false,order:(formEditorConfig.sections.length+1)*10,system:!!system};formEditorConfig.sections.push(section)}
  section.deleted=false;if(system)section.system=true;
  return section;
}

normalizeFieldDefinition = function(field,index=0){
  const clean={...field};
  clean.id=String(clean.id||\`custom_\${Date.now()}_\${index}\`);
  clean.label=String(clean.label||'Nova pergunta');
  clean.section=String(clean.section||'6. Informações adicionais');
  clean.type=['text','textarea','email','number','date','select'].includes(clean.type)?clean.type:'text';
  clean.required=!!clean.required;clean.visible=clean.visible!==false;clean.readonly=!!clean.readonly;clean.deleted=!!clean.deleted;
  clean.help=String(clean.help||'');clean.placeholder=String(clean.placeholder||'');
  clean.width=['1','2','full'].includes(String(clean.width))?String(clean.width):'1';
  clean.order=Number.isFinite(Number(clean.order))?Number(clean.order):(index+1)*10;
  clean.system=!!clean.system;clean.custom=!clean.system;clean.options=normalizedEditorOptions(clean.options);
  return clean;
};

loadFormEditorConfig = function(){
  const defaults=defaultFormFieldDefinitions();let stored=null;try{stored=JSON.parse(localStorage.getItem(FORM_EDITOR_STORAGE_KEY)||'null')}catch(e){}
  const storedFields=stored?.fields&&typeof stored.fields==='object'?stored.fields:{};const fields={};
  defaults.forEach((def,index)=>{
    const saved=storedFields[def.id]||{};
    const merged=normalizeFieldDefinition({...def,...saved,system:true},index);
    merged.required=saved.required===undefined?def.required:!!saved.required;
    merged.visible=saved.visible===undefined?def.visible:saved.visible!==false;
    merged.deleted=!!saved.deleted;
    merged.section=String(saved.section||def.section||'');
    merged.options=normalizedEditorOptions(def.integratedList&&saved.manualOptions!==true?def.options:(saved.options||def.options));
    fields[def.id]=merged;
  });
  Object.values(storedFields).filter(field=>field&&field.id&&!fields[field.id]).forEach((field,index)=>{
    const normalized=normalizeFieldDefinition({...field,system:false,custom:true},defaults.length+index);fields[normalized.id]=normalized;
  });
  return ensureSectionsV3({version:3,fields,sections:Array.isArray(stored?.sections)?stored.sections:[]});
};

saveFormEditorConfig = function(){
  try{ensureSectionsV3(formEditorConfig);localStorage.setItem(FORM_EDITOR_STORAGE_KEY,JSON.stringify(formEditorConfig))}catch(e){showToast('Não foi possível salvar a configuração do formulário.')}
};

editorFieldList = function(options={}){
  const includeDeleted=options===true||options?.includeDeleted===true;
  const sections=new Map(sectionListV3(true).map(section=>[normalizeSectionKeyV3(section.title),Number(section.order||0)]));
  return allEditorFieldsV3().filter(field=>includeDeleted||!field.deleted).sort((a,b)=>{
    const sa=sections.get(normalizeSectionKeyV3(a.section))??99999;const sb=sections.get(normalizeSectionKeyV3(b.section))??99999;
    return sa-sb||Number(a.order||0)-Number(b.order||0)||String(a.label).localeCompare(String(b.label),'pt-BR');
  });
};
selectedEditorField = function(){
  const selected=formEditorConfig?.fields?.[selectedEditorFieldId];
  if(selected&&!selected.deleted)return selected;
  return editorFieldList()[0]||null;
};
sectionSuggestions = function(){return sectionListV3().map(section=>section.title)};

function formSectionElementsV3(){
  return [...document.querySelectorAll('#requestForm > .section, #customFieldsHost > .section')];
}
function sectionTitleFromElementV3(sectionEl){return sectionEl?.querySelector(':scope > .section-title')?.textContent?.trim()||''}
function findFormSectionV3(title){
  const key=normalizeSectionKeyV3(title);
  return formSectionElementsV3().find(section=>normalizeSectionKeyV3(sectionTitleFromElementV3(section))===key)||null;
}
function markStaticSectionsV3(){
  [...document.querySelectorAll('#requestForm > .section')].forEach(section=>{
    const title=sectionTitleFromElementV3(section);if(title)section.dataset.editorSectionKey=normalizeSectionKeyV3(title);
  });
}
function ensureCustomSectionDomV3(sectionConfig){
  let section=findFormSectionV3(sectionConfig.title);if(section)return section;
  const host=$('#customFieldsHost');if(!host)return null;
  section=document.createElement('div');section.className='section custom-form-section';section.dataset.customSection=sectionConfig.title;section.dataset.editorSectionKey=normalizeSectionKeyV3(sectionConfig.title);
  section.innerHTML=\`<div class="section-title">\${escapeHtml(sectionConfig.title)}</div><div class="section-body"><div class="form-grid"></div></div>\`;
  host.appendChild(section);return section;
}
function sectionStateV3(title){
  return sectionByTitleV3(title,true)||{title,visible:true,deleted:false};
}

customFieldHtml = function(field,value=''){
  const id=customFieldControlId(field.id);const req=field.required?'required':'';const ro=field.readonly?'readonly':'';const cls=fieldWidthClass(field.width);let control='';
  if(field.type==='textarea')control=\`<textarea id="\${escapeHtml(id)}" data-custom-field="\${escapeHtml(field.id)}" \${req} \${ro} placeholder="\${escapeHtml(field.placeholder||'')}">\${escapeHtml(value||'')}</textarea>\`;
  else if(field.type==='select')control=\`<select id="\${escapeHtml(id)}" data-custom-field="\${escapeHtml(field.id)}" \${req}><option value="">\${escapeHtml(field.placeholder||'Selecione')}</option>\${normalizedEditorOptions(field.options).map(option=>\`<option value="\${escapeHtml(option.value)}" \${String(value)===String(option.value)?'selected':''}>\${escapeHtml(option.label)}</option>\`).join('')}</select>\`;
  else control=\`<input id="\${escapeHtml(id)}" data-custom-field="\${escapeHtml(field.id)}" type="\${escapeHtml(field.type)}" value="\${escapeHtml(value||'')}" \${req} \${ro} placeholder="\${escapeHtml(field.placeholder||'')}">\`;
  return \`<div class="field \${cls} custom-field-wrapper" data-editor-field-id="\${escapeHtml(field.id)}" data-editor-field-order="\${Number(field.order||0)}"><label for="\${escapeHtml(id)}">\${escapeHtml(field.label)}\${field.required?' <span class="req">*</span>':''}</label>\${control}\${field.help?\`<div class="help">\${escapeHtml(field.help)}</div>\`:''}</div>\`;
};

renderCustomFields = function(values=null){
  const host=$('#customFieldsHost');if(!host)return;
  const preserved=values||collectCurrentCustomValues();
  $$('.custom-field-wrapper').forEach(wrapper=>wrapper.remove());
  host.querySelectorAll('.custom-form-section').forEach(section=>section.remove());
  markStaticSectionsV3();
  sectionListV3().forEach(section=>{if(!section.deleted&&!findFormSectionV3(section.title))ensureCustomSectionDomV3(section)});
  editorFieldList().filter(field=>field.custom&&field.visible!==false).forEach(field=>{
    const section=sectionStateV3(field.section);if(section.deleted||section.visible===false)return;
    const sectionEl=findFormSectionV3(field.section)||ensureCustomSectionDomV3(section);const grid=sectionEl?.querySelector('.form-grid');if(!grid)return;
    grid.insertAdjacentHTML('beforeend',customFieldHtml(field,preserved[field.id]??''));
  });
};

function reorderGridFieldsV3(grid){
  if(!grid)return;
  const children=[...grid.children];
  const configurable=children.filter(child=>child.matches?.('.field[data-editor-field-id]')).sort((a,b)=>Number(a.dataset.editorFieldOrder||0)-Number(b.dataset.editorFieldOrder||0));
  if(!configurable.length)return;
  let cursor=0;const reordered=children.map(child=>child.matches?.('.field[data-editor-field-id]')?configurable[cursor++]:child);
  reordered.forEach(child=>grid.appendChild(child));
}
function applySectionVisibilityV3(){
  formSectionElementsV3().forEach(sectionEl=>{
    const title=sectionTitleFromElementV3(sectionEl);const config=sectionByTitleV3(title,true);
    const hidden=!!config&&(config.deleted||config.visible===false);
    sectionEl.classList.toggle('form-section-editor-hidden',hidden);
  });
}

applyFormEditorConfig = function(){
  if(!formEditorConfig)formEditorConfig=loadFormEditorConfig();ensureSectionsV3(formEditorConfig);
  const preserved=collectCurrentCustomValues();renderCustomFields(preserved);
  const allFields=editorFieldList({includeDeleted:true});
  allFields.filter(field=>field.system).forEach(field=>{
    const control=document.getElementById(field.id);if(!control)return;const wrapper=control.closest('.field');if(!wrapper)return;
    const section=sectionStateV3(field.section);const inactive=field.deleted||field.visible===false||section.deleted||section.visible===false;
    wrapper.dataset.editorFieldId=field.id;wrapper.dataset.editorFieldOrder=String(Number(field.order||0));
    wrapper.classList.toggle('form-field-hidden',inactive);wrapper.classList.remove('span2','full');const widthClass=fieldWidthClass(field.width);if(widthClass)wrapper.classList.add(widthClass);
    control.disabled=inactive;control.required=!!field.required&&!inactive;if('readOnly' in control)control.readOnly=!!field.readonly;control.placeholder=field.placeholder||control.placeholder||'';
    const label=wrapper.querySelector(\`label[for="\${field.id}"]\`);if(label)label.innerHTML=\`\${escapeHtml(field.label)}\${field.required?' <span class="req">*</span>':''}\`;
    let help=wrapper.querySelector(\`[data-form-help="\${field.id}"]\`)||wrapper.querySelector('.help');if(help&&!help.dataset.formHelp)help.dataset.formHelp=field.id;if(!help&&field.help){help=document.createElement('div');help.className='help';help.dataset.formHelp=field.id;control.insertAdjacentElement('afterend',help)}if(help){help.textContent=field.help||'';help.classList.toggle('hidden',!field.help)}
    if(field.type==='select'&&control.tagName==='SELECT')populateConfiguredSelect(control,field);
    if(!field.deleted){const targetSection=findFormSectionV3(field.section)||ensureCustomSectionDomV3(section);const targetGrid=targetSection?.querySelector('.form-grid');if(targetGrid&&wrapper.parentElement!==targetGrid)targetGrid.appendChild(wrapper)}
  });
  formSectionElementsV3().forEach(section=>reorderGridFieldsV3(section.querySelector('.form-grid')));
  applySectionVisibilityV3();
  ['issuerCnpj','recipientCnpj'].forEach(id=>{const field=formEditorConfig.fields[id];if(!field||field.deleted)return;normalizedEditorOptions(field.options).forEach(option=>{CNPJ_LABELS[option.value]=option.label.replace(option.value,'').replace(/^\\s*-\\s*/,'')||option.label})});
};

function normalizeOrdersInSectionV3(sectionTitle){
  allEditorFieldsV3().filter(field=>!field.deleted&&normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(sectionTitle)).sort((a,b)=>Number(a.order||0)-Number(b.order||0)).forEach((field,index)=>field.order=(index+1)*10);
}
normalizeEditorOrders = function(){sectionListV3().forEach(section=>normalizeOrdersInSectionV3(section.title))};

function toggleFieldVisibilityV3(fieldId){
  const field=formEditorConfig?.fields?.[fieldId];if(!field||field.deleted)return;field.visible=field.visible===false;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(field.visible?'Pergunta exibida no formulário.':'Pergunta ocultada do formulário.');
}
function toggleSectionVisibilityV3(title){
  const section=sectionByTitleV3(title,true);if(!section||section.deleted)return;section.visible=section.visible===false;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(section.visible?'Seção exibida no formulário.':'Seção ocultada do formulário.');
}
function deleteEditorSectionV3(title){
  const section=sectionByTitleV3(title,true);if(!section||section.deleted)return;
  const count=allEditorFieldsV3().filter(field=>!field.deleted&&normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(title)).length;
  if(!confirm(\`Excluir a seção “\${section.title}” e suas \${count} pergunta(s)? A restauração do formulário padrão poderá recuperá-la.\`))return;
  section.deleted=true;section.visible=false;allEditorFieldsV3().filter(field=>normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(title)).forEach(field=>{field.deleted=true;field.visible=false});
  selectedEditorFieldId=editorFieldList()[0]?.id||'';saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Seção excluída do formulário.');
}
function createEditorSectionV3(){
  const title=prompt('Nome da nova seção:','6. Informações adicionais');if(!title||!title.trim())return;
  const existing=sectionByTitleV3(title,true);if(existing&&!existing.deleted){showToast('Já existe uma seção com esse nome.');return}
  const section=ensureSectionEntryV3(title.trim());section.visible=true;section.deleted=false;section.system=false;createCustomEditorField(section.title,true);showToast('Nova seção criada com uma pergunta inicial.');
}
function createCustomEditorField(sectionTitle='6. Informações adicionais',silent=false){
  ensureSectionEntryV3(sectionTitle);normalizeOrdersInSectionV3(sectionTitle);const items=allEditorFieldsV3().filter(field=>!field.deleted&&normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(sectionTitle));
  const id=\`custom_\${Date.now().toString(36)}_\${Math.random().toString(36).slice(2,6)}\`;
  formEditorConfig.fields[id]=normalizeFieldDefinition({id,label:'Nova pergunta',section:sectionTitle,type:'text',required:false,visible:true,readonly:false,help:'',placeholder:'',width:'1',order:(items.length+1)*10,system:false,custom:true},items.length);
  selectedEditorFieldId=id;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();if(!silent)showToast('Nova pergunta criada. Edite e salve.');
}
duplicateCurrentEditorField = function(){
  const field=selectedEditorField();if(!field)return;ensureSectionEntryV3(field.section);normalizeOrdersInSectionV3(field.section);const items=allEditorFieldsV3().filter(item=>!item.deleted&&normalizeSectionKeyV3(item.section)===normalizeSectionKeyV3(field.section));
  const id=\`custom_\${Date.now().toString(36)}_\${Math.random().toString(36).slice(2,6)}\`;const copy=normalizeFieldDefinition({...field,id,label:\`\${field.label} - cópia\`,system:false,custom:true,deleted:false,integratedList:false,manualOptions:true,systemValues:[],order:Number(field.order||0)+5},items.length);
  formEditorConfig.fields[id]=copy;normalizeOrdersInSectionV3(field.section);selectedEditorFieldId=id;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Pergunta duplicada.');
};
deleteCurrentEditorField = function(){
  const field=selectedEditorField();if(!field)return;if(!confirm(\`Excluir a pergunta “\${field.label}”? A restauração do formulário padrão poderá recuperar perguntas originais.\`))return;
  field.deleted=true;field.visible=false;normalizeOrdersInSectionV3(field.section);selectedEditorFieldId=editorFieldList()[0]?.id||'';saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Pergunta excluída do formulário.');
};
moveCurrentEditorField = function(direction){
  const field=selectedEditorField();if(!field)return;const items=editorFieldList().filter(item=>normalizeSectionKeyV3(item.section)===normalizeSectionKeyV3(field.section));const index=items.findIndex(item=>item.id===field.id);const target=index+direction;if(index<0||target<0||target>=items.length){showToast(direction<0?'A pergunta já é a primeira da seção.':'A pergunta já é a última da seção.');return}
  const other=items[target];const temp=field.order;field.order=other.order;other.order=temp;normalizeOrdersInSectionV3(field.section);saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(direction<0?'Pergunta movida para cima.':'Pergunta movida para baixo.');
};

function moveFieldByDragV3(sourceId,targetId,targetSection,after=false){
  const source=formEditorConfig?.fields?.[sourceId];if(!source||source.deleted)return;
  const oldSection=source.section;const cleanSection=String(targetSection||source.section).trim()||source.section;ensureSectionEntryV3(cleanSection);
  const targetItems=editorFieldList().filter(field=>field.id!==sourceId&&normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(cleanSection));
  let insertIndex=targetItems.length;if(targetId){const idx=targetItems.findIndex(field=>field.id===targetId);if(idx>=0)insertIndex=idx+(after?1:0)}
  source.section=cleanSection;targetItems.splice(insertIndex,0,source);targetItems.forEach((field,index)=>field.order=(index+1)*10);normalizeOrdersInSectionV3(oldSection);
  selectedEditorFieldId=sourceId;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Posição da pergunta atualizada.');
}
function bindEditorDragV3(){
  $$('.editor-question-item[data-editor-field]').forEach(row=>{
    row.draggable=true;
    row.addEventListener('dragstart',event=>{if(event.target.closest('button')){event.preventDefault();return}event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',row.dataset.editorField);row.classList.add('dragging')});
    row.addEventListener('dragend',()=>{$$('.editor-question-item,.editor-section-dropzone').forEach(el=>el.classList.remove('drag-over','dragging'))});
    row.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='move';row.classList.add('drag-over')});
    row.addEventListener('dragleave',()=>row.classList.remove('drag-over'));
    row.addEventListener('drop',event=>{event.preventDefault();event.stopPropagation();row.classList.remove('drag-over');const sourceId=event.dataTransfer.getData('text/plain');if(!sourceId||sourceId===row.dataset.editorField)return;const rect=row.getBoundingClientRect();moveFieldByDragV3(sourceId,row.dataset.editorField,row.closest('[data-editor-section-block]')?.dataset.editorSectionBlock,event.clientY>rect.top+rect.height/2)});
  });
  $$('.editor-section-dropzone').forEach(zone=>{
    zone.addEventListener('dragover',event=>{event.preventDefault();zone.classList.add('drag-over')});zone.addEventListener('dragleave',event=>{if(!zone.contains(event.relatedTarget))zone.classList.remove('drag-over')});
    zone.addEventListener('drop',event=>{event.preventDefault();zone.classList.remove('drag-over');const sourceId=event.dataTransfer.getData('text/plain');if(sourceId)moveFieldByDragV3(sourceId,null,zone.closest('[data-editor-section-block]')?.dataset.editorSectionBlock,false)});
  });
}

renderEditorQuestionList = function(fields){
  const list=$('#editorQuestionList');if(!list)return;const fieldSet=new Set(fields.map(field=>field.id));const query=($('#editorQuestionSearch')?.value||'').trim();
  const sections=sectionListV3().filter(section=>{const sectionFields=editorFieldList().filter(field=>normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(section.title));return !query||sectionFields.some(field=>fieldSet.has(field.id))||normalizeSectionKeyV3(section.title).includes(normalizeSectionKeyV3(query))});
  list.innerHTML=sections.length?sections.map(section=>{
    const allInSection=editorFieldList().filter(field=>normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(section.title));const shown=allInSection.filter(field=>fieldSet.has(field.id));
    return \`<div class="editor-list-section editor-section-block \${section.visible===false?'section-hidden':''}" data-editor-section-block="\${escapeHtml(section.title)}"><div class="editor-list-section-title editor-section-header"><div class="editor-section-name"><b>\${escapeHtml(section.title)}</b><span>\${allInSection.length}</span>\${section.visible===false?'<i>Oculta</i>':''}</div><div class="editor-section-actions"><button type="button" data-section-visibility="\${escapeHtml(section.title)}">\${section.visible===false?'Exibir':'Ocultar'}</button><button type="button" class="danger" data-section-delete="\${escapeHtml(section.title)}">Excluir seção</button></div></div><div class="editor-section-dropzone">\${shown.map(field=>\`<div class="editor-question-item \${field.id===selectedEditorFieldId?'active':''}" data-editor-field="\${escapeHtml(field.id)}"><span class="editor-drag-handle" title="Arraste para reposicionar">⋮⋮</span><span class="editor-question-item-main"><b title="\${escapeHtml(field.label)}">\${escapeHtml(field.label)}</b><span class="editor-question-item-meta"><i class="editor-mini-badge \${field.type==='select'?'select':''}">\${field.type==='select'?'Lista':field.type}</i>\${field.custom?'<i class="editor-mini-badge select">Personalizada</i>':''}\${field.required?'<i class="editor-mini-badge required">Obrigatória</i>':''}\${field.visible===false?'<i class="editor-mini-badge hidden-field">Oculta</i>':''}</span></span><span class="editor-question-quick"><button type="button" data-field-visibility="\${escapeHtml(field.id)}">\${field.visible===false?'Exibir':'Ocultar'}</button><span class="editor-order-badge">\${Math.max(1,Math.round(Number(field.order||0)/10))}</span></span></div>\`).join('')||'<div class="editor-section-empty">Sem perguntas neste filtro. Arraste uma pergunta para esta seção.</div>'}</div></div>\`;
  }).join(''):'<div class="empty">Nenhuma seção ou pergunta encontrada.</div>';
  $$('[data-editor-field]').forEach(row=>row.addEventListener('click',event=>{if(event.target.closest('button'))return;selectedEditorFieldId=row.dataset.editorField;renderFormEditor()}));
  $$('[data-field-visibility]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();toggleFieldVisibilityV3(button.dataset.fieldVisibility)}));
  $$('[data-section-visibility]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();toggleSectionVisibilityV3(button.dataset.sectionVisibility)}));
  $$('[data-section-delete]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();deleteEditorSectionV3(button.dataset.sectionDelete)}));
  bindEditorDragV3();
};

renderFormEditor = function(){
  if(!formEditorConfig)formEditorConfig=loadFormEditorConfig();ensureSectionsV3(formEditorConfig);
  const query=($('#editorQuestionSearch')?.value||'').trim().toLowerCase();const mode=$('#editorQuestionFilter')?.value||'all';const fields=editorFieldList();if(!formEditorConfig.fields[selectedEditorFieldId]||formEditorConfig.fields[selectedEditorFieldId].deleted)selectedEditorFieldId=fields[0]?.id||'';
  const filtered=fields.filter(field=>{const text=[field.label,field.section,field.id].join(' ').toLowerCase();const modeOk=mode==='all'||(mode==='visible'&&field.visible!==false)||(mode==='required'&&field.required)||(mode==='custom'&&field.custom)||(mode==='hidden'&&field.visible===false);return modeOk&&(!query||text.includes(query))});
  $('#editorQuestionCount').textContent=\`\${fields.length} pergunta(s) · \${sectionListV3().length} seção(ões) · arraste para reorganizar\`;renderEditorQuestionList(filtered);
  const field=selectedEditorField();
  const main=$('.editor-main-v2');if(main)main.classList.toggle('editor-no-selection',!field);if(!field)return;
  selectedEditorFieldId=field.id;$('#editorSectionTag').textContent=field.section;$('#editorQuestionTitle').textContent=field.label;$('#editorFieldType').textContent=field.type==='select'?'Lista suspensa':field.type;$('#editorFieldProtection').textContent=field.custom?'Pergunta personalizada':'Campo padrão';$('#editorFieldProtection').classList.toggle('custom',field.custom);
  $('#editorQuestionLabel').value=field.label;$('#editorQuestionHelp').value=field.help||'';$('#editorQuestionPlaceholder').value=field.placeholder||'';$('#editorQuestionSection').value=field.section||'';$('#editorQuestionType').value=field.type;$('#editorQuestionWidth').value=field.width||'1';$('#editorQuestionRequired').checked=!!field.required;$('#editorQuestionVisible').checked=field.visible!==false;$('#editorQuestionReadonly').checked=!!field.readonly;
  $('#editorQuestionSection').disabled=false;$('#editorQuestionType').disabled=!field.custom;$('#editorDeleteQuestion').disabled=false;
  const sectionItems=fields.filter(item=>normalizeSectionKeyV3(item.section)===normalizeSectionKeyV3(field.section));const pos=sectionItems.findIndex(item=>item.id===field.id);$('#editorMoveUp').disabled=pos<=0;$('#editorMoveDown').disabled=pos<0||pos>=sectionItems.length-1;
  $('#editorSectionSuggestions').innerHTML=sectionSuggestions().map(section=>\`<option value="\${escapeHtml(section)}"></option>\`).join('');
  const options=normalizedEditorOptions(field.options);$('#editorOptionsBox').classList.toggle('hidden',field.type!=='select');renderEditorOptionRows(options);$('#syncCurrentWorkList').classList.toggle('hidden',!field.integratedList);$('#editorListNote').textContent=field.integratedList?(field.manualOptions===true?'Lista personalizada. Use “Usar lista automática de obras” para restaurar a integração.':'Lista automática integrada aos módulos da plataforma.'):(field.systemValues?.length?'Valores obrigatórios para as regras: '+field.systemValues.join(', ')+'.':'Você pode cadastrar, ordenar e agrupar as opções.');renderEditorPreview();
};

saveCurrentEditorField = function(){
  const field=selectedEditorField();if(!field)return;const label=$('#editorQuestionLabel').value.trim();if(!label){showToast('Informe o texto da pergunta.');return}
  const oldSection=field.section;const newSection=$('#editorQuestionSection').value.trim()||oldSection||'6. Informações adicionais';ensureSectionEntryV3(newSection);
  field.label=label;field.help=$('#editorQuestionHelp').value.trim();field.placeholder=$('#editorQuestionPlaceholder').value.trim();field.width=$('#editorQuestionWidth').value||'1';field.required=$('#editorQuestionRequired').checked;field.visible=$('#editorQuestionVisible').checked;field.readonly=$('#editorQuestionReadonly').checked;field.section=newSection;if(field.custom)field.type=$('#editorQuestionType').value||'text';
  if(field.type==='select'){const options=collectEditorOptionRows();if(!options.length){showToast('A lista suspensa precisa ter ao menos uma opção.');return}if(field.systemValues?.length){const values=new Set(options.map(option=>option.value));const missing=field.systemValues.filter(value=>!values.has(value));if(missing.length){showToast('Mantenha os valores obrigatórios: '+missing.join(', ')+'.');return}}field.options=options;if(field.integratedList)field.manualOptions=true}
  normalizeOrdersInSectionV3(oldSection);normalizeOrdersInSectionV3(newSection);saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();updateFreightRule();showToast('Alterações salvas no formulário.');
};

resetAllEditorFields = function(){
  if(!confirm('Restaurar o formulário padrão? Perguntas e seções personalizadas serão removidas.'))return;try{localStorage.removeItem(FORM_EDITOR_STORAGE_KEY)}catch(e){}formEditorConfig=loadFormEditorConfig();selectedEditorFieldId='priority';applyFormEditorConfig();renderFormEditor();resetForm();showToast('Formulário padrão restaurado.');
};
exportFormEditorConfig = function(){const payload={module:'Cadastro de Itens',exportedAt:nowIso(),version:3,config:formEditorConfig};downloadFile(JSON.stringify(payload,null,2),'configuracao_formulario_cadastro_itens.json','application/json;charset=utf-8');showToast('Configuração exportada.');};
importFormEditorConfig = function(file){
  if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const imported=parsed?.config||parsed;if(!imported?.fields||typeof imported.fields!=='object')throw new Error('Formato inválido');const defaults=defaultFormFieldDefinitions();const merged={version:3,fields:{},sections:Array.isArray(imported.sections)?imported.sections:[]};defaults.forEach((def,index)=>{const saved=imported.fields[def.id]||{};merged.fields[def.id]=normalizeFieldDefinition({...def,...saved,system:true},index)});Object.values(imported.fields).filter(field=>field?.id&&!merged.fields[field.id]).forEach((field,index)=>{const normalized=normalizeFieldDefinition({...field,system:false,custom:true},defaults.length+index);merged.fields[normalized.id]=normalized});formEditorConfig=ensureSectionsV3(merged);normalizeEditorOrders();saveFormEditorConfig();applyFormEditorConfig();selectedEditorFieldId=editorFieldList()[0]?.id||'';renderFormEditor();showToast('Configuração importada com sucesso.')}catch(error){showToast('Arquivo de configuração inválido.')}};reader.readAsText(file);
};

initializeFormEditor = function(){
  formEditorConfig=loadFormEditorConfig();applyFormEditorConfig();
  $('#editorQuestionSearch')?.addEventListener('input',renderFormEditor);$('#editorQuestionFilter')?.addEventListener('change',renderFormEditor);$('#saveCurrentQuestion')?.addEventListener('click',saveCurrentEditorField);$('#resetCurrentQuestion')?.addEventListener('click',resetCurrentEditorField);$('#resetAllFormEditor')?.addEventListener('click',resetAllEditorFields);$('#refreshIntegratedWorks')?.addEventListener('click',syncIntegratedWorkLists);$('#syncCurrentWorkList')?.addEventListener('click',syncIntegratedWorkLists);$('#editorNewQuestion')?.addEventListener('click',()=>createCustomEditorField());$('#editorNewSection')?.addEventListener('click',createEditorSectionV3);$('#editorDuplicateQuestion')?.addEventListener('click',duplicateCurrentEditorField);$('#editorDeleteQuestion')?.addEventListener('click',deleteCurrentEditorField);$('#editorMoveUp')?.addEventListener('click',()=>moveCurrentEditorField(-1));$('#editorMoveDown')?.addEventListener('click',()=>moveCurrentEditorField(1));$('#exportFormEditor')?.addEventListener('click',exportFormEditorConfig);$('#importFormEditor')?.addEventListener('click',()=>$('#importFormEditorFile')?.click());$('#importFormEditorFile')?.addEventListener('change',event=>{importFormEditorConfig(event.target.files?.[0]);event.target.value=''});
  $('#addEditorOption')?.addEventListener('click',()=>{const value=$('#editorOptionQuickValue').value.trim();const label=$('#editorOptionQuickLabel').value.trim();addEditorOptionRow(value,label);$('#editorOptionQuickValue').value='';$('#editorOptionQuickLabel').value=''});$('#sortEditorOptions')?.addEventListener('click',()=>renderEditorOptionRows(collectEditorOptionRows().sort((a,b)=>a.label.localeCompare(b.label,'pt-BR'))));$('#dedupeEditorOptions')?.addEventListener('click',()=>{const seen=new Set();renderEditorOptionRows(collectEditorOptionRows().filter(option=>{const key=option.value.toLowerCase();if(seen.has(key))return false;seen.add(key);return true}))});$('#clearEditorOptions')?.addEventListener('click',()=>{if(confirm('Limpar todas as opções desta lista?'))renderEditorOptionRows([])});
  ['editorQuestionLabel','editorQuestionHelp','editorQuestionPlaceholder','editorQuestionSection','editorQuestionType','editorQuestionWidth','editorQuestionRequired','editorQuestionVisible','editorQuestionReadonly'].forEach(id=>$('#'+id)?.addEventListener(['editorQuestionRequired','editorQuestionVisible','editorQuestionReadonly'].includes(id)?'change':'input',()=>{if(id==='editorQuestionType')$('#editorOptionsBox').classList.toggle('hidden',$('#editorQuestionType').value!=='select');renderEditorPreview()}));$('#editorQuestionType')?.addEventListener('change',()=>{$('#editorOptionsBox').classList.toggle('hidden',$('#editorQuestionType').value!=='select');renderEditorPreview()});
  renderFormEditor();
};

  const cleanupDragVisualsV4=()=>{
    document.querySelectorAll('.editor-question-item').forEach(el=>el.classList.remove('dragging','drop-before','drop-after','drag-over'));
    document.querySelectorAll('.editor-section-dropzone').forEach(el=>el.classList.remove('drag-over-section'));
    document.querySelectorAll('.editor-section-block').forEach(el=>el.classList.remove('drag-target'));
  };

  const moveFieldByDragV4=function(sourceId,targetId,targetSection,placement='before'){
    const source=formEditorConfig?.fields?.[sourceId];
    if(!source||source.deleted)return;
    const oldSection=source.section;
    const cleanSection=String(targetSection||source.section||'6. Informações adicionais').trim();
    ensureSectionEntryV3(cleanSection);
    const targetItems=editorFieldList().filter(field=>field.id!==sourceId&&normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(cleanSection));
    let insertIndex=targetItems.length;
    if(targetId){
      const index=targetItems.findIndex(field=>field.id===targetId);
      if(index>=0)insertIndex=index+(placement==='after'?1:0);
    }
    source.section=cleanSection;
    targetItems.splice(Math.max(0,Math.min(insertIndex,targetItems.length)),0,source);
    targetItems.forEach((field,index)=>field.order=(index+1)*10);
    if(normalizeSectionKeyV3(oldSection)!==normalizeSectionKeyV3(cleanSection))normalizeOrdersInSectionV3(oldSection);
    selectedEditorFieldId=sourceId;
    saveFormEditorConfig();
    applyFormEditorConfig();
    renderFormEditor();
    showToast(normalizeSectionKeyV3(oldSection)===normalizeSectionKeyV3(cleanSection)?'Posição da pergunta atualizada.':\`Pergunta movida para “\${cleanSection}”.\`);
  };

  const quickMoveFieldToSectionV4=function(fieldId,sectionTitle){
    const field=formEditorConfig?.fields?.[fieldId];
    if(!field||field.deleted||!sectionTitle||normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(sectionTitle))return;
    moveFieldByDragV4(fieldId,null,sectionTitle,'after');
  };

  bindEditorDragV3=function(){
    const list=document.getElementById('editorQuestionList');
    if(list&&!list.dataset.autoScrollV4){
      list.dataset.autoScrollV4='1';
      list.addEventListener('dragover',event=>{
        const rect=list.getBoundingClientRect();
        const margin=58;
        if(event.clientY<rect.top+margin)list.scrollTop-=18;
        else if(event.clientY>rect.bottom-margin)list.scrollTop+=18;
      });
    }

    document.querySelectorAll('.editor-question-item[data-editor-field]').forEach(row=>{
      row.draggable=true;
      row.addEventListener('dragstart',event=>{
        if(event.target.closest('button,select,input,textarea')){event.preventDefault();return;}
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.setData('text/plain',row.dataset.editorField);
        event.dataTransfer.setData('application/x-editor-field',row.dataset.editorField);
        row.classList.add('dragging');
        setTimeout(()=>row.classList.add('dragging'),0);
      });
      row.addEventListener('dragend',cleanupDragVisualsV4);
      row.addEventListener('dragover',event=>{
        event.preventDefault();event.stopPropagation();
        event.dataTransfer.dropEffect='move';
        document.querySelectorAll('.editor-question-item').forEach(el=>{if(el!==row)el.classList.remove('drop-before','drop-after')});
        const rect=row.getBoundingClientRect();
        const placement=event.clientY>rect.top+rect.height/2?'after':'before';
        row.dataset.dropPlacement=placement;
        row.classList.toggle('drop-before',placement==='before');
        row.classList.toggle('drop-after',placement==='after');
        row.closest('.editor-section-block')?.classList.add('drag-target');
      });
      row.addEventListener('dragleave',event=>{
        if(!row.contains(event.relatedTarget))row.classList.remove('drop-before','drop-after');
      });
      row.addEventListener('drop',event=>{
        event.preventDefault();event.stopPropagation();
        const sourceId=event.dataTransfer.getData('application/x-editor-field')||event.dataTransfer.getData('text/plain');
        const targetId=row.dataset.editorField;
        const section=row.closest('[data-editor-section-block]')?.dataset.editorSectionBlock||'';
        const placement=row.dataset.dropPlacement||'before';
        cleanupDragVisualsV4();
        if(sourceId&&sourceId!==targetId)moveFieldByDragV4(sourceId,targetId,section,placement);
      });
    });

    document.querySelectorAll('.editor-section-dropzone').forEach(zone=>{
      const block=zone.closest('[data-editor-section-block]');
      zone.addEventListener('dragenter',event=>{event.preventDefault();zone.classList.add('drag-over-section');block?.classList.add('drag-target')});
      zone.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='move';zone.classList.add('drag-over-section');block?.classList.add('drag-target')});
      zone.addEventListener('dragleave',event=>{if(!zone.contains(event.relatedTarget)){zone.classList.remove('drag-over-section');block?.classList.remove('drag-target')}});
      zone.addEventListener('drop',event=>{
        event.preventDefault();
        if(event.target.closest('.editor-question-item'))return;
        const sourceId=event.dataTransfer.getData('application/x-editor-field')||event.dataTransfer.getData('text/plain');
        const section=block?.dataset.editorSectionBlock||'';
        cleanupDragVisualsV4();
        if(sourceId&&section)moveFieldByDragV4(sourceId,null,section,'after');
      });
    });

    document.querySelectorAll('.editor-section-header').forEach(header=>{
      const block=header.closest('[data-editor-section-block]');
      header.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='move';block?.classList.add('drag-target')});
      header.addEventListener('dragleave',event=>{if(!header.contains(event.relatedTarget))block?.classList.remove('drag-target')});
      header.addEventListener('drop',event=>{
        event.preventDefault();
        const sourceId=event.dataTransfer.getData('application/x-editor-field')||event.dataTransfer.getData('text/plain');
        const section=block?.dataset.editorSectionBlock||'';
        cleanupDragVisualsV4();
        if(sourceId&&section)moveFieldByDragV4(sourceId,null,section,'after');
      });
    });
  };

  renderEditorQuestionList=function(fields){
    const list=document.getElementById('editorQuestionList');if(!list)return;
    const fieldSet=new Set(fields.map(field=>field.id));
    const query=(document.getElementById('editorQuestionSearch')?.value||'').trim();
    const sections=sectionListV3().filter(section=>{
      const sectionFields=editorFieldList().filter(field=>normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(section.title));
      return !query||sectionFields.some(field=>fieldSet.has(field.id))||normalizeSectionKeyV3(section.title).includes(normalizeSectionKeyV3(query));
    });
    const sectionOptions=sectionListV3().map(section=>section.title);
    list.innerHTML=sections.length?sections.map(section=>{
      const allInSection=editorFieldList().filter(field=>normalizeSectionKeyV3(field.section)===normalizeSectionKeyV3(section.title));
      const shown=allInSection.filter(field=>fieldSet.has(field.id));
      return \`<div class="editor-list-section editor-section-block \${section.visible===false?'section-hidden':''}" data-editor-section-block="\${escapeHtml(section.title)}">
        <div class="editor-list-section-title editor-section-header">
          <div class="editor-section-name"><b>\${escapeHtml(section.title)}</b><span>\${allInSection.length}</span>\${section.visible===false?'<i>Oculta</i>':''}</div>
          <div class="editor-section-actions"><button type="button" data-section-visibility="\${escapeHtml(section.title)}">\${section.visible===false?'Exibir':'Ocultar'}</button><button type="button" class="danger" data-section-delete="\${escapeHtml(section.title)}">Excluir seção</button></div>
        </div>
        <div class="editor-section-dropzone">\${shown.map(field=>\`<div class="editor-question-item \${field.id===selectedEditorFieldId?'active':''}" data-editor-field="\${escapeHtml(field.id)}">
          <span class="editor-drag-handle" title="Arraste para mudar a posição ou a seção">⋮⋮</span>
          <span class="editor-question-item-main"><b title="\${escapeHtml(field.label)}">\${escapeHtml(field.label)}</b><span class="editor-question-item-meta"><i class="editor-mini-badge \${field.type==='select'?'select':''}">\${field.type==='select'?'Lista':field.type}</i>\${field.custom?'<i class="editor-mini-badge select">Personalizada</i>':''}\${field.required?'<i class="editor-mini-badge required">Obrigatória</i>':''}\${field.visible===false?'<i class="editor-mini-badge hidden-field">Oculta</i>':''}</span></span>
          <span class="editor-question-quick"><select class="editor-section-quick-select" data-quick-section-field="\${escapeHtml(field.id)}" title="Trocar pergunta de seção">\${sectionOptions.map(title=>\`<option value="\${escapeHtml(title)}" \${normalizeSectionKeyV3(title)===normalizeSectionKeyV3(field.section)?'selected':''}>\${escapeHtml(title)}</option>\`).join('')}</select><button type="button" data-field-visibility="\${escapeHtml(field.id)}">\${field.visible===false?'Exibir':'Ocultar'}</button><span class="editor-order-badge">\${Math.max(1,Math.round(Number(field.order||0)/10))}</span></span>
        </div>\`).join('')||'<div class="editor-section-empty">Arraste uma pergunta para esta seção.</div>'}</div>
      </div>\`;
    }).join(''):'<div class="empty">Nenhuma seção ou pergunta encontrada.</div>';

    document.querySelectorAll('[data-editor-field]').forEach(row=>row.addEventListener('click',event=>{if(event.target.closest('button,select'))return;selectedEditorFieldId=row.dataset.editorField;renderFormEditor()}));
    document.querySelectorAll('[data-quick-section-field]').forEach(select=>{
      select.addEventListener('click',event=>event.stopPropagation());
      select.addEventListener('change',event=>{event.stopPropagation();quickMoveFieldToSectionV4(select.dataset.quickSectionField,select.value)});
    });
    document.querySelectorAll('[data-field-visibility]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();toggleFieldVisibilityV3(button.dataset.fieldVisibility)}));
    document.querySelectorAll('[data-section-visibility]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();toggleSectionVisibilityV3(button.dataset.sectionVisibility)}));
    document.querySelectorAll('[data-section-delete]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();deleteEditorSectionV3(button.dataset.sectionDelete)}));
    bindEditorDragV3();
  };

  const previousRenderFormEditorV4=renderFormEditor;
  renderFormEditor=function(){
    previousRenderFormEditorV4();
    const head=document.querySelector('.editor-side-head');
    if(head&&!head.querySelector('.editor-drag-instruction')){
      const info=document.createElement('div');
      info.className='editor-drag-instruction';
      info.innerHTML='<b>Organização rápida:</b> arraste pelo punho ⋮⋮ para qualquer posição ou seção. Também é possível trocar a seção pelo campo ao lado. Os botões Subir e Descer continuam disponíveis.';
      head.appendChild(info);
    }
    const count=document.getElementById('editorQuestionCount');
    if(count)count.textContent=\`\${editorFieldList().length} pergunta(s) · \${sectionListV3().length} seção(ões) · arraste para posicionar\`;
  };


/* Editor V5: seção Produtos editável e layout sem sobreposição */
const PRODUCTS_EDITOR_ID_V5='__products_section_editor__';
const PRODUCTS_SECTION_ID_V5='sec_products_v5';
const DEFAULT_PRODUCTS_CONFIG_V5=Object.freeze({
  title:'5. Produtos',
  help:'Inclua quantas linhas forem necessárias. Descrição, quantidade, valor unitário e NCM são obrigatórios.',
  visible:true,
  deleted:false,
  numberLabel:'#',
  descriptionLabel:'Descrição do produto',
  quantityLabel:'Quantidade',
  unitValueLabel:'Valor unitário',
  ncmLabel:'NCM',
  totalLabel:'Valor total',
  addButtonLabel:'+ Adicionar produto',
  itemsSummaryLabel:'Itens',
  valueSummaryLabel:'Valor total'
});

function ensureProductsConfigV5(config=formEditorConfig){
  if(!config||typeof config!=='object')return config;
  config.productsSection={...DEFAULT_PRODUCTS_CONFIG_V5,...(config.productsSection||{})};
  config.productsSection.title=String(config.productsSection.title||DEFAULT_PRODUCTS_CONFIG_V5.title).trim()||DEFAULT_PRODUCTS_CONFIG_V5.title;
  config.productsSection.visible=config.productsSection.visible!==false;
  config.productsSection.deleted=!!config.productsSection.deleted;
  if(!Array.isArray(config.sections))config.sections=[];
  let section=config.sections.find(item=>item?.id===PRODUCTS_SECTION_ID_V5);
  if(!section){
    section={id:PRODUCTS_SECTION_ID_V5,title:config.productsSection.title,visible:config.productsSection.visible,deleted:config.productsSection.deleted,order:60,system:true};
    config.sections.push(section);
  }
  section.title=config.productsSection.title;
  section.visible=config.productsSection.visible;
  section.deleted=config.productsSection.deleted;
  section.system=true;
  if(!Number.isFinite(Number(section.order)))section.order=60;
  return config;
}

const loadFormEditorConfigBaseV5=loadFormEditorConfig;
loadFormEditorConfig=function(){return ensureProductsConfigV5(loadFormEditorConfigBaseV5())};

function productsConfigV5(){ensureProductsConfigV5(formEditorConfig);return formEditorConfig.productsSection}
function isProductsSectionActiveV5(){
  const cfg=productsConfigV5();return cfg.visible!==false&&!cfg.deleted;
}

function applyProductsConfigV5(){
  const cfg=productsConfigV5();
  const section=document.getElementById('productsFormSection');
  const title=document.getElementById('productsFormSectionTitle');
  const help=document.getElementById('productsFormHelp');
  if(section)section.classList.toggle('form-section-editor-hidden',cfg.visible===false||cfg.deleted);
  if(title)title.textContent=cfg.title;
  if(help)help.textContent=cfg.help||'';
  const labels={
    productsColNumber:cfg.numberLabel,
    productsColDescription:cfg.descriptionLabel,
    productsColQuantity:cfg.quantityLabel,
    productsColUnitValue:cfg.unitValueLabel,
    productsColNcm:cfg.ncmLabel,
    productsColTotal:cfg.totalLabel
  };
  Object.entries(labels).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=String(value||'')});
  const add=document.getElementById('addProduct');if(add)add.textContent=cfg.addButtonLabel||DEFAULT_PRODUCTS_CONFIG_V5.addButtonLabel;
  const items=document.getElementById('productsItemsSummaryLabel');if(items&&items.firstChild)items.firstChild.nodeValue=(cfg.itemsSummaryLabel||'Itens');
  const value=document.getElementById('productsValueSummaryLabel');if(value&&value.firstChild)value.firstChild.nodeValue=(cfg.valueSummaryLabel||'Valor total');
}

const applyFormEditorConfigBaseV5=applyFormEditorConfig;
applyFormEditorConfig=function(){ensureProductsConfigV5(formEditorConfig);applyFormEditorConfigBaseV5();applyProductsConfigV5()};

function productsPseudoFieldV5(){
  const cfg=productsConfigV5();
  return {id:PRODUCTS_EDITOR_ID_V5,label:cfg.title,section:cfg.title,type:'products',required:false,visible:cfg.visible!==false&&!cfg.deleted,readonly:false,system:true,custom:false,deleted:cfg.deleted,order:10};
}

function ensureProductsEditorPanelV5(){
  const main=document.querySelector('.editor-main-v2');if(!main||document.getElementById('productsEditorPanelV5'))return;
  const panel=document.createElement('section');panel.id='productsEditorPanelV5';panel.className='products-editor-panel-v5';
  panel.innerHTML=\`
    <div class="products-editor-intro"><div><strong>Configuração da seção de produtos</strong><span>Altere o título, orientações e textos da tabela sem afetar os cálculos e o cadastro de vários itens.</span></div><i>Componente de múltiplos itens</i></div>
    <div class="products-editor-grid-v5">
      <div class="field full"><label for="productsEditorTitleV5">Título da seção</label><input id="productsEditorTitleV5"></div>
      <div class="field full"><label for="productsEditorHelpV5">Texto de orientação</label><textarea id="productsEditorHelpV5"></textarea></div>
      <label class="editor-toggle"><input id="productsEditorVisibleV5" type="checkbox"><span><b>Exibir seção</b><small>Quando desativada, a solicitação poderá ser enviada sem produtos.</small></span></label>
      <div class="field"><label for="productsEditorDescriptionV5">Coluna de descrição</label><input id="productsEditorDescriptionV5"></div>
      <div class="field"><label for="productsEditorQuantityV5">Coluna de quantidade</label><input id="productsEditorQuantityV5"></div>
      <div class="field"><label for="productsEditorUnitValueV5">Coluna de valor unitário</label><input id="productsEditorUnitValueV5"></div>
      <div class="field"><label for="productsEditorNcmV5">Coluna de NCM</label><input id="productsEditorNcmV5"></div>
      <div class="field"><label for="productsEditorTotalV5">Coluna de valor total</label><input id="productsEditorTotalV5"></div>
      <div class="field"><label for="productsEditorAddButtonV5">Texto do botão</label><input id="productsEditorAddButtonV5"></div>
      <div class="field"><label for="productsEditorItemsSummaryV5">Resumo de itens</label><input id="productsEditorItemsSummaryV5"></div>
      <div class="field"><label for="productsEditorValueSummaryV5">Resumo de valor</label><input id="productsEditorValueSummaryV5"></div>
    </div>
    <div class="products-editor-preview-v5">
      <span id="productsEditorPreviewTitleV5">5. Produtos</span>
      <div><b id="productsEditorPreviewDescriptionV5">Descrição do produto</b><b id="productsEditorPreviewQuantityV5">Quantidade</b><b id="productsEditorPreviewValueV5">Valor unitário</b><b id="productsEditorPreviewNcmV5">NCM</b></div>
    </div>
    <div class="products-editor-actions-v5"><button type="button" class="btn btn-secondary" id="productsEditorRestoreV5">Restaurar Produtos</button><button type="button" class="btn btn-danger" id="productsEditorDeleteV5">Excluir seção</button><button type="button" class="btn btn-primary" id="productsEditorSaveV5">Salvar alterações</button></div>\`;
  const quick=main.querySelector('.editor-quick-actions');quick?.insertAdjacentElement('afterend',panel);

  const preview=()=>{
    const value=id=>document.getElementById(id)?.value||'';
    document.getElementById('productsEditorPreviewTitleV5').textContent=value('productsEditorTitleV5')||'5. Produtos';
    document.getElementById('productsEditorPreviewDescriptionV5').textContent=value('productsEditorDescriptionV5')||'Descrição do produto';
    document.getElementById('productsEditorPreviewQuantityV5').textContent=value('productsEditorQuantityV5')||'Quantidade';
    document.getElementById('productsEditorPreviewValueV5').textContent=value('productsEditorUnitValueV5')||'Valor unitário';
    document.getElementById('productsEditorPreviewNcmV5').textContent=value('productsEditorNcmV5')||'NCM';
  };
  panel.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('input',preview));
  document.getElementById('productsEditorVisibleV5')?.addEventListener('change',preview);
  document.getElementById('productsEditorSaveV5')?.addEventListener('click',saveProductsEditorV5);
  document.getElementById('productsEditorRestoreV5')?.addEventListener('click',restoreProductsEditorV5);
  document.getElementById('productsEditorDeleteV5')?.addEventListener('click',deleteProductsSectionV5);
}

function fillProductsEditorV5(){
  ensureProductsEditorPanelV5();const cfg=productsConfigV5();
  const values={productsEditorTitleV5:cfg.title,productsEditorHelpV5:cfg.help,productsEditorDescriptionV5:cfg.descriptionLabel,productsEditorQuantityV5:cfg.quantityLabel,productsEditorUnitValueV5:cfg.unitValueLabel,productsEditorNcmV5:cfg.ncmLabel,productsEditorTotalV5:cfg.totalLabel,productsEditorAddButtonV5:cfg.addButtonLabel,productsEditorItemsSummaryV5:cfg.itemsSummaryLabel,productsEditorValueSummaryV5:cfg.valueSummaryLabel};
  Object.entries(values).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.value=value||''});
  const visible=document.getElementById('productsEditorVisibleV5');if(visible)visible.checked=cfg.visible!==false&&!cfg.deleted;
  ['productsEditorTitleV5','productsEditorDescriptionV5','productsEditorQuantityV5','productsEditorUnitValueV5','productsEditorNcmV5'].forEach(id=>document.getElementById(id)?.dispatchEvent(new Event('input')));
}

function saveProductsEditorV5(){
  const cfg=productsConfigV5();const value=(id,fallback='')=>String(document.getElementById(id)?.value||fallback).trim();
  const oldTitle=cfg.title;
  cfg.title=value('productsEditorTitleV5',DEFAULT_PRODUCTS_CONFIG_V5.title);
  cfg.help=value('productsEditorHelpV5');
  cfg.descriptionLabel=value('productsEditorDescriptionV5',DEFAULT_PRODUCTS_CONFIG_V5.descriptionLabel);
  cfg.quantityLabel=value('productsEditorQuantityV5',DEFAULT_PRODUCTS_CONFIG_V5.quantityLabel);
  cfg.unitValueLabel=value('productsEditorUnitValueV5',DEFAULT_PRODUCTS_CONFIG_V5.unitValueLabel);
  cfg.ncmLabel=value('productsEditorNcmV5',DEFAULT_PRODUCTS_CONFIG_V5.ncmLabel);
  cfg.totalLabel=value('productsEditorTotalV5',DEFAULT_PRODUCTS_CONFIG_V5.totalLabel);
  cfg.addButtonLabel=value('productsEditorAddButtonV5',DEFAULT_PRODUCTS_CONFIG_V5.addButtonLabel);
  cfg.itemsSummaryLabel=value('productsEditorItemsSummaryV5',DEFAULT_PRODUCTS_CONFIG_V5.itemsSummaryLabel);
  cfg.valueSummaryLabel=value('productsEditorValueSummaryV5',DEFAULT_PRODUCTS_CONFIG_V5.valueSummaryLabel);
  cfg.visible=!!document.getElementById('productsEditorVisibleV5')?.checked;cfg.deleted=false;
  const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);if(section){section.title=cfg.title;section.visible=cfg.visible;section.deleted=false}
  saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(oldTitle===cfg.title?'Seção Produtos atualizada.':'Seção Produtos renomeada e atualizada.');
}

function restoreProductsEditorV5(){
  if(!confirm('Restaurar a seção Produtos para a configuração padrão?'))return;
  formEditorConfig.productsSection={...DEFAULT_PRODUCTS_CONFIG_V5};
  const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);if(section){section.title=DEFAULT_PRODUCTS_CONFIG_V5.title;section.visible=true;section.deleted=false;section.order=60}
  saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Seção Produtos restaurada.');
}
function deleteProductsSectionV5(){
  if(!confirm('Excluir a seção Produtos do formulário? Ela poderá ser recuperada em “Restaurar Produtos” ou “Restaurar padrão”.'))return;
  const cfg=productsConfigV5();cfg.deleted=true;cfg.visible=false;
  const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);if(section){section.deleted=true;section.visible=false}
  selectedEditorFieldId=editorFieldList()[0]?.id||'';saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Seção Produtos excluída do formulário.');
}

const toggleSectionVisibilityBaseV5=toggleSectionVisibilityV3;
toggleSectionVisibilityV3=function(title){
  const cfg=productsConfigV5();if(normalizeSectionKeyV3(title)===normalizeSectionKeyV3(cfg.title)){cfg.visible=cfg.visible===false;cfg.deleted=false;const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);if(section){section.visible=cfg.visible;section.deleted=false}saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(cfg.visible?'Seção Produtos exibida.':'Seção Produtos ocultada.');return}
  toggleSectionVisibilityBaseV5(title);
};
const deleteEditorSectionBaseV5=deleteEditorSectionV3;
deleteEditorSectionV3=function(title){const cfg=productsConfigV5();if(normalizeSectionKeyV3(title)===normalizeSectionKeyV3(cfg.title)){deleteProductsSectionV5();return}deleteEditorSectionBaseV5(title)};

const renderEditorQuestionListBaseV5=renderEditorQuestionList;
renderEditorQuestionList=function(fields){
  ensureProductsConfigV5(formEditorConfig);
  renderEditorQuestionListBaseV5(fields);
  const list=document.getElementById('editorQuestionList');if(!list)return;
  const cfg=productsConfigV5();const query=(document.getElementById('editorQuestionSearch')?.value||'').trim().toLowerCase();const mode=document.getElementById('editorQuestionFilter')?.value||'all';
  const productMatches=!query||[cfg.title,cfg.help,'produtos itens tabela'].join(' ').toLowerCase().includes(query);
  const modeMatches=mode==='all'||(mode==='visible'&&cfg.visible!==false&&!cfg.deleted)||(mode==='hidden'&&(cfg.visible===false||cfg.deleted));
  const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);
  let block=[...list.querySelectorAll('[data-editor-section-block]')].find(el=>normalizeSectionKeyV3(el.dataset.editorSectionBlock)===normalizeSectionKeyV3(cfg.title));
  let createdProductsBlockV5=false;
  if(!block){
    createdProductsBlockV5=true;
    block=document.createElement('div');block.className=\`editor-list-section editor-section-block \${cfg.visible===false||cfg.deleted?'section-hidden':''}\`;block.dataset.editorSectionBlock=cfg.title;
    block.innerHTML=\`<div class="editor-list-section-title editor-section-header"><div class="editor-section-name"><b>\${escapeHtml(cfg.title)}</b><span>1</span>\${cfg.visible===false||cfg.deleted?'<i>Oculta</i>':''}</div><div class="editor-section-actions"><button type="button" data-section-visibility="\${escapeHtml(cfg.title)}">\${cfg.visible===false||cfg.deleted?'Exibir':'Ocultar'}</button><button type="button" class="danger" data-section-delete="\${escapeHtml(cfg.title)}">Excluir seção</button></div></div><div class="editor-section-dropzone"></div>\`;
    const ordered=[...list.children];const order=Number(section?.order||60);const before=ordered.find(el=>{const title=el.dataset.editorSectionBlock;const s=sectionByTitleV3(title,true);return Number(s?.order||999)>order});if(before)list.insertBefore(block,before);else list.appendChild(block);
  }
  const countBadge=block.querySelector('.editor-section-name span');if(countBadge)countBadge.textContent='1';
  const zone=block.querySelector('.editor-section-dropzone');if(zone){
    const old=zone.querySelector('[data-products-editor-v5]');if(old)old.remove();
    zone.querySelectorAll('.editor-section-empty').forEach(item=>item.remove());
    if(productMatches&&modeMatches){
      zone.insertAdjacentHTML('afterbegin',\`<div class="editor-question-item editor-products-special-v5 \${selectedEditorFieldId===PRODUCTS_EDITOR_ID_V5?'active':''}" data-products-editor-v5="1"><span class="editor-drag-handle editor-special-handle-v5" title="Componente de produtos">▦</span><span class="editor-question-item-main"><b title="\${escapeHtml(cfg.title)}">Tabela de produtos e itens</b><span class="editor-question-item-meta"><i class="editor-mini-badge select">Múltiplos itens</i>\${cfg.visible===false||cfg.deleted?'<i class="editor-mini-badge hidden-field">Oculta</i>':''}</span></span><span class="editor-question-quick"><button type="button" data-products-visibility-v5="1">\${cfg.visible===false||cfg.deleted?'Exibir':'Ocultar'}</button><span class="editor-order-badge">▦</span></span></div>\`);
    }
  }
  list.querySelector('[data-products-editor-v5]')?.addEventListener('click',event=>{if(event.target.closest('button'))return;selectedEditorFieldId=PRODUCTS_EDITOR_ID_V5;renderFormEditor()});
  list.querySelector('[data-products-visibility-v5]')?.addEventListener('click',event=>{event.stopPropagation();toggleSectionVisibilityV3(cfg.title)});
  if(createdProductsBlockV5){
    block.querySelector('[data-section-visibility]')?.addEventListener('click',event=>{event.stopPropagation();toggleSectionVisibilityV3(cfg.title)});
    block.querySelector('[data-section-delete]')?.addEventListener('click',event=>{event.stopPropagation();deleteProductsSectionV5()});
  }
};

function renderProductsModeV5(){
  ensureProductsEditorPanelV5();const cfg=productsConfigV5();const fields=editorFieldList();const query=(document.getElementById('editorQuestionSearch')?.value||'').trim().toLowerCase();const mode=document.getElementById('editorQuestionFilter')?.value||'all';
  const filtered=fields.filter(field=>{const text=[field.label,field.section,field.id].join(' ').toLowerCase();const modeOk=mode==='all'||(mode==='visible'&&field.visible!==false)||(mode==='required'&&field.required)||(mode==='custom'&&field.custom)||(mode==='hidden'&&field.visible===false);return modeOk&&(!query||text.includes(query))});
  renderEditorQuestionList(filtered);
  const main=document.querySelector('.editor-main-v2');main?.classList.add('products-editor-mode-v5');
  document.getElementById('editorSectionTag').textContent=cfg.title;document.getElementById('editorQuestionTitle').textContent='Tabela de produtos e itens';document.getElementById('editorFieldType').textContent='Múltiplos itens';document.getElementById('editorFieldProtection').textContent='Componente padrão';document.getElementById('editorFieldProtection').classList.remove('custom');
  fillProductsEditorV5();
  const count=document.getElementById('editorQuestionCount');if(count)count.textContent=\`\${fields.length+1} item(ns) editáveis · \${sectionListV3().length} seção(ões)\`;
}

const renderFormEditorBaseV5=renderFormEditor;
renderFormEditor=function(){
  ensureProductsConfigV5(formEditorConfig);ensureProductsEditorPanelV5();
  if(selectedEditorFieldId===PRODUCTS_EDITOR_ID_V5){renderProductsModeV5();return}
  document.querySelector('.editor-main-v2')?.classList.remove('products-editor-mode-v5');renderFormEditorBaseV5();
  const count=document.getElementById('editorQuestionCount');if(count)count.textContent=\`\${editorFieldList().length+1} item(ns) editáveis · \${sectionListV3().length} seção(ões) · sem sobreposição\`;
};

const resetCurrentEditorFieldBaseV5=resetCurrentEditorField;
resetCurrentEditorField=function(){if(selectedEditorFieldId===PRODUCTS_EDITOR_ID_V5){restoreProductsEditorV5();return}resetCurrentEditorFieldBaseV5()};
const saveCurrentEditorFieldBaseV5=saveCurrentEditorField;
saveCurrentEditorField=function(){if(selectedEditorFieldId===PRODUCTS_EDITOR_ID_V5){saveProductsEditorV5();return}saveCurrentEditorFieldBaseV5()};

const importFormEditorConfigBaseV5=importFormEditorConfig;
importFormEditorConfig=function(file){
  if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const imported=parsed?.config||parsed;if(!imported?.fields||typeof imported.fields!=='object')throw new Error('Formato inválido');const defaults=defaultFormFieldDefinitions();const merged={version:5,fields:{},sections:Array.isArray(imported.sections)?imported.sections:[],productsSection:{...DEFAULT_PRODUCTS_CONFIG_V5,...(imported.productsSection||{})}};defaults.forEach((def,index)=>{const saved=imported.fields[def.id]||{};merged.fields[def.id]=normalizeFieldDefinition({...def,...saved,system:true},index)});Object.values(imported.fields).filter(field=>field?.id&&!merged.fields[field.id]).forEach((field,index)=>{const normalized=normalizeFieldDefinition({...field,system:false,custom:true},defaults.length+index);merged.fields[normalized.id]=normalized});formEditorConfig=ensureProductsConfigV5(ensureSectionsV3(merged));normalizeEditorOrders();saveFormEditorConfig();applyFormEditorConfig();selectedEditorFieldId=editorFieldList()[0]?.id||'';renderFormEditor();showToast('Configuração importada com sucesso.')}catch(error){showToast('Arquivo de configuração inválido.')}};reader.readAsText(file);
};


/* Editor V6: edição completa de botões, elementos fixos e colunas */
const UI_ITEM_PREFIX_V6='__ui_item_v6__:';
const DEFAULT_UI_ELEMENTS_V6=Object.freeze({
  formTitle:{label:'Título do formulário',category:'Cabeçalho',text:'Nova solicitação de Cadastro de Itens',editText:'Editar solicitação',visible:true,deleted:false,editableText:true},
  formSubtitle:{label:'Subtítulo do formulário',category:'Cabeçalho',text:'Preencha os dados do solicitante, origem, destino, frete e produtos. A solicitação entrará em "Não Iniciado".',editText:'Altere os dados necessários. A fase e os cronômetros atuais serão preservados.',visible:true,deleted:false,editableText:true},
  formModePill:{label:'Indicador de modo do formulário',category:'Cabeçalho',text:'NOVO CADASTRO',editText:'MODO EDIÇÃO',visible:true,deleted:false,editableText:true},
  loginUserStatus:{label:'Aviso do usuário conectado',category:'Avisos e orientações',text:'',visible:true,deleted:false,editableText:false},
  freightRule:{label:'Aviso da regra do frete',category:'Avisos e orientações',text:'',visible:true,deleted:false,editableText:false},
  productsHelp:{label:'Orientação abaixo da tabela de produtos',category:'Produtos',text:'Inclua quantas linhas forem necessárias. Descrição, quantidade, valor unitário e NCM são obrigatórios.',visible:true,deleted:false,editableText:true},
  clearForm:{label:'Botão Limpar formulário',category:'Botões principais',text:'Limpar formulário',visible:true,deleted:false,editableText:true,order:10,orderGroup:'formActions'},
  cancelEdit:{label:'Botão Cancelar edição',category:'Botões principais',text:'Cancelar edição',visible:true,deleted:false,editableText:true,order:20,orderGroup:'formActions'},
  saveRequest:{label:'Botão Salvar e enviar',category:'Botões principais',text:'Salvar e enviar para o Kanban',editText:'Salvar alterações',visible:true,deleted:false,editableText:true,order:30,orderGroup:'formActions'},
  addProduct:{label:'Botão Adicionar produto',category:'Produtos',text:'+ Adicionar produto',visible:true,deleted:false,editableText:true},
  removeProduct:{label:'Botão Excluir linha de produto',category:'Produtos',text:'×',visible:true,deleted:false,editableText:true},
  productsItemsSummary:{label:'Resumo da quantidade de itens',category:'Produtos',text:'Itens',visible:true,deleted:false,editableText:true},
  productsValueSummary:{label:'Resumo do valor total',category:'Produtos',text:'Valor total',visible:true,deleted:false,editableText:true},
  productsNumberColumn:{label:'Coluna de numeração',category:'Colunas da tabela',text:'#',visible:true,deleted:false,editableText:true,columnIndex:0},
  productsDescriptionColumn:{label:'Coluna Descrição do produto',category:'Colunas da tabela',text:'Descrição do produto',visible:true,deleted:false,editableText:true,columnIndex:1},
  productsQuantityColumn:{label:'Coluna Quantidade',category:'Colunas da tabela',text:'Quantidade',visible:true,deleted:false,editableText:true,columnIndex:2},
  productsUnitValueColumn:{label:'Coluna Valor unitário',category:'Colunas da tabela',text:'Valor unitário',visible:true,deleted:false,editableText:true,columnIndex:3},
  productsNcmColumn:{label:'Coluna NCM',category:'Colunas da tabela',text:'NCM',visible:true,deleted:false,editableText:true,columnIndex:4},
  productsTotalColumn:{label:'Coluna Valor total',category:'Colunas da tabela',text:'Valor total',visible:true,deleted:false,editableText:true,columnIndex:5},
  productsDeleteColumn:{label:'Coluna de exclusão de linha',category:'Colunas da tabela',text:'Ações',visible:true,deleted:false,editableText:false,columnIndex:6}
});

function cloneUiDefaultV6(value){return JSON.parse(JSON.stringify(value))}
function ensureUIElementsV6(config=formEditorConfig){
  if(!config||typeof config!=='object')return config;
  const saved=config.uiElements&&typeof config.uiElements==='object'?config.uiElements:{};
  const merged={};
  Object.entries(DEFAULT_UI_ELEMENTS_V6).forEach(([key,def])=>{
    const current=saved[key]&&typeof saved[key]==='object'?saved[key]:{};
    merged[key]={...cloneUiDefaultV6(def),...current};
    merged[key].visible=current.visible===undefined?def.visible:current.visible!==false;
    merged[key].deleted=!!current.deleted;
    if(def.orderGroup)merged[key].order=Number.isFinite(Number(current.order))?Number(current.order):def.order;
  });
  config.uiElements=merged;
  return config;
}

const loadFormEditorConfigBaseV6=loadFormEditorConfig;
loadFormEditorConfig=function(){return ensureUIElementsV6(loadFormEditorConfigBaseV6())};
function uiConfigV6(key){ensureUIElementsV6(formEditorConfig);return formEditorConfig.uiElements[key]}
function uiActiveV6(key){const cfg=uiConfigV6(key);return !!cfg&&cfg.visible!==false&&!cfg.deleted}
function setUiRemovedV6(element,key){if(!element)return;const active=uiActiveV6(key);element.dataset.uiRemovedV6=active?'0':'1';element.setAttribute('aria-hidden',active?'false':'true')}
function setNodeLeadingTextV6(element,text){
  if(!element)return;
  const value=String(text??'');
  const node=[...element.childNodes].find(item=>item.nodeType===Node.TEXT_NODE);
  if(node)node.nodeValue=value;else element.insertBefore(document.createTextNode(value),element.firstChild||null);
}
function currentFormEditModeV6(){return !!String(document.getElementById('editId')?.value||'')}
function uiDisplayTextV6(key){const cfg=uiConfigV6(key);return currentFormEditModeV6()&&cfg.editText!==undefined?String(cfg.editText||cfg.text||''):String(cfg.text||'')}

function ensureFormActionHostV6(){
  const actions=document.querySelector('#requestForm .actions');if(!actions)return null;
  let host=document.getElementById('formActionButtonsV6');
  if(!host){host=document.createElement('div');host.id='formActionButtonsV6';host.className='form-action-buttons-v6';actions.appendChild(host)}
  const buttons=['clearForm','cancelEdit','saveRequest'].map(id=>document.getElementById(id)).filter(Boolean);
  buttons.sort((a,b)=>Number(uiConfigV6(a.id)?.order||0)-Number(uiConfigV6(b.id)?.order||0)).forEach(button=>host.appendChild(button));
  actions.querySelectorAll(':scope > .action-group').forEach(group=>{if(!group.children.length)group.style.display='none'});
  return host;
}

const PRODUCT_COLUMN_KEYS_V6=['productsNumberColumn','productsDescriptionColumn','productsQuantityColumn','productsUnitValueColumn','productsNcmColumn','productsTotalColumn','productsDeleteColumn'];
function applyProductColumnsV6(){
  const table=document.querySelector('#productsFormSection .products-table');if(!table)return;
  const headerIds=['productsColNumber','productsColDescription','productsColQuantity','productsColUnitValue','productsColNcm','productsColTotal','productsColDeleteV6'];
  const headCells=table.querySelectorAll('thead th');if(headCells[6]&&!headCells[6].id)headCells[6].id='productsColDeleteV6';
  PRODUCT_COLUMN_KEYS_V6.forEach((key,index)=>{
    const cfg=uiConfigV6(key);const active=uiActiveV6(key);const header=document.getElementById(headerIds[index])||headCells[index];
    if(header){header.style.display=active?'':'none';if(cfg.editableText!==false&&active)header.textContent=String(cfg.text||'')}
    table.querySelectorAll('tbody tr').forEach(row=>{
      const cell=row.children[index];if(!cell)return;cell.style.display=active?'':'none';
      cell.querySelectorAll('input,button,select,textarea').forEach(control=>{control.disabled=!active});
    });
  });
  const visibleCount=PRODUCT_COLUMN_KEYS_V6.filter(uiActiveV6).length;
  table.style.minWidth=visibleCount<=3?'520px':visibleCount<=5?'700px':'880px';
}

function applyUIElementsV6(){
  ensureUIElementsV6(formEditorConfig);
  const title=document.getElementById('formTitle');if(title){title.textContent=uiDisplayTextV6('formTitle');setUiRemovedV6(title,'formTitle')}
  const subtitle=document.getElementById('formSubtitle');if(subtitle){subtitle.textContent=uiDisplayTextV6('formSubtitle');setUiRemovedV6(subtitle,'formSubtitle')}
  const pill=document.getElementById('formModePill');if(pill){pill.textContent=uiDisplayTextV6('formModePill');setUiRemovedV6(pill,'formModePill')}
  setUiRemovedV6(document.getElementById('loginUserStatus'),'loginUserStatus');
  setUiRemovedV6(document.getElementById('freightRule'),'freightRule');
  const help=document.getElementById('productsFormHelp');if(help){help.textContent=String(uiConfigV6('productsHelp').text||'');setUiRemovedV6(help,'productsHelp')}

  const clear=document.getElementById('clearForm');if(clear){clear.textContent=String(uiConfigV6('clearForm').text||'');setUiRemovedV6(clear,'clearForm')}
  const cancel=document.getElementById('cancelEdit');if(cancel){cancel.textContent=String(uiConfigV6('cancelEdit').text||'');setUiRemovedV6(cancel,'cancelEdit')}
  const save=document.getElementById('saveRequest');if(save){save.textContent=uiDisplayTextV6('saveRequest');setUiRemovedV6(save,'saveRequest')}
  const actionHost=ensureFormActionHostV6();if(actionHost){const activeButtons=['clearForm','cancelEdit','saveRequest'].filter(uiActiveV6);actionHost.dataset.empty=activeButtons.length?'0':'1';const actions=actionHost.closest('.actions');if(actions)actions.dataset.uiRemovedV6=activeButtons.length?'0':'1'}

  const add=document.getElementById('addProduct');if(add){add.textContent=String(uiConfigV6('addProduct').text||'');setUiRemovedV6(add,'addProduct')}
  document.querySelectorAll('#productsBody .remove-product').forEach(button=>{button.textContent=String(uiConfigV6('removeProduct').text||'×');setUiRemovedV6(button,'removeProduct')});
  const items=document.getElementById('productsItemsSummaryLabel');if(items){setNodeLeadingTextV6(items,uiConfigV6('productsItemsSummary').text||'');setUiRemovedV6(items,'productsItemsSummary')}
  const value=document.getElementById('productsValueSummaryLabel');if(value){setNodeLeadingTextV6(value,uiConfigV6('productsValueSummary').text||'');setUiRemovedV6(value,'productsValueSummary')}
  applyProductColumnsV6();
}

const applyFormEditorConfigBaseV6=applyFormEditorConfig;
applyFormEditorConfig=function(){ensureUIElementsV6(formEditorConfig);applyFormEditorConfigBaseV6();applyUIElementsV6()};
const resetFormBaseV6=resetForm;
resetForm=function(){resetFormBaseV6();applyUIElementsV6()};
const editRequestBaseV6=editRequest;
editRequest=function(id){editRequestBaseV6(id);applyUIElementsV6()};
const updateFreightRuleBaseV6=updateFreightRule;
updateFreightRule=function(){updateFreightRuleBaseV6();applyUIElementsV6()};
const addProductRowBaseV6=addProductRow;
addProductRow=function(data={}){addProductRowBaseV6(data);applyUIElementsV6()};
const updateProductsSummaryBaseV6=updateProductsSummary;
updateProductsSummary=function(){updateProductsSummaryBaseV6();applyUIElementsV6()};

collectProducts=function(){
  return $$('#productsBody tr').map(tr=>({
    id:tr.dataset.productId,
    description:uiActiveV6('productsDescriptionColumn')?tr.querySelector('.p-desc').value.trim():'Item cadastrado',
    quantity:uiActiveV6('productsQuantityColumn')?Number(tr.querySelector('.p-qty').value):1,
    unitValue:uiActiveV6('productsUnitValueColumn')?Number(tr.querySelector('.p-value').value):0,
    ncm:uiActiveV6('productsNcmColumn')?tr.querySelector('.p-ncm').value.trim():''
  }));
};
validateProducts=function(products){
  for(let i=0;i<products.length;i++){
    const p=products[i];const errors=[];
    if(uiActiveV6('productsDescriptionColumn')&&!p.description)errors.push('descrição');
    if(uiActiveV6('productsQuantityColumn')&&!(p.quantity>0))errors.push('quantidade');
    if(uiActiveV6('productsUnitValueColumn')&&p.unitValue<0)errors.push('valor');
    if(uiActiveV6('productsNcmColumn')&&!/^\\d{8}$/.test(p.ncm))errors.push('NCM com 8 dígitos');
    if(errors.length){showToast(\`Revise o produto \${i+1}: \${errors.join(', ')}.\`);return false}
  }
  return true;
};

function uiEditorItemsV6(){return Object.entries(ensureUIElementsV6(formEditorConfig).uiElements).map(([key,cfg])=>({key,...cfg}))}
function uiSpecialIdV6(key){return UI_ITEM_PREFIX_V6+key}
function uiKeyFromSelectedV6(){return String(selectedEditorFieldId||'').startsWith(UI_ITEM_PREFIX_V6)?String(selectedEditorFieldId).slice(UI_ITEM_PREFIX_V6.length):''}
function uiModeMatchesV6(item,query,mode){
  const text=[item.label,item.category,item.text,item.editText].join(' ').toLowerCase();
  if(query&&!text.includes(query))return false;
  if(mode==='visible')return item.visible!==false&&!item.deleted;
  if(mode==='hidden')return item.visible===false||item.deleted;
  if(mode==='required'||mode==='custom')return false;
  return true;
}

function appendUiItemsToEditorListV6(){
  const list=document.getElementById('editorQuestionList');if(!list)return;
  const query=(document.getElementById('editorQuestionSearch')?.value||'').trim().toLowerCase();
  const mode=document.getElementById('editorQuestionFilter')?.value||'all';
  const items=uiEditorItemsV6().filter(item=>uiModeMatchesV6(item,query,mode));
  if(!items.length&&mode!=='all'&&mode!=='visible'&&mode!=='hidden')return;
  const block=document.createElement('div');block.className='editor-list-section editor-section-block ui-elements-block-v6';block.dataset.uiElementsBlock='1';
  block.innerHTML=\`<div class="editor-list-section-title editor-section-header"><div class="editor-section-name"><b>Elementos e botões</b><span>\${items.length}</span></div><div class="editor-section-actions"><button type="button" id="restoreAllUiElementsV6">Restaurar elementos</button></div></div><div class="editor-section-dropzone">\${items.map(item=>\`<div class="editor-question-item ui-editor-item-v6 \${uiSpecialIdV6(item.key)===selectedEditorFieldId?'active':''} \${item.deleted?'ui-deleted-v6':''}" data-ui-editor-key="\${escapeHtml(item.key)}"><span class="editor-drag-handle editor-special-handle-v5">◆</span><span class="editor-question-item-main"><b>\${escapeHtml(item.label)}</b><span class="editor-question-item-meta"><i class="editor-mini-badge">\${escapeHtml(item.category)}</i>\${item.deleted?'<i class="editor-mini-badge hidden-field">Excluído</i>':item.visible===false?'<i class="editor-mini-badge hidden-field">Oculto</i>':'<i class="editor-mini-badge select">Visível</i>'}</span></span><span class="editor-question-quick ui-item-actions-v6"><button type="button" data-ui-toggle-v6="\${escapeHtml(item.key)}">\${item.visible===false||item.deleted?'Exibir':'Ocultar'}</button><button type="button" class="\${item.deleted?'':'danger'}" data-ui-delete-v6="\${escapeHtml(item.key)}">\${item.deleted?'Restaurar':'Excluir'}</button></span></div>\`).join('')||'<div class="editor-section-empty">Nenhum elemento neste filtro.</div>'}</div>\`;
  list.appendChild(block);
  block.querySelectorAll('[data-ui-editor-key]').forEach(row=>row.addEventListener('click',event=>{if(event.target.closest('button'))return;selectedEditorFieldId=uiSpecialIdV6(row.dataset.uiEditorKey);renderFormEditor()}));
  block.querySelectorAll('[data-ui-toggle-v6]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();toggleUiElementV6(button.dataset.uiToggleV6)}));
  block.querySelectorAll('[data-ui-delete-v6]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const key=button.dataset.uiDeleteV6;uiConfigV6(key).deleted?restoreUiElementV6(key):deleteUiElementV6(key)}));
  block.querySelector('#restoreAllUiElementsV6')?.addEventListener('click',restoreAllUiElementsV6);
}

const renderEditorQuestionListBaseV6=renderEditorQuestionList;
renderEditorQuestionList=function(fields){renderEditorQuestionListBaseV6(fields);appendUiItemsToEditorListV6()};

function ensureUiElementPanelV6(){
  const main=document.querySelector('.editor-main-v2');if(!main||document.getElementById('uiElementPanelV6'))return;
  const panel=document.createElement('section');panel.id='uiElementPanelV6';panel.className='ui-element-panel-v6';
  panel.innerHTML=\`<div class="ui-element-intro-v6"><div><strong>Configuração de elemento fixo</strong><span>Remova, oculte, renomeie ou restaure botões e componentes do formulário.</span></div><i id="uiElementCategoryV6">Elemento</i></div><div class="ui-element-grid-v6"><div class="field full"><label for="uiElementLabelV6">Elemento selecionado</label><input id="uiElementLabelV6" readonly></div><div class="field full" id="uiElementTextFieldV6"><label for="uiElementTextV6">Texto exibido</label><input id="uiElementTextV6"></div><div class="field full hidden" id="uiElementEditTextFieldV6"><label for="uiElementEditTextV6">Texto durante a edição</label><input id="uiElementEditTextV6"></div><div class="field hidden" id="uiElementOrderFieldV6"><label for="uiElementOrderV6">Ordem do botão</label><input id="uiElementOrderV6" type="number" min="1" step="1"></div><label class="editor-toggle"><input id="uiElementVisibleV6" type="checkbox"><span><b>Exibir no formulário</b><small>Desative para ocultar sem excluir.</small></span></label></div><div class="ui-element-status-v6" id="uiElementStatusV6"></div><div class="products-editor-actions-v5"><button type="button" class="btn btn-secondary" id="uiElementRestoreV6">Restaurar item</button><button type="button" class="btn btn-danger" id="uiElementDeleteV6">Excluir item</button><button type="button" class="btn btn-primary" id="uiElementSaveV6">Salvar alterações</button></div>\`;
  const quick=main.querySelector('.editor-quick-actions');quick?.insertAdjacentElement('afterend',panel);
  panel.querySelector('#uiElementSaveV6')?.addEventListener('click',saveUiElementV6);
  panel.querySelector('#uiElementDeleteV6')?.addEventListener('click',()=>{const key=uiKeyFromSelectedV6();if(key)deleteUiElementV6(key)});
  panel.querySelector('#uiElementRestoreV6')?.addEventListener('click',()=>{const key=uiKeyFromSelectedV6();if(key)restoreUiElementV6(key)});
}

function editorFilteredFieldsV6(){
  const query=(document.getElementById('editorQuestionSearch')?.value||'').trim().toLowerCase();const mode=document.getElementById('editorQuestionFilter')?.value||'all';
  return editorFieldList().filter(field=>{const text=[field.label,field.section,field.id].join(' ').toLowerCase();const modeOk=mode==='all'||(mode==='visible'&&field.visible!==false)||(mode==='required'&&field.required)||(mode==='custom'&&field.custom)||(mode==='hidden'&&field.visible===false);return modeOk&&(!query||text.includes(query))});
}
function fillUiElementPanelV6(key){
  ensureUiElementPanelV6();const cfg=uiConfigV6(key);if(!cfg)return;
  document.getElementById('uiElementLabelV6').value=cfg.label||key;
  document.getElementById('uiElementTextV6').value=cfg.text||'';
  document.getElementById('uiElementEditTextV6').value=cfg.editText||'';
  document.getElementById('uiElementVisibleV6').checked=cfg.visible!==false&&!cfg.deleted;
  document.getElementById('uiElementCategoryV6').textContent=cfg.category||'Elemento';
  document.getElementById('uiElementTextFieldV6').classList.toggle('hidden',cfg.editableText===false);
  document.getElementById('uiElementEditTextFieldV6').classList.toggle('hidden',cfg.editText===undefined||cfg.editableText===false);
  document.getElementById('uiElementOrderFieldV6').classList.toggle('hidden',!cfg.orderGroup);
  document.getElementById('uiElementOrderV6').value=Number(cfg.order||10)/10;
  document.getElementById('uiElementStatusV6').innerHTML=cfg.deleted?'<b>Item excluído.</b> Use “Restaurar item” para recuperá-lo.':cfg.visible===false?'<b>Item oculto.</b> Ele continua configurado e pode ser exibido novamente.':'<b>Item ativo.</b> As alterações serão aplicadas imediatamente ao formulário.';
  document.getElementById('uiElementDeleteV6').disabled=!!cfg.deleted;
}
function renderUiElementModeV6(key){
  ensureUiElementPanelV6();renderEditorQuestionList(editorFilteredFieldsV6());
  const main=document.querySelector('.editor-main-v2');main?.classList.remove('products-editor-mode-v5');main?.classList.add('ui-element-editor-mode-v6');
  const cfg=uiConfigV6(key);document.getElementById('editorSectionTag').textContent=cfg.category||'Elemento';document.getElementById('editorQuestionTitle').textContent=cfg.label||key;document.getElementById('editorFieldType').textContent='Elemento fixo';document.getElementById('editorFieldProtection').textContent='Configurável';document.getElementById('editorFieldProtection').classList.add('custom');fillUiElementPanelV6(key);
  const count=document.getElementById('editorQuestionCount');if(count)count.textContent=\`\${editorFieldList().length+1+uiEditorItemsV6().length} item(ns) editáveis · perguntas, seções, botões e componentes\`;
}

const renderFormEditorBaseV6=renderFormEditor;
renderFormEditor=function(){
  ensureUIElementsV6(formEditorConfig);ensureUiElementPanelV6();const key=uiKeyFromSelectedV6();
  if(key&&uiConfigV6(key)){renderUiElementModeV6(key);return}
  document.querySelector('.editor-main-v2')?.classList.remove('ui-element-editor-mode-v6');renderFormEditorBaseV6();
};

function saveUiElementV6(){
  const key=uiKeyFromSelectedV6();const cfg=uiConfigV6(key);if(!cfg)return;
  if(cfg.editableText!==false)cfg.text=String(document.getElementById('uiElementTextV6')?.value||'').trim();
  if(cfg.editText!==undefined&&cfg.editableText!==false)cfg.editText=String(document.getElementById('uiElementEditTextV6')?.value||'').trim();
  cfg.visible=!!document.getElementById('uiElementVisibleV6')?.checked;cfg.deleted=false;
  if(cfg.orderGroup)cfg.order=Math.max(1,Number(document.getElementById('uiElementOrderV6')?.value||1))*10;
  saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Elemento atualizado no formulário.');
}
function toggleUiElementV6(key){const cfg=uiConfigV6(key);if(!cfg)return;if(cfg.deleted)cfg.deleted=false;cfg.visible=cfg.visible===false;saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast(cfg.visible?'Elemento exibido.':'Elemento ocultado.')}
function deleteUiElementV6(key){const cfg=uiConfigV6(key);if(!cfg)return;if(!confirm(\`Excluir “\${cfg.label}” do formulário? Ele poderá ser restaurado pelo editor.\`))return;cfg.deleted=true;cfg.visible=false;saveFormEditorConfig();applyFormEditorConfig();selectedEditorFieldId=uiSpecialIdV6(key);renderFormEditor();showToast('Elemento excluído do formulário.')}
function restoreUiElementV6(key){const def=DEFAULT_UI_ELEMENTS_V6[key];if(!def)return;formEditorConfig.uiElements[key]=cloneUiDefaultV6(def);saveFormEditorConfig();applyFormEditorConfig();selectedEditorFieldId=uiSpecialIdV6(key);renderFormEditor();showToast('Elemento restaurado.')}
function restoreAllUiElementsV6(){if(!confirm('Restaurar todos os botões e elementos fixos para o padrão?'))return;formEditorConfig.uiElements=cloneUiDefaultV6(DEFAULT_UI_ELEMENTS_V6);saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Todos os elementos foram restaurados.')}

const exportFormEditorConfigBaseV6=exportFormEditorConfig;
exportFormEditorConfig=function(){ensureUIElementsV6(formEditorConfig);exportFormEditorConfigBaseV6()};
const importFormEditorConfigBaseV6=importFormEditorConfig;
importFormEditorConfig=function(file){
  if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const imported=parsed?.config||parsed;if(!imported?.fields||typeof imported.fields!=='object')throw new Error('Formato inválido');const defaults=defaultFormFieldDefinitions();const merged={version:6,fields:{},sections:Array.isArray(imported.sections)?imported.sections:[],productsSection:{...DEFAULT_PRODUCTS_CONFIG_V5,...(imported.productsSection||{})},uiElements:imported.uiElements||{},productTableFields:Array.isArray(imported.productTableFields)?imported.productTableFields:[]};defaults.forEach((def,index)=>{const saved=imported.fields[def.id]||{};merged.fields[def.id]=normalizeFieldDefinition({...def,...saved,system:true},index)});Object.values(imported.fields).filter(field=>field?.id&&!merged.fields[field.id]).forEach((field,index)=>{const normalized=normalizeFieldDefinition({...field,system:false,custom:true},defaults.length+index);merged.fields[normalized.id]=normalized});formEditorConfig=ensureUIElementsV6(ensureProductsConfigV5(ensureSectionsV3(merged)));normalizeEditorOrders();saveFormEditorConfig();applyFormEditorConfig();selectedEditorFieldId=editorFieldList()[0]?.id||'';renderFormEditor();showToast('Configuração completa importada com sucesso.')}catch(error){showToast('Arquivo de configuração inválido.')}};reader.readAsText(file);
};



/* Editor V7: campos da tabela de itens totalmente editáveis */
const PRODUCT_FIELD_PREFIX_V7='ptf_';
const PRODUCT_FIELD_TYPES_V7=['text','number','currency','email','date','select','textarea'];
const DEFAULT_PRODUCT_FIELDS_V7=Object.freeze([
  {id:'number',label:'#',type:'index',placeholder:'',required:false,visible:true,deleted:false,order:10,width:54,builtin:true,lockedType:true},
  {id:'description',label:'Descrição do produto',type:'text',placeholder:'Descrição do produto',required:true,visible:true,deleted:false,order:20,width:300,builtin:true},
  {id:'quantity',label:'Quantidade',type:'number',placeholder:'0',required:true,visible:true,deleted:false,order:30,width:120,builtin:true},
  {id:'unitValue',label:'Valor unitário',type:'currency',placeholder:'0,00',required:true,visible:true,deleted:false,order:40,width:150,builtin:true},
  {id:'ncm',label:'NCM',type:'text',placeholder:'8 dígitos',required:true,visible:true,deleted:false,order:50,width:140,builtin:true,ncmRule:true},
  {id:'total',label:'Valor total',type:'calculated',placeholder:'',required:false,visible:true,deleted:false,order:60,width:140,builtin:true,lockedType:true},
  {id:'actions',label:'Ações',type:'action',placeholder:'',required:false,visible:true,deleted:false,order:70,width:70,builtin:true,lockedType:true}
]);
let selectedProductFieldIdV7='description';
let draggedProductFieldIdV7='';

function cloneProductFieldV7(value){return JSON.parse(JSON.stringify(value))}
function productFieldSafeIdV7(value){
  const clean=String(value||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9_]+/g,'_').replace(/^_+|_+$/g,'');
  return clean||PRODUCT_FIELD_PREFIX_V7+Date.now().toString(36);
}
function normalizeProductFieldV7(field,index=0){
  const allowed=[...PRODUCT_FIELD_TYPES_V7,'index','calculated','action'];
  const normalized={...field};
  normalized.id=productFieldSafeIdV7(normalized.id||PRODUCT_FIELD_PREFIX_V7+Date.now().toString(36)+index);
  normalized.label=String(normalized.label||'Novo campo').trim()||'Novo campo';
  normalized.type=allowed.includes(normalized.type)?normalized.type:'text';
  normalized.placeholder=String(normalized.placeholder||'');
  normalized.required=!!normalized.required;
  normalized.visible=normalized.visible!==false;
  normalized.deleted=!!normalized.deleted;
  normalized.order=Number.isFinite(Number(normalized.order))?Number(normalized.order):(index+1)*10;
  normalized.width=Math.max(80,Math.min(520,Number(normalized.width)||150));
  normalized.builtin=!!normalized.builtin;
  normalized.lockedType=!!normalized.lockedType;
  normalized.ncmRule=!!normalized.ncmRule;
  normalized.options=Array.isArray(normalized.options)?normalized.options.map(item=>String(item||'').trim()).filter(Boolean):String(normalized.options||'').split(/\\r?\\n|;/).map(item=>item.trim()).filter(Boolean);
  return normalized;
}
function productFieldDefaultsMapV7(){return new Map(DEFAULT_PRODUCT_FIELDS_V7.map(item=>[item.id,cloneProductFieldV7(item)]))}
function ensureProductFieldsV7(config=formEditorConfig){
  if(!config||typeof config!=='object')return config;
  let stored=Array.isArray(config.productTableFields)?config.productTableFields:[];
  const defaults=productFieldDefaultsMapV7();
  const savedMap=new Map(stored.filter(Boolean).map(item=>[String(item.id||''),item]));
  const fields=[];
  DEFAULT_PRODUCT_FIELDS_V7.forEach((def,index)=>{
    const saved=savedMap.get(def.id)||{};
    const uiKey={number:'productsNumberColumn',description:'productsDescriptionColumn',quantity:'productsQuantityColumn',unitValue:'productsUnitValueColumn',ncm:'productsNcmColumn',total:'productsTotalColumn',actions:'productsDeleteColumn'}[def.id];
    const ui=uiKey&&config.uiElements?.[uiKey];
    fields.push(normalizeProductFieldV7({...def,...saved,
      label:saved.label||ui?.text||def.label,
      visible:saved.visible===undefined?(ui?.visible===undefined?def.visible:ui.visible!==false):saved.visible,
      deleted:saved.deleted===undefined?!!ui?.deleted:!!saved.deleted
    },index));
  });
  stored.filter(item=>item&&item.id&&!defaults.has(String(item.id))).forEach((item,index)=>fields.push(normalizeProductFieldV7({...item,builtin:false},fields.length+index)));
  config.productTableFields=fields;
  return config;
}
function productFieldsV7(){ensureProductFieldsV7(formEditorConfig);return formEditorConfig.productTableFields}
function sortedProductFieldsV7(){return [...productFieldsV7()].sort((a,b)=>Number(a.order)-Number(b.order)||String(a.label).localeCompare(String(b.label),'pt-BR'))}
function productFieldV7(id){return productFieldsV7().find(field=>field.id===id)}
function productFieldActiveV7(field){return !!field&&field.visible!==false&&!field.deleted}
function productFieldInputClassV7(id){return {description:'p-desc',quantity:'p-qty',unitValue:'p-value',ncm:'p-ncm'}[id]||'p-custom-v7'}
function productFieldValueV7(data,field){
  if(field.id==='description')return data?.description??'';
  if(field.id==='quantity')return data?.quantity??'';
  if(field.id==='unitValue')return data?.unitValue??'';
  if(field.id==='ncm')return data?.ncm??'';
  return data?.customFields?.[field.id]??'';
}
function productControlValueV7(row,field){
  const control=row.querySelector(\`[data-product-control-v7="\${CSS.escape(field.id)}"]\`);
  return control?control.value:'';
}
function productControlHtmlV7(field,value=''){
  const cls=productFieldInputClassV7(field.id);
  const common=\`class="\${cls}" data-product-control-v7="\${escapeHtml(field.id)}" data-product-field-type-v7="\${escapeHtml(field.type)}" \${field.required?'required':''}\`;
  const val=escapeHtml(value??'');
  const placeholder=escapeHtml(field.placeholder||'');
  if(field.type==='select'){
    return \`<select \${common}><option value="">Selecione</option>\${(field.options||[]).map(option=>\`<option value="\${escapeHtml(option)}" \${String(value)===String(option)?'selected':''}>\${escapeHtml(option)}</option>\`).join('')}</select>\`;
  }
  if(field.type==='textarea')return \`<textarea \${common} placeholder="\${placeholder}">\${val}</textarea>\`;
  const inputType=field.type==='date'?'date':field.type==='email'?'email':(['number','currency'].includes(field.type)?'number':'text');
  const step=field.type==='currency'?'0.01':field.type==='number'?'0.0001':'';
  return \`<input \${common} type="\${inputType}" \${step?\`step="\${step}"\`:''} \${['number','currency'].includes(field.type)?'min="0"':''} placeholder="\${placeholder}" value="\${val}">\`;
}
function tagExistingProductCellsV7(row){
  const mappings=[
    ['number',()=>row.querySelector('td.num')],
    ['description',()=>row.querySelector('td:has(.p-desc)')],
    ['quantity',()=>row.querySelector('td:has(.p-qty)')],
    ['unitValue',()=>row.querySelector('td:has(.p-value)')],
    ['ncm',()=>row.querySelector('td:has(.p-ncm)')],
    ['total',()=>row.querySelector('td.total')],
    ['actions',()=>row.querySelector('td:has(.remove-product)')]
  ];
  mappings.forEach(([id,get])=>{const cell=get();if(cell&&!cell.dataset.productFieldV7)cell.dataset.productFieldV7=id});
}
function bindProductControlV7(control,field){
  if(!control||control.dataset.boundProductV7==='1')return;
  control.dataset.boundProductV7='1';
  control.addEventListener('input',()=>{
    if(field.ncmRule)control.value=control.value.replace(/\\D/g,'').slice(0,8);
    updateProductsSummary();
  });
  control.addEventListener('change',updateProductsSummary);
}
function ensureProductRowV7(row,data=null){
  if(!row)return;
  tagExistingProductCellsV7(row);
  const fields=sortedProductFieldsV7();
  fields.forEach(field=>{
    let cell=row.querySelector(\`td[data-product-field-v7="\${CSS.escape(field.id)}"]\`);
    if(!cell){cell=document.createElement('td');cell.dataset.productFieldV7=field.id;row.appendChild(cell)}
    cell.style.display=productFieldActiveV7(field)?'':'none';
    cell.style.width=field.width+'px';cell.style.minWidth=field.width+'px';
    if(field.id==='number'){
      cell.className='num';
    }else if(field.id==='total'){
      cell.className='total';if(!cell.textContent.trim())cell.textContent=formatMoney(0);
    }else if(field.id==='actions'){
      let button=cell.querySelector('.remove-product');
      if(!button){button=document.createElement('button');button.type='button';button.className='btn btn-danger btn-small remove-product';button.textContent=uiConfigV6('removeProduct')?.text||'×';button.addEventListener('click',()=>{if(document.querySelectorAll('#productsBody tr').length===1){showToast('A solicitação precisa ter ao menos um item.');return}row.remove();updateProductsSummary()});cell.appendChild(button)}
    }else{
      const old=cell.querySelector('[data-product-control-v7],input,select,textarea');
      const value=data?productFieldValueV7(data,field):(old?.value??'');
      const mustReplace=!old||old.dataset.productFieldTypeV7!==field.type||old.dataset.productControlV7!==field.id;
      if(mustReplace)cell.innerHTML=productControlHtmlV7(field,value);
      const control=cell.querySelector('[data-product-control-v7]');
      if(control){
        control.placeholder=field.placeholder||'';control.required=!!field.required&&productFieldActiveV7(field);control.disabled=!productFieldActiveV7(field);
        if(data&&String(control.value)!==String(value??''))control.value=value??'';
        bindProductControlV7(control,field);
      }
    }
    row.appendChild(cell);
  });
  row.querySelectorAll('td[data-product-field-v7]').forEach(cell=>{if(!fields.some(field=>field.id===cell.dataset.productFieldV7))cell.remove()});
}
function ensureProductHeaderV7(){
  const table=document.querySelector('#productsFormSection .products-table');if(!table)return;
  const row=table.querySelector('thead tr');if(!row)return;
  const existing={number:'productsColNumber',description:'productsColDescription',quantity:'productsColQuantity',unitValue:'productsColUnitValue',ncm:'productsColNcm',total:'productsColTotal'};
  Object.entries(existing).forEach(([id,headerId])=>{const th=document.getElementById(headerId);if(th)th.dataset.productFieldV7=id});
  const oldActions=row.children[6];if(oldActions&&!oldActions.dataset.productFieldV7)oldActions.dataset.productFieldV7='actions';
  const fields=sortedProductFieldsV7();
  fields.forEach(field=>{
    let th=row.querySelector(\`th[data-product-field-v7="\${CSS.escape(field.id)}"]\`);
    if(!th){th=document.createElement('th');th.dataset.productFieldV7=field.id}
    th.textContent=field.label;th.title=field.label;th.style.display=productFieldActiveV7(field)?'':'none';th.style.width=field.width+'px';th.style.minWidth=field.width+'px';
    if(field.id==='total')th.style.textAlign='right';else th.style.textAlign='left';
    row.appendChild(th);
  });
  row.querySelectorAll('th[data-product-field-v7]').forEach(th=>{if(!fields.some(field=>field.id===th.dataset.productFieldV7))th.remove()});
  const activeWidth=fields.filter(productFieldActiveV7).reduce((sum,field)=>sum+field.width,0);
  table.style.minWidth=Math.max(520,activeWidth)+'px';
}
function syncProductTableV7(){
  ensureProductFieldsV7(formEditorConfig);ensureProductHeaderV7();
  document.querySelectorAll('#productsBody tr').forEach(row=>ensureProductRowV7(row));
}
function syncLegacyProductSettingsV7(){
  const cfg=productsConfigV5();const map={number:'numberLabel',description:'descriptionLabel',quantity:'quantityLabel',unitValue:'unitValueLabel',ncm:'ncmLabel',total:'totalLabel'};
  Object.entries(map).forEach(([id,key])=>{const field=productFieldV7(id);if(field)cfg[key]=field.label});
  const uiMap={number:'productsNumberColumn',description:'productsDescriptionColumn',quantity:'productsQuantityColumn',unitValue:'productsUnitValueColumn',ncm:'productsNcmColumn',total:'productsTotalColumn',actions:'productsDeleteColumn'};
  Object.entries(uiMap).forEach(([id,key])=>{const field=productFieldV7(id);const ui=uiConfigV6(key);if(field&&ui){ui.text=field.label;ui.visible=field.visible;ui.deleted=field.deleted}});
}

const loadFormEditorConfigBaseV7=loadFormEditorConfig;
loadFormEditorConfig=function(){
  const config=loadFormEditorConfigBaseV7();
  try{const raw=JSON.parse(localStorage.getItem(FORM_EDITOR_STORAGE_KEY)||'null');if(Array.isArray(raw?.productTableFields))config.productTableFields=raw.productTableFields}catch(error){}
  return ensureProductFieldsV7(config);
};
const applyFormEditorConfigBaseV7=applyFormEditorConfig;
applyFormEditorConfig=function(){ensureProductFieldsV7(formEditorConfig);syncLegacyProductSettingsV7();applyFormEditorConfigBaseV7();syncProductTableV7()};
applyProductColumnsV6=function(){syncProductTableV7()};
const uiEditorItemsBaseV7=uiEditorItemsV6;
uiEditorItemsV6=function(){return uiEditorItemsBaseV7().filter(item=>!PRODUCT_COLUMN_KEYS_V6.includes(item.key))};

const addProductRowBaseV7=addProductRow;
addProductRow=function(data={}){
  addProductRowBaseV7(data);
  const rows=[...document.querySelectorAll('#productsBody tr')];
  const row=(data?.id&&rows.find(item=>item.dataset.productId===String(data.id)))||rows[rows.length-1];
  ensureProductHeaderV7();ensureProductRowV7(row,data);updateProductsSummary();
};
updateProductsSummary=function(){
  let total=0;const qtyActive=productFieldActiveV7(productFieldV7('quantity'));const valueActive=productFieldActiveV7(productFieldV7('unitValue'));
  document.querySelectorAll('#productsBody tr').forEach((row,index)=>{
    const numberCell=row.querySelector('td[data-product-field-v7="number"]');if(numberCell)numberCell.textContent=index+1;
    const quantity=qtyActive?Number(row.querySelector('[data-product-control-v7="quantity"]')?.value||0):1;
    const unitValue=valueActive?Number(row.querySelector('[data-product-control-v7="unitValue"]')?.value||0):0;
    const rowTotal=quantity*unitValue;const totalCell=row.querySelector('td[data-product-field-v7="total"]');if(totalCell)totalCell.textContent=formatMoney(rowTotal);total+=rowTotal;
  });
  const count=document.getElementById('productsCount');if(count)count.textContent=document.querySelectorAll('#productsBody tr').length;
  const grand=document.getElementById('productsGrandTotal');if(grand)grand.textContent=formatMoney(total);
};
collectProducts=function(){
  const fields=sortedProductFieldsV7();
  return [...document.querySelectorAll('#productsBody tr')].map(row=>{
    const customFields={};
    fields.filter(field=>!field.builtin&&productFieldActiveV7(field)).forEach(field=>{customFields[field.id]=productControlValueV7(row,field)});
    return {
      id:row.dataset.productId,
      description:productFieldActiveV7(productFieldV7('description'))?productControlValueV7(row,productFieldV7('description')).trim():'Item cadastrado',
      quantity:productFieldActiveV7(productFieldV7('quantity'))?Number(productControlValueV7(row,productFieldV7('quantity'))||0):1,
      unitValue:productFieldActiveV7(productFieldV7('unitValue'))?Number(productControlValueV7(row,productFieldV7('unitValue'))||0):0,
      ncm:productFieldActiveV7(productFieldV7('ncm'))?productControlValueV7(row,productFieldV7('ncm')).trim():'',
      customFields
    };
  });
};
validateProducts=function(products){
  if(!isProductsSectionActiveV5())return true;
  const required=sortedProductFieldsV7().filter(field=>productFieldActiveV7(field)&&field.required&&!['index','calculated','action'].includes(field.type));
  for(let i=0;i<products.length;i++){
    const product=products[i];
    for(const field of required){
      const raw=field.id==='description'?product.description:field.id==='quantity'?product.quantity:field.id==='unitValue'?product.unitValue:field.id==='ncm'?product.ncm:product.customFields?.[field.id];
      const empty=raw===undefined||raw===null||String(raw).trim()==='';
      if(empty||(field.type==='number'&&!(Number(raw)>0))||(field.type==='currency'&&Number(raw)<0)||(field.ncmRule&&!/^\\d{8}$/.test(String(raw)))){
        showToast(\`Revise o item \${i+1}: preencha corretamente “\${field.label}”.\`);return false;
      }
    }
  }
  return true;
};

function ensureProductsEditorPanelV7(){
  const panel=document.getElementById('productsEditorPanelV5');if(!panel||document.getElementById('productFieldsEditorV7'))return;
  const block=document.createElement('section');block.id='productFieldsEditorV7';block.className='product-fields-editor-v7';
  block.innerHTML=\`
    <div class="product-fields-head-v7"><div><strong>Campos da tabela que será preenchida</strong><span>Edite, crie, exclua, oculte e arraste as colunas para definir exatamente como a tabela aparecerá no formulário.</span></div><button type="button" class="btn btn-soft btn-small" id="addProductFieldV7">+ Nova coluna</button></div>
    <div class="product-fields-layout-v7">
      <div class="product-fields-list-v7" id="productFieldsListV7"></div>
      <div class="product-field-form-v7" id="productFieldFormV7">
        <div class="product-field-form-head-v7"><div><small>COLUNA SELECIONADA</small><strong id="productFieldFormTitleV7">Selecione uma coluna</strong></div><span id="productFieldSystemBadgeV7">Editável</span></div>
        <div class="product-field-grid-v7">
          <div class="field full"><label for="productFieldLabelV7">Nome da coluna</label><input id="productFieldLabelV7"></div>
          <div class="field"><label for="productFieldTypeV7">Tipo de resposta</label><select id="productFieldTypeV7"><option value="text">Texto curto</option><option value="textarea">Texto longo</option><option value="number">Número</option><option value="currency">Valor monetário</option><option value="email">E-mail</option><option value="date">Data</option><option value="select">Lista suspensa</option></select></div>
          <div class="field"><label for="productFieldWidthV7">Largura da coluna (px)</label><input id="productFieldWidthV7" type="number" min="80" max="520" step="10"></div>
          <div class="field full"><label for="productFieldPlaceholderV7">Texto de exemplo</label><input id="productFieldPlaceholderV7"></div>
          <div class="field full hidden" id="productFieldOptionsWrapV7"><label for="productFieldOptionsV7">Opções da lista</label><textarea id="productFieldOptionsV7" placeholder="Uma opção por linha"></textarea></div>
          <label class="editor-toggle"><input id="productFieldRequiredV7" type="checkbox"><span><b>Resposta obrigatória</b><small>Exige preenchimento antes de salvar.</small></span></label>
          <label class="editor-toggle"><input id="productFieldVisibleV7" type="checkbox"><span><b>Exibir no formulário</b><small>Oculta sem excluir a configuração.</small></span></label>
        </div>
        <div class="product-field-actions-v7"><button type="button" class="btn btn-secondary btn-small" id="productFieldUpV7">Subir</button><button type="button" class="btn btn-secondary btn-small" id="productFieldDownV7">Descer</button><button type="button" class="btn btn-secondary btn-small" id="productFieldRestoreV7">Restaurar</button><button type="button" class="btn btn-danger btn-small" id="productFieldDeleteV7">Excluir</button><button type="button" class="btn btn-primary btn-small" id="productFieldSaveV7">Salvar coluna</button></div>
      </div>
    </div>\`;
  const preview=panel.querySelector('.products-editor-preview-v5');if(preview)panel.insertBefore(block,preview);else panel.appendChild(block);
  block.querySelector('#addProductFieldV7')?.addEventListener('click',addProductFieldV7);
  block.querySelector('#productFieldSaveV7')?.addEventListener('click',saveProductFieldV7);
  block.querySelector('#productFieldDeleteV7')?.addEventListener('click',deleteProductFieldV7);
  block.querySelector('#productFieldRestoreV7')?.addEventListener('click',restoreProductFieldV7);
  block.querySelector('#productFieldUpV7')?.addEventListener('click',()=>moveProductFieldV7(selectedProductFieldIdV7,-1));
  block.querySelector('#productFieldDownV7')?.addEventListener('click',()=>moveProductFieldV7(selectedProductFieldIdV7,1));
  block.querySelector('#productFieldTypeV7')?.addEventListener('change',toggleProductFieldOptionsV7);
  ['productsEditorDescriptionV5','productsEditorQuantityV5','productsEditorUnitValueV5','productsEditorNcmV5','productsEditorTotalV5'].forEach(id=>{const el=document.getElementById(id);const field=el?.closest('.field');if(field)field.classList.add('legacy-product-column-editor-v7')});
}
function toggleProductFieldOptionsV7(){document.getElementById('productFieldOptionsWrapV7')?.classList.toggle('hidden',document.getElementById('productFieldTypeV7')?.value!=='select')}
function renderProductFieldsEditorV7(){
  ensureProductsEditorPanelV7();ensureProductFieldsV7(formEditorConfig);
  const list=document.getElementById('productFieldsListV7');if(!list)return;
  const fields=sortedProductFieldsV7();if(!productFieldV7(selectedProductFieldIdV7))selectedProductFieldIdV7=fields[0]?.id||'';
  list.innerHTML=fields.map((field,index)=>\`<article class="product-field-item-v7 \${field.id===selectedProductFieldIdV7?'active':''} \${field.deleted?'deleted':''}" draggable="true" data-product-field-item-v7="\${escapeHtml(field.id)}"><span class="product-field-drag-v7" title="Arraste para mudar a posição">⋮⋮</span><span class="product-field-copy-v7"><b>\${escapeHtml(field.label)}</b><span><i>\${escapeHtml(field.type==='currency'?'valor':field.type)}</i>\${field.required?'<i class="required">Obrigatória</i>':''}\${field.deleted?'<i class="hidden-field">Excluída</i>':field.visible===false?'<i class="hidden-field">Oculta</i>':''}</span></span><span class="product-field-order-v7">\${index+1}</span><span class="product-field-quick-v7"><button type="button" data-product-field-edit-v7="\${escapeHtml(field.id)}">Editar</button><button type="button" data-product-field-hide-v7="\${escapeHtml(field.id)}">\${field.visible===false||field.deleted?'Exibir':'Ocultar'}</button><button type="button" class="danger" data-product-field-delete-v7="\${escapeHtml(field.id)}">\${field.deleted?'Restaurar':'Excluir'}</button></span></article>\`).join('');
  list.querySelectorAll('[data-product-field-edit-v7]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();selectedProductFieldIdV7=button.dataset.productFieldEditV7;renderProductFieldsEditorV7()}));
  list.querySelectorAll('[data-product-field-hide-v7]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();toggleProductFieldV7(button.dataset.productFieldHideV7)}));
  list.querySelectorAll('[data-product-field-delete-v7]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();selectedProductFieldIdV7=button.dataset.productFieldDeleteV7;const field=productFieldV7(selectedProductFieldIdV7);field?.deleted?restoreProductFieldV7():deleteProductFieldV7()}));
  list.querySelectorAll('[data-product-field-item-v7]').forEach(item=>{
    item.addEventListener('click',event=>{if(event.target.closest('button'))return;selectedProductFieldIdV7=item.dataset.productFieldItemV7;renderProductFieldsEditorV7()});
    item.addEventListener('dragstart',event=>{draggedProductFieldIdV7=item.dataset.productFieldItemV7;item.classList.add('dragging');event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',draggedProductFieldIdV7)});
    item.addEventListener('dragend',()=>{item.classList.remove('dragging');list.querySelectorAll('.drag-target').forEach(el=>el.classList.remove('drag-target'));draggedProductFieldIdV7=''});
    item.addEventListener('dragover',event=>{event.preventDefault();if(item.dataset.productFieldItemV7!==draggedProductFieldIdV7)item.classList.add('drag-target')});
    item.addEventListener('dragleave',()=>item.classList.remove('drag-target'));
    item.addEventListener('drop',event=>{event.preventDefault();item.classList.remove('drag-target');reorderProductFieldV7(draggedProductFieldIdV7,item.dataset.productFieldItemV7,event.clientY>item.getBoundingClientRect().top+item.offsetHeight/2)});
  });
  fillProductFieldFormV7();
}
function fillProductFieldFormV7(){
  const field=productFieldV7(selectedProductFieldIdV7);if(!field)return;
  document.getElementById('productFieldFormTitleV7').textContent=field.label;
  document.getElementById('productFieldSystemBadgeV7').textContent=field.builtin?'Campo padrão':'Campo personalizado';
  document.getElementById('productFieldLabelV7').value=field.label;
  const type=document.getElementById('productFieldTypeV7');type.value=PRODUCT_FIELD_TYPES_V7.includes(field.type)?field.type:'text';type.disabled=!!field.lockedType;
  document.getElementById('productFieldWidthV7').value=field.width;
  document.getElementById('productFieldPlaceholderV7').value=field.placeholder||'';
  document.getElementById('productFieldOptionsV7').value=(field.options||[]).join('\\n');
  document.getElementById('productFieldRequiredV7').checked=!!field.required;document.getElementById('productFieldRequiredV7').disabled=!!field.lockedType;
  document.getElementById('productFieldVisibleV7').checked=field.visible!==false&&!field.deleted;
  document.getElementById('productFieldDeleteV7').disabled=!!field.deleted;
  toggleProductFieldOptionsV7();
}
function normalizeProductFieldOrdersV7(){sortedProductFieldsV7().forEach((field,index)=>field.order=(index+1)*10)}
function persistProductFieldsV7(message){normalizeProductFieldOrdersV7();syncLegacyProductSettingsV7();saveFormEditorConfig();applyFormEditorConfig();renderProductFieldsEditorV7();if(message)showToast(message)}
function saveProductFieldV7(){
  const field=productFieldV7(selectedProductFieldIdV7);if(!field)return;
  const label=String(document.getElementById('productFieldLabelV7')?.value||'').trim();if(!label){showToast('Informe o nome da coluna.');return}
  field.label=label;if(!field.lockedType)field.type=document.getElementById('productFieldTypeV7').value;
  field.width=Math.max(80,Math.min(520,Number(document.getElementById('productFieldWidthV7').value)||150));
  field.placeholder=String(document.getElementById('productFieldPlaceholderV7').value||'').trim();
  field.options=String(document.getElementById('productFieldOptionsV7').value||'').split(/\\r?\\n/).map(item=>item.trim()).filter((item,index,array)=>item&&array.indexOf(item)===index);
  field.required=!field.lockedType&&!!document.getElementById('productFieldRequiredV7').checked;field.visible=!!document.getElementById('productFieldVisibleV7').checked;field.deleted=false;
  persistProductFieldsV7('Coluna atualizada no formulário.');
}
function addProductFieldV7(){
  const id=PRODUCT_FIELD_PREFIX_V7+Date.now().toString(36);productFieldsV7().push(normalizeProductFieldV7({id,label:'Nova coluna',type:'text',placeholder:'',required:false,visible:true,deleted:false,order:(sortedProductFieldsV7().length+1)*10,width:160,builtin:false},productFieldsV7().length));selectedProductFieldIdV7=id;persistProductFieldsV7('Nova coluna criada. Edite as configurações e salve.');
}
function toggleProductFieldV7(id){const field=productFieldV7(id);if(!field)return;if(field.deleted)field.deleted=false;field.visible=field.visible===false;selectedProductFieldIdV7=id;persistProductFieldsV7(field.visible?'Coluna exibida.':'Coluna ocultada.')}
function deleteProductFieldV7(){const field=productFieldV7(selectedProductFieldIdV7);if(!field)return;if(!confirm(\`Excluir a coluna “\${field.label}” da tabela? Ela poderá ser restaurada pelo editor.\`))return;field.deleted=true;field.visible=false;persistProductFieldsV7('Coluna excluída da tabela.')}
function restoreProductFieldV7(){
  const field=productFieldV7(selectedProductFieldIdV7);if(!field)return;const standard=DEFAULT_PRODUCT_FIELDS_V7.find(item=>item.id===field.id);
  if(standard){const order=field.order;Object.assign(field,cloneProductFieldV7(standard),{order})}else{field.deleted=false;field.visible=true}
  persistProductFieldsV7('Coluna restaurada.');
}
function moveProductFieldV7(id,delta){const fields=sortedProductFieldsV7();const index=fields.findIndex(field=>field.id===id);const target=index+delta;if(index<0||target<0||target>=fields.length)return;[fields[index].order,fields[target].order]=[fields[target].order,fields[index].order];selectedProductFieldIdV7=id;persistProductFieldsV7('Posição da coluna atualizada.')}
function reorderProductFieldV7(sourceId,targetId,after=false){if(!sourceId||!targetId||sourceId===targetId)return;const fields=sortedProductFieldsV7();const source=fields.find(field=>field.id===sourceId);if(!source)return;const remaining=fields.filter(field=>field.id!==sourceId);let index=remaining.findIndex(field=>field.id===targetId);if(index<0)return;if(after)index++;remaining.splice(index,0,source);remaining.forEach((field,i)=>field.order=(i+1)*10);selectedProductFieldIdV7=sourceId;persistProductFieldsV7('Coluna reposicionada por arraste.')}

const ensureProductsEditorPanelBaseV7=ensureProductsEditorPanelV5;
ensureProductsEditorPanelV5=function(){ensureProductsEditorPanelBaseV7();ensureProductsEditorPanelV7()};
const fillProductsEditorBaseV7=fillProductsEditorV5;
fillProductsEditorV5=function(){fillProductsEditorBaseV7();ensureProductsEditorPanelV7();renderProductFieldsEditorV7()};
const saveProductsEditorBaseV7=saveProductsEditorV5;
saveProductsEditorV5=function(){syncLegacyProductSettingsV7();saveProductsEditorBaseV7();ensureProductFieldsV7(formEditorConfig)};
restoreProductsEditorV5=function(){
  if(!confirm('Restaurar a seção Produtos e todos os campos da tabela para a configuração padrão?'))return;
  formEditorConfig.productsSection={...DEFAULT_PRODUCTS_CONFIG_V5};
  formEditorConfig.productTableFields=DEFAULT_PRODUCT_FIELDS_V7.map(cloneProductFieldV7);
  const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);
  if(section){section.title=DEFAULT_PRODUCTS_CONFIG_V5.title;section.visible=true;section.deleted=false;section.order=60}
  selectedProductFieldIdV7='description';
  syncLegacyProductSettingsV7();saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Seção Produtos e campos da tabela restaurados.');
};



/* V8: formulário específico para Cadastro de Itens */
const CADASTRO_ITENS_TEMPLATE_V8='cadastro-itens-formulario-especifico-2026-07-29';
const ITEM_GROUP_OPTIONS_V8=Object.freeze([
  'ACABAMENTOS - GRAMA/INTERTRAVADOS/ETC',
  'AÇO E TELAS ELETROSOLDADAS',
  'ADIANTAMENTOS',
  'ADITIVOS',
  'AGLOMERANTES E CIMENTÍCEOS',
  'AGREGADOS',
  'ÁGUA E ESGOTO',
  'ÁGUA MINERAL',
  'ÁGUA/GÁS',
  'AJUSTE_CONTABIL',
  'ANDAIME',
  'ASFALTOS/EMULSÕES ASFÁLTICAS',
  'ASSINATURAS/ LICENÇAS',
  'ASSOCIAÇÃO DE CLASSE',
  'ASSOCIAÇÕES E ENTIDADE',
  'BARREIRAS DINÂMICAS',
  'BENTONITA E QUÍMICA DE FLUIDOS',
  'BIDIM',
  'BOMBAS',
  'BRINDES',
  'CAIXINHA DE OBRA',
  'CARTÓRIO',
  'CHAPAS E PERFIS',
  'COMBUSTÍVEIS',
  'COMODATO',
  'COMPRESSOR',
  'CONDOMÍNIO',
  'CONTA DE LUZ',
  'CONTA DE TELEFONE/INTERNET',
  'CORDOALHAS',
  'CORREIOS',
  'DESPESA FUNERAL',
  'DESPESAS COM CONFRATERNIZAÇÃO',
  'DIÁRIA HOTEL',
  'DOAÇÃO',
  'EPC - EQUIPAMENTOS DE PROTEÇÃO COLETIVA',
  'EPI - EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL',
  'EPI DE ALPINISTA',
  'EQUIPAMENTOS LEVES - MANUAIS',
  'EQUIPAMENTOS PESADOS',
  'EQUIPAMENTOS SEEL',
  'ESTRUTURA METÁLICA',
  'ESTRUTURAS DE ACABAMENTO (EX.: GUARDA-CORPO)',
  'EVENTOS',
  'EXAMES/DESPESAS MÉDICAS',
  'FERRAMENTAS E UTENSÍLIOS DE PERFURAÇÃO',
  'FERRAMENTAS ELÉTRICAS',
  'FERRAMENTAS MANUAIS',
  'FILTROS',
  'FOLHA - SALÁRIOS E ORDENADOS',
  'FRETES E CARRETOS',
  'GABIÃO',
  'GEOMANTAS/GEOMEMBRANAS',
  'GERADOR',
  'GYMPASS',
  'I.O.F.',
  'IMOBILIZADO',
  'IMPERMEABILIZANTES',
  'IMPOSTOS E TAXAS',
  'INCENTIVO FISCAL',
  'ITEM RM',
  'Itens',
  'JUROS S/ ANTECIPAÇÃO DE RECEBÍVEIS',
  'LANCHES E REFEIÇÕES EVENTUAIS',
  'LOCAÇÃO DE ANDAIMES E FORMAS',
  'LOCAÇÃO DE BANHEIRO QUÍMICO',
  'LOCAÇÃO DE CONTAINER',
  'LOCAÇÃO DE EQUIPAMENTO COM MÃO-DE-OBRA',
  'LOCAÇÃO DE EQUIPAMENTOS - SEEL',
  'LOCAÇÃO DE EQUIPAMENTOS - TERCEIROS',
  'LOCAÇÃO DE FERRAMENTAS',
  'LOCAÇÃO DE IMÓVEIS - ALOJAMENTO/CONDOMÍNIO',
  'LOCAÇÃO DE IMÓVEIS - ESCRITÓRIO/CANTEIRO',
  'LOCAÇÃO DE MÓVEIS',
  'LOCAÇÃO DE TRANSPORTE DE PASSAGEIROS INCLUINDO MOTORISTA',
  'LOCAÇÃO DE UTENSÍLIOS - SEEL',
  'LOCAÇÃO DE UTENSÍLIOS - TERCEIROS',
  'LOCAÇÃO DE VEÍCULOS LEVES',
  'LOCAÇÃO DE VEÍCULOS PESADOS (CAMINHÕES/CARRETAS/ETC)',
  'LOCAÇÃO EM GERAL',
  'LOCAÇÃO MÁQUINAS E EQUIPAMENTOS',
  'LUBRIFICANTES E GRAXAS',
  'MACACO HIDRÁULICO',
  'MADEIRA',
  'MANGUEIRAS E CONEXÕES',
  'MANUTENÇÃO DE MÁQUINAS E EQUIPAMENTOS',
  'MANUTENÇÃO VEÍCULOS LEVES PREVENTIVA',
  'MANUTENÇÃO VEÍCULOS PESADOS PREVENTIVA',
  'MÁQUINAS E EQUIPAMENTOS',
  'MAT. ESP. - BARREIRAS DINÂMICAS / BUEIROS / GABIÃO',
  'MATERIAIS DE ESCRITORIO EM GERAL',
  'MATERIAIS DE SOLDA',
  'MATERIAIS HIDROMECÂNICOS',
  'MATERIAL - CONSUMO',
  'MATERIAL APLICAÇÃO',
  'MATERIAL DE ACABAMENTO PARA CONSTRUÇÃO',
  'MATERIAL DE CONSERVAÇÃO/MANUTENÇÃO DE VEÍCULOS',
  'MATERIAL DE ESCRITÓRIO',
  'MATERIAL DE LIMPEZA',
  'MATERIAL DE SINALIZAÇÃO PERMANENTE',
  'MATERIAL DE USO E CONSUMO',
  'MATERIAL ELÉTRICO',
  'MATERIAL IMPRESSO',
  'MATERIAL PARA PERFURAÇÃO',
  'MISTURADOR',
  'MOTORES',
  'MÓVEIS,UTENSÍLIOS E ELETRODOMÉSTICOS',
  'MULTAS E INFRAÇÕES VEÍCULOS',
  'MULTAS E JUROS',
  'OUTROS SERVIÇOS',
  'PASSAGENS AÉREAS',
  'PASSAGENS TERRESTRES',
  'PEÇAS E ACESSÓRIOS',
  'PEÇAS PARA MANUTENÇÃO DE VEÍCULOS',
  'PEÇAS PARA MANUTENÇÃO MAQUINAS/EQUIPAMENTOS LEVES',
  'PEÇAS PARA MANUTENÇÃO MAQUINAS/EQUIPAMENTOS PESADOS',
  'PEDÁGIO/ESTACIONAMENTO/TAXI',
  'PERDAS',
  'PINTURA (TINTAS',
  'PLANOS DE SAÚDE/ODONTOLÓGICO',
  'PREGOS E PARAFUSOS',
  'PRÉ-MOLDADO - DRENAGEM (CANALETAS',
  'PRÉ-MOLDADO - OUTROS (ESTACAS',
  'PRESTAÇÃO DE SERVIÇO AUTONOMOS / PF',
  'PRODUÇÃO DE CONTEÚDO',
  'PROPAGANDAS / PUBLICAÇÕES',
  'PUBLICIDADE E PROPAGANDA',
  'RESSARCIMENTO A TERCEIROS',
  'REVESTIMENTO/ACABAMENTOS/BLOCOS/TIJOLOS',
  'SAÚDE E SEGURANÇA (E',
  'SEGURO DE VIDA',
  'SEGURO GARANTIA',
  'SEGURO GARANTIA DE EXECUÇÃO',
  'SEGURO GARANTIA DE MANUTENÇÃO',
  'SEGURO RC E RE',
  'SEGURO RC GERAL',
  'SEGURO RC PROFISSIONAL',
  'SEGURO RE',
  'SEGUROS GERAIS',
  'SERVIÇO DE SAÚDE',
  'SERVIÇO MANUTENÇÃO MAQUINAS E EQUIPAMENTOS CORRETIVA',
  'SERVIÇOS',
  'SERVIÇOS DE AUDITORIA',
  'SERVIÇOS DE CONSERVAÇÃO/REFORMA/REPARO',
  'SERVIÇOS DE CONSTRUÇÃO',
  'SERVIÇOS DE CONSULTORIA E PROJETOS',
  'SERVIÇOS DE CONTROLE TECNOLÓGICO',
  'SERVIÇOS DE DESCARTE DE RESÍDUOS',
  'SERVIÇOS DE DESMONTE E DEMOLIÇÃO',
  'SERVIÇOS DE DRAGAGEM',
  'SERVIÇOS DE ESCRITÓRIO / ADMINISTRATIVOS',
  'SERVIÇOS DE FÔRMA/ARMAÇÃO',
  'SERVIÇOS DE HIDROSSEMEADURA E REFLORESTAMENTO',
  'SERVIÇOS DE INSPEÇÃO',
  'SERVIÇOS DE INSTALAÇÕES HIDROSSANITÁRIAS',
  'SERVIÇOS DE LIMPEZA/MANUTENÇÃO',
  'SERVIÇOS DE MÃO-DE-OBRA',
  'SERVIÇOS DE REVESTIMENTO',
  'SERVIÇOS DE SEGURANÇA/VIGILÂNCIA',
  'SERVIÇOS DE SUPRESSÃO VEGETAL E JARDINAGEM',
  'SERVIÇOS DE TOPOGRAFIA',
  'SERVIÇOS INFORMÁTICA INFRAESTRUTURA DE REDE',
  'SERVIÇOS JURÍDICOS E CONTÁBEIS',
  'SERVIÇOS PORTUÁRIOS / MARÍTIMOS',
  'SUPRIMENTOS INFORMÁTICA',
  'TAXAS (IPVA',
  'TELAS DE ALTA RESISTÊNCIA',
  'TELHAS/ASSOALHOS',
  'TIRANTE E ACESSÓRIOS',
  'TREINAMENTOS',
  'TUBOS E CONEXÕES - HIDRÁULICOS',
  'UNIFORMES',
  'VALE ALIMENTAÇÃO',
  'VALE TRANSPORTE / COMBUSTÍVEL (IDA E VOLTA DO TRABALHO)',
  'VEICULOS PESADOS'
]);

const defaultFormFieldDefinitionsBaseV8=defaultFormFieldDefinitions;
defaultFormFieldDefinitions=function(){
  return defaultFormFieldDefinitionsBaseV8().map((field,index)=>{
    const next={...field};
    if(next.id==='requesterName'){next.section='1. Dados do solicitante';next.order=10;}
    if(next.id==='requesterEmail'){next.section='1. Dados do solicitante';next.label='E-mail do solicitante';next.order=20;}
    if(next.id==='issuerDepartment'){
      next.section='1. Dados do solicitante';next.label='Obra / Departamento do emitente';next.help='Selecione a obra ou departamento responsável pela solicitação.';next.order=30;next.width='full';next.required=true;next.visible=true;next.deleted=false;
    }
    if(['issuerCnpj','recipientCnpj','recipientDepartment','recipientAddress','freightResponsible','carrierName','carrierCnpj'].includes(next.id)){
      next.required=false;next.visible=false;next.deleted=true;next.order=500+index*10;
    }
    return next;
  });
};

function sectionInConfigV8(config,title){
  const key=normalizeSectionKeyV3(title);
  return (config.sections||[]).find(section=>normalizeSectionKeyV3(section.title)===key)||null;
}
function setSectionStateV8(config,title,changes={}){
  let section=sectionInConfigV8(config,title);
  if(!section){section={id:sectionIdV3(title),title,visible:true,deleted:false,order:(config.sections?.length||0)*10+10,system:true};config.sections.push(section);}
  Object.assign(section,changes);return section;
}
function configureProductFieldsV8(config,{resetOptions=false}={}){
  ensureProductFieldsV7(config);
  const fields=config.productTableFields;
  const byId=id=>fields.find(field=>field.id===id);
  const number=byId('number');if(number)Object.assign(number,{label:'#',visible:true,deleted:false,order:10,width:42});
  const description=byId('description');if(description)Object.assign(description,{label:'Descrição do item',type:'text',placeholder:'Informe a descrição do item',required:true,visible:true,deleted:false,order:20,width:170});
  const ncm=byId('ncm');if(ncm)Object.assign(ncm,{label:'NCM',type:'text',placeholder:'8 dígitos',required:true,visible:true,deleted:false,order:30,width:105,ncmRule:true});
  ['quantity','unitValue','total'].forEach(id=>{const field=byId(id);if(field)Object.assign(field,{required:false,visible:false,deleted:true,order:800+(id==='quantity'?10:id==='unitValue'?20:30)});});
  let group=byId('itemGroup');
  if(!group){
    group=normalizeProductFieldV7({id:'itemGroup',label:'Grupo de itens',type:'select',placeholder:'Selecione o grupo de itens',required:true,visible:true,deleted:false,order:40,width:175,builtin:false,options:[...ITEM_GROUP_OPTIONS_V8]},fields.length);
    fields.push(group);
  }else{
    Object.assign(group,{label:'Grupo de itens',type:'select',placeholder:'Selecione o grupo de itens',required:true,visible:true,deleted:false,order:40,width:175,builtin:false});
    if(resetOptions||!Array.isArray(group.options)||!group.options.length)group.options=[...ITEM_GROUP_OPTIONS_V8];
  }
  const actions=byId('actions');if(actions)Object.assign(actions,{label:'Ações',visible:true,deleted:false,order:50,width:52});
  fields.filter(field=>!['number','description','ncm','itemGroup','actions','quantity','unitValue','total'].includes(field.id)).forEach((field,index)=>{if(Number(field.order)<60)field.order=60+index*10;});
  config.productTableFields=fields;
}
function configureCadastroItensTemplateV8(config,{force=false}={}){
  if(!config||typeof config!=='object')return config;
  ensureSectionsV3(config);ensureProductsConfigV5(config);ensureUIElementsV6(config);ensureProductFieldsV7(config);
  if(!force&&config.cadastroItensTemplateVersion===CADASTRO_ITENS_TEMPLATE_V8)return config;
  const fields=config.fields||{};
  if(fields.requesterName)Object.assign(fields.requesterName,{section:'1. Dados do solicitante',order:10,visible:true,deleted:false});
  if(fields.requesterEmail)Object.assign(fields.requesterEmail,{section:'1. Dados do solicitante',label:'E-mail do solicitante',order:20,visible:true,deleted:false});
  if(fields.issuerDepartment)Object.assign(fields.issuerDepartment,{section:'1. Dados do solicitante',label:'Obra / Departamento do emitente',help:'Selecione a obra ou departamento responsável pela solicitação.',order:30,width:'full',required:true,visible:true,deleted:false});
  ['issuerCnpj','recipientCnpj','recipientDepartment','recipientAddress','freightResponsible','carrierName','carrierCnpj'].forEach(id=>{if(fields[id])Object.assign(fields[id],{required:false,visible:false,deleted:true});});

  setSectionStateV8(config,'Identificacao da solicitação',{visible:true,deleted:false,order:10,system:true});
  setSectionStateV8(config,'1. Dados do solicitante',{visible:true,deleted:false,order:20,system:true});
  ['2. Dados do emitente','3. Dados do destinatário','4. Responsavel pelo frete','4. Responsável pelo frete'].forEach(title=>{const section=sectionInConfigV8(config,title);if(section)Object.assign(section,{visible:false,deleted:true,order:700});});

  Object.assign(config.productsSection,{
    title:'Itens a serem cadastrados',
    help:'Inclua os itens que deverão ser cadastrados. Informe a descrição, o NCM e selecione o grupo de itens.',
    visible:true,deleted:false,
    numberLabel:'#',descriptionLabel:'Descrição do item',quantityLabel:'NCM',unitValueLabel:'',ncmLabel:'NCM',totalLabel:'',
    addButtonLabel:'+ Adicionar item',itemsSummaryLabel:'Itens',valueSummaryLabel:''
  });
  const productsSection=(config.sections||[]).find(section=>section.id===PRODUCTS_SECTION_ID_V5)||setSectionStateV8(config,'Itens a serem cadastrados',{});
  Object.assign(productsSection,{title:'Itens a serem cadastrados',visible:true,deleted:false,order:30,system:true});
  configureProductFieldsV8(config,{resetOptions:true});

  const ui=config.uiElements||{};
  if(ui.formSubtitle)Object.assign(ui.formSubtitle,{text:'Preencha os dados do solicitante, a obra ou departamento e os itens que deverão ser cadastrados. A solicitação entrará em “Não Iniciado”.',editText:'Atualize os dados da solicitação e os itens a serem cadastrados. A fase e os cronômetros serão preservados.',visible:true,deleted:false});
  if(ui.productsHelp)Object.assign(ui.productsHelp,{text:config.productsSection.help,visible:true,deleted:false});
  if(ui.addProduct)Object.assign(ui.addProduct,{text:'+ Adicionar item',visible:true,deleted:false});
  if(ui.removeProduct)Object.assign(ui.removeProduct,{text:'×',visible:true,deleted:false});
  if(ui.productsItemsSummary)Object.assign(ui.productsItemsSummary,{text:'Itens',visible:true,deleted:false});
  if(ui.productsValueSummary)Object.assign(ui.productsValueSummary,{text:'',visible:false,deleted:true});
  config.cadastroItensTemplateVersion=CADASTRO_ITENS_TEMPLATE_V8;
  return config;
}

const loadFormEditorConfigBaseV8=loadFormEditorConfig;
loadFormEditorConfig=function(){return configureCadastroItensTemplateV8(loadFormEditorConfigBaseV8())};

restoreProductsEditorV5=function(){
  if(!confirm('Restaurar a tabela “Itens a serem cadastrados” para a configuração padrão deste módulo?'))return;
  ensureProductsConfigV5(formEditorConfig);ensureProductFieldsV7(formEditorConfig);
  Object.assign(formEditorConfig.productsSection,{title:'Itens a serem cadastrados',help:'Inclua os itens que deverão ser cadastrados. Informe a descrição, o NCM e selecione o grupo de itens.',visible:true,deleted:false,addButtonLabel:'+ Adicionar item',itemsSummaryLabel:'Itens',valueSummaryLabel:''});
  configureProductFieldsV8(formEditorConfig,{resetOptions:true});
  const section=(formEditorConfig.sections||[]).find(item=>item.id===PRODUCTS_SECTION_ID_V5);if(section)Object.assign(section,{title:'Itens a serem cadastrados',visible:true,deleted:false,order:30});
  formEditorConfig.cadastroItensTemplateVersion=CADASTRO_ITENS_TEMPLATE_V8;
  selectedProductFieldIdV7='description';syncLegacyProductSettingsV7();saveFormEditorConfig();applyFormEditorConfig();renderFormEditor();showToast('Tabela de itens restaurada.');
};

function itemGroupValueV8(product){return String(product?.customFields?.itemGroup||'').trim()}
function activeProductFieldsForDisplayV8(){return sortedProductFieldsV7().filter(field=>productFieldActiveV7(field)&&!['index','action','calculated'].includes(field.type))}
function productFieldDisplayValueV8(product,field){
  if(field.id==='description')return product?.description||'';
  if(field.id==='ncm')return product?.ncm||'';
  if(field.id==='quantity')return product?.quantity??'';
  if(field.id==='unitValue')return product?.unitValue??'';
  return product?.customFields?.[field.id]??'';
}
function buildItemsTableV8(request){
  const fields=activeProductFieldsForDisplayV8();
  return \`<div class="detail-content table-scroll"><table class="detail-products"><thead><tr><th>#</th>\${fields.map(field=>\`<th>\${escapeHtml(field.label)}</th>\`).join('')}</tr></thead><tbody>\${(request.products||[]).map((product,index)=>\`<tr><td>\${index+1}</td>\${fields.map(field=>\`<td>\${escapeHtml(productFieldDisplayValueV8(product,field)||'-')}</td>\`).join('')}</tr>\`).join('')}</tbody></table></div>\`;
}

const cardHtmlBaseV8=cardHtml;
cardHtml=function(r){
  const meta=PHASE_META[r.status],st=slaStatus(r),terminal=r.status==='Cadastrado no Sistema';
  const groups=[...new Set((r.products||[]).map(itemGroupValueV8).filter(Boolean))];
  return \`<article class="nf-card status-\${meta.css} sla-\${st.cls}" draggable="true" data-id="\${r.id}">
    <div class="card-top"><div><div class="card-code">\${escapeHtml(r.code)}</div><div class="card-title">\${escapeHtml(r.requesterName)}</div></div><span class="status-chip \${meta.css}">\${escapeHtml(r.status)}</span></div>
    <div class="card-lines"><div class="card-line">\${icon('building')}<span><b>Obra / Departamento:</b> \${escapeHtml(r.issuerDepartment||'Não informado')}</span></div><div class="card-line">\${icon('box')}<span><b>Itens:</b> \${(r.products||[]).length}</span></div>\${groups.length?\`<div class="card-line">\${icon('tool')}<span><b>Grupos:</b> \${escapeHtml(groups.join(', '))}</span></div>\`:''}</div>
    <div class="card-route"><strong>\${(r.products||[]).length} item(ns)</strong> | \${escapeHtml(r.products?.[0]?.description||'Sem item')}\${(r.products||[]).length>1?\` +\${r.products.length-1}\`:''}</div>
    <div class="card-badges"><span class="mini-badge \${(r.priority||DEFAULT_PRIORITY).toLowerCase()}">\${escapeHtml(r.priority||DEFAULT_PRIORITY)}</span><span class="semaphore-badge \${st.cls}">\${semaphoreLabel(st)}</span>\${r.internalNote?'<span class="mini-badge">Com observação</span>':''}</div>
    <div class="deadline-row"><span>Prazo: <b>\${formatDate(r.deadline)}</b></span><strong>\${escapeHtml(st.label)}</strong></div>
    <div class="timer-panel"><div class="timer-row"><span>Na fase agora</span><strong data-live-timer="current" data-timer-id="\${r.id}">\${terminal?'Encerrado':formatDuration(getCurrentRunElapsed(r))}</strong></div><div class="timer-row"><span>Acumulado da fase</span><strong data-live-timer="phase" data-timer-id="\${r.id}">\${formatDuration(getPhaseElapsed(r,r.status))}</strong></div><div class="timer-row"><span>Tempo total</span><strong data-live-timer="total" data-timer-id="\${r.id}">\${formatDuration(getTotalElapsed(r))}</strong></div></div>
    <div class="card-actions"><div class="phase-control-label">Fase da solicitação</div><div class="phase-select-wrap"><select class="phase-select" aria-label="Selecionar fase da solicitação">\${PHASES.map(phase=>\`<option value="\${escapeHtml(phase)}" \${r.status===phase?'selected':''}>\${escapeHtml(phase)}</option>\`).join('')}</select></div><button class="detail-btn" data-action="detail">Ver detalhes</button></div>
  </article>\`;
};

renderBase=function(){
  const q=($('#globalSearch')?.value||'').trim().toLowerCase();
  const list=requests.filter(r=>!q||[r.code,r.requesterName,r.requesterEmail,r.issuerDepartment,...(r.products||[]).flatMap(p=>[p.description,p.ncm,itemGroupValueV8(p)])].join(' ').toLowerCase().includes(q));
  const table=document.querySelector('.data-table');const head=table?.querySelector('thead tr');
  if(head)head.innerHTML='<th>Código</th><th>Data</th><th>Solicitante</th><th>Obra / Departamento</th><th>Itens</th><th>Grupos de itens</th><th>Prioridade</th><th>Status</th><th>Data limite</th><th>Semáforo</th><th>Tempo total</th><th>Ações</th>';
  if(table)table.style.minWidth='1150px';
  $('#baseTableBody').innerHTML=list.length?list.map(r=>{const st=slaStatus(r);const groups=[...new Set((r.products||[]).map(itemGroupValueV8).filter(Boolean))];return \`<tr><td><strong>\${escapeHtml(r.code)}</strong></td><td>\${formatDate(r.createdAt)}</td><td>\${escapeHtml(r.requesterName)}<br><span style="font-size:9px">\${escapeHtml(r.requesterEmail)}</span></td><td>\${escapeHtml(r.issuerDepartment||'-')}</td><td><strong>\${(r.products||[]).length}</strong></td><td>\${escapeHtml(groups.join(', ')||'-')}</td><td><span class="mini-badge \${(r.priority||DEFAULT_PRIORITY).toLowerCase()}">\${escapeHtml(r.priority||DEFAULT_PRIORITY)}</span></td><td><span class="status-chip \${PHASE_META[r.status].css}">\${escapeHtml(r.status)}</span></td><td>\${formatDate(r.deadline)}</td><td><span class="semaphore-badge \${st.cls}">\${semaphoreLabel(st)}</span><br><span style="font-size:9px">\${escapeHtml(st.label)}</span></td><td>\${formatDuration(getTotalElapsed(r))}</td><td><div class="table-actions"><button class="detail-btn" data-base-action="detail" data-id="\${r.id}">Detalhes</button><button class="move-back" data-base-action="edit" data-id="\${r.id}">Editar</button><button class="btn-danger" data-base-action="delete" data-id="\${r.id}">Excluir</button></div></td></tr>\`}).join(''):'<tr><td colspan="12"><div class="empty">Nenhuma solicitação cadastrada.</div></td></tr>';
  $$('[data-base-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.baseAction,id=b.dataset.id;if(a==='detail')openDetail(id);if(a==='edit')editRequest(id);if(a==='delete')deleteRequest(id)}));
};

const openDetailBaseV8=openDetail;
openDetail=function(id){
  openDetailBaseV8(id);const r=requests.find(item=>item.id===id);if(!r)return;
  [...document.querySelectorAll('#detailBody .detail-kv')].forEach(card=>{if(card.querySelector('small')?.textContent.trim()==='Valor total')card.remove()});
  [...document.querySelectorAll('#detailBody .detail-section')].forEach(section=>{
    const title=section.querySelector('.detail-section-title')?.textContent.trim();
    if(title==='Solicitante e unidades')section.innerHTML=\`<div class="detail-section-title">Solicitante e obra / departamento</div><div class="detail-content"><div class="detail-grid" style="margin:0"><div class="detail-kv"><small>Solicitante</small><strong>\${escapeHtml(r.requesterName)}</strong></div><div class="detail-kv"><small>E-mail</small><strong>\${escapeHtml(r.requesterEmail)}</strong></div><div class="detail-kv"><small>Obra / Departamento</small><strong>\${escapeHtml(r.issuerDepartment||'-')}</strong></div></div></div>\`;
    if(title==='Frete')section.remove();
    if(title==='Produtos')section.innerHTML=\`<div class="detail-section-title">Itens a serem cadastrados</div>\${buildItemsTableV8(r)}\`;
  });
};

const renderDashboardBaseV8=renderDashboard;
renderDashboard=function(){
  renderDashboardBaseV8();
  document.querySelectorAll('#kpiGrid .kpi').forEach(card=>{const label=card.querySelector('small')?.textContent.trim();if(['Valor total solicitado','Ticket médio'].includes(label))card.style.display='none';if(label==='Total de produtos')card.querySelector('small').textContent='Total de itens';if(label==='Média de itens'){const span=card.querySelector('span');if(span)span.textContent='Itens por solicitação';}});
  document.querySelectorAll('#view-dashboard .chart-card').forEach(card=>{const title=card.querySelector('h3')?.textContent.trim();if(['Responsavel pelo frete','Volume por CNPJ emitente'].includes(title))card.style.display='none';});
};

function applyModuleVisibilityV8(){
  ['filterIssuer','filterRecipient','filterFreight','dashboardFilterFreight','dashboardFilterIssuer'].forEach(id=>document.getElementById(id)?.closest('div')?.classList.add('module-hidden-v8'));
  const subtitle=document.getElementById('formSubtitle');if(subtitle&&!document.getElementById('editId')?.value)subtitle.textContent='Preencha os dados do solicitante, a obra ou departamento e os itens que deverão ser cadastrados. A solicitação entrará em “Não Iniciado”.';
}
const resetFormBaseV8=resetForm;
resetForm=function(){resetFormBaseV8();applyFormEditorConfig();applyModuleVisibilityV8();const title=document.getElementById('formTitle');if(title)title.textContent='Nova solicitação de Cadastro de Itens';};
const cancelEditButtonV8=document.getElementById('cancelEdit');if(cancelEditButtonV8){cancelEditButtonV8.removeEventListener('click',resetFormBaseV8);cancelEditButtonV8.addEventListener('click',resetForm);}
const editRequestBaseV8=editRequest;
editRequest=function(id){editRequestBaseV8(id);applyFormEditorConfig();applyModuleVisibilityV8();const subtitle=document.getElementById('formSubtitle');if(subtitle)subtitle.textContent='Atualize os dados da solicitação e os itens a serem cadastrados. A fase e os cronômetros serão preservados.';};

const fillProductsEditorBaseV8=fillProductsEditorV5;
fillProductsEditorV5=function(){fillProductsEditorBaseV8();const intro=document.querySelector('#productsEditorPanelV5 .products-editor-intro strong');if(intro)intro.textContent='Configuração da seção de itens a serem cadastrados';const text=document.querySelector('#productsEditorPanelV5 .products-editor-intro span');if(text)text.textContent='Altere o título, orientações e todos os campos da tabela. O campo Grupo de itens possui uma lista suspensa totalmente editável abaixo.';};
const renderFormEditorBaseV8=renderFormEditor;
renderFormEditor=function(){renderFormEditorBaseV8();const special=document.querySelector('[data-products-editor-v5] .editor-question-item-main b');if(special)special.textContent='Tabela de itens a serem cadastrados';if(selectedEditorFieldId===PRODUCTS_EDITOR_ID_V5){const title=document.getElementById('editorQuestionTitle');if(title)title.textContent='Tabela de itens a serem cadastrados';}applyModuleVisibilityV8();};

const exportCsvBaseV8=exportCsv;
document.getElementById('exportCsv')?.removeEventListener('click',exportCsvBaseV8);document.getElementById('quickExport')?.removeEventListener('click',exportCsvBaseV8);
exportCsv=function(){
  const fields=activeProductFieldsForDisplayV8();
  const header=['Código','Data','Solicitante','E-mail','Obra / Departamento','Itens a serem cadastrados','Prioridade','SLA em dias úteis','Status','Data limite','Semáforo','Tempo total','Tempos por fase'];
  const rows=requests.map(r=>[r.code,formatDate(r.createdAt),r.requesterName,r.requesterEmail,r.issuerDepartment,(r.products||[]).map((product,index)=>\`\${index+1}. \`+fields.map(field=>\`\${field.label}: \${productFieldDisplayValueV8(product,field)||'-'}\`).join(' | ')).join(' ; '),r.priority||DEFAULT_PRIORITY,slaDaysFor(r.priority||DEFAULT_PRIORITY),r.status,formatDate(r.deadline),semaphoreLabel(slaStatus(r))+' - '+slaStatus(r).label,formatDuration(getTotalElapsed(r)),PHASES.map(phase=>phase+': '+formatDuration(getPhaseElapsed(r,phase))).join(' | ')]);
  downloadFile('\\ufeff'+[header,...rows].map(row=>row.map(csvCell).join(';')).join('\\n'),'solicitacoes_cadastro_de_itens.csv','text/csv;charset=utf-8');
};
document.getElementById('exportCsv')?.addEventListener('click',exportCsv);document.getElementById('quickExport')?.addEventListener('click',exportCsv);



/* V9: editor da tabela limitado aos tres campos do Cadastro de Itens */
const PRODUCT_EDITOR_ALLOWED_IDS_V9=['description','ncm','itemGroup'];
const PRODUCT_TABLE_INTERNAL_IDS_V9=new Set(['number','description','quantity','unitValue','ncm','total','itemGroup','actions']);
function restrictProductTableFieldsV9(config){
  if(!config||typeof config!=='object')return config;
  ensureProductFieldsV7(config);
  config.productTableFields=(config.productTableFields||[]).filter(field=>PRODUCT_TABLE_INTERNAL_IDS_V9.has(field.id));
  const byId=id=>config.productTableFields.find(field=>field.id===id);
  const number=byId('number');if(number)Object.assign(number,{label:'#',type:'index',visible:true,deleted:false,required:false,order:10,width:42,lockedType:true});
  const description=byId('description');if(description)Object.assign(description,{label:'Descri\\u00e7\\u00e3o do item',type:'text',placeholder:'Informe a descri\\u00e7\\u00e3o do item',required:true,visible:true,deleted:false,width:170,builtin:true});
  const quantity=byId('quantity');if(quantity)Object.assign(quantity,{required:false,visible:false,deleted:true,order:80});
  const unitValue=byId('unitValue');if(unitValue)Object.assign(unitValue,{required:false,visible:false,deleted:true,order:90});
  const total=byId('total');if(total)Object.assign(total,{required:false,visible:false,deleted:true,order:100});
  const ncm=byId('ncm');if(ncm)Object.assign(ncm,{label:'NCM',type:'text',placeholder:'8 d\\u00edgitos',required:true,visible:true,deleted:false,width:105,builtin:true,ncmRule:true});
  const group=byId('itemGroup');if(group)Object.assign(group,{label:'Grupo de itens',type:'select',placeholder:'Selecione o grupo de itens',required:true,visible:true,deleted:false,width:175,builtin:false});
  const actions=byId('actions');if(actions)Object.assign(actions,{label:'A\\u00e7\\u00f5es',type:'action',visible:true,deleted:false,required:false,order:50,width:52,lockedType:true});
  const ordered=PRODUCT_EDITOR_ALLOWED_IDS_V9.map(byId).filter(Boolean).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
  ordered.forEach((field,index)=>field.order=20+index*10);
  config.productTableFields=[number,...ordered,actions,quantity,unitValue,total].filter(Boolean);
  return config;
}
const configureProductFieldsBaseV9=configureProductFieldsV8;
configureProductFieldsV8=function(config,options={}){configureProductFieldsBaseV9(config,options);return restrictProductTableFieldsV9(config)};
const loadFormEditorConfigBaseV9=loadFormEditorConfig;
loadFormEditorConfig=function(){return restrictProductTableFieldsV9(loadFormEditorConfigBaseV9())};

const ensureProductsEditorPanelBaseV9=ensureProductsEditorPanelV7;
ensureProductsEditorPanelV7=function(){
  ensureProductsEditorPanelBaseV9();
  const add=document.getElementById('addProductFieldV7');if(add)add.style.display='none';
  const head=document.querySelector('#productFieldsEditorV7 .product-fields-head-v7 span');
  if(head)head.textContent='Edite somente os campos Descri\\u00e7\\u00e3o do item, NCM e Grupo de itens. Arraste para reorganizar ou use os bot\\u00f5es Subir e Descer.';
};
const renderProductFieldsEditorBaseV9=renderProductFieldsEditorV7;
renderProductFieldsEditorV7=function(){
  restrictProductTableFieldsV9(formEditorConfig);
  if(!PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(selectedProductFieldIdV7))selectedProductFieldIdV7='description';
  renderProductFieldsEditorBaseV9();
  const list=document.getElementById('productFieldsListV7');
  if(list){
    list.querySelectorAll('[data-product-field-item-v7]').forEach(item=>{if(!PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(item.dataset.productFieldItemV7))item.remove()});
    [...list.querySelectorAll('[data-product-field-item-v7]')].forEach((item,index)=>{const order=item.querySelector('.product-field-order-v7');if(order)order.textContent=String(index+1)});
  }
  const add=document.getElementById('addProductFieldV7');if(add)add.style.display='none';
  const preview=document.querySelector('#productsEditorPanelV5 .products-editor-preview-v5');if(preview)preview.style.display='none';
};
function reorderAllowedProductFieldsV9(sourceId,targetId,after=false){
  if(!PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(sourceId)||!PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(targetId)||sourceId===targetId)return;
  const ordered=PRODUCT_EDITOR_ALLOWED_IDS_V9.map(id=>productFieldV7(id)).filter(Boolean).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
  const source=ordered.find(field=>field.id===sourceId);const remaining=ordered.filter(field=>field.id!==sourceId);let index=remaining.findIndex(field=>field.id===targetId);if(!source||index<0)return;if(after)index++;remaining.splice(index,0,source);remaining.forEach((field,i)=>field.order=20+i*10);selectedProductFieldIdV7=sourceId;persistProductFieldsV7('Posi\\u00e7\\u00e3o da coluna atualizada.');
}
const moveProductFieldBaseV9=moveProductFieldV7;
moveProductFieldV7=function(id,delta){
  if(!PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(id)){moveProductFieldBaseV9(id,delta);return}
  const ordered=PRODUCT_EDITOR_ALLOWED_IDS_V9.map(key=>productFieldV7(key)).filter(Boolean).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
  const index=ordered.findIndex(field=>field.id===id);const target=index+delta;if(index<0||target<0||target>=ordered.length)return;[ordered[index],ordered[target]]=[ordered[target],ordered[index]];ordered.forEach((field,i)=>field.order=20+i*10);selectedProductFieldIdV7=id;persistProductFieldsV7('Posi\\u00e7\\u00e3o da coluna atualizada.');
};
const reorderProductFieldBaseV9=reorderProductFieldV7;
reorderProductFieldV7=function(sourceId,targetId,after=false){
  if(PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(sourceId)&&PRODUCT_EDITOR_ALLOWED_IDS_V9.includes(targetId)){reorderAllowedProductFieldsV9(sourceId,targetId,after);return}
  reorderProductFieldBaseV9(sourceId,targetId,after);
};
const restoreProductsEditorBaseV9=restoreProductsEditorV5;
restoreProductsEditorV5=function(){restoreProductsEditorBaseV9();restrictProductTableFieldsV9(formEditorConfig);syncLegacyProductSettingsV7();saveFormEditorConfig();applyFormEditorConfig();renderFormEditor()};



/* V10: Grupo de itens em lista suspensa e criacao de novas colunas */
const PRODUCT_EDITOR_CORE_IDS_V10=['description','ncm','itemGroup'];
const PRODUCT_EDITOR_HIDDEN_INTERNAL_IDS_V10=new Set(['number','quantity','unitValue','total','actions']);
function editableProductFieldV10(field){
  if(!field)return false;
  return PRODUCT_EDITOR_CORE_IDS_V10.includes(field.id)||(!field.builtin&&!PRODUCT_EDITOR_HIDDEN_INTERNAL_IDS_V10.has(field.id));
}
function normalizeEditableProductOrderV10(config){
  ensureProductFieldsV7(config);
  const fields=config.productTableFields||[];
  const byId=id=>fields.find(field=>field.id===id);
  const number=byId('number');if(number)Object.assign(number,{label:'#',type:'index',visible:true,deleted:false,required:false,order:10,width:42,lockedType:true,builtin:true});
  const description=byId('description');if(description)Object.assign(description,{label:'Descrição do item',type:'text',placeholder:'Informe a descrição do item',required:true,visible:true,deleted:false,width:170,builtin:true});
  const ncm=byId('ncm');if(ncm)Object.assign(ncm,{label:'NCM',type:'text',placeholder:'8 dígitos',required:true,visible:true,deleted:false,width:105,builtin:true,ncmRule:true});
  let group=byId('itemGroup');
  if(!group){
    group=normalizeProductFieldV7({id:'itemGroup',label:'Grupo de itens',type:'select',placeholder:'Selecione o grupo de itens',required:true,visible:true,deleted:false,order:40,width:190,builtin:false,lockedType:true,options:[...ITEM_GROUP_OPTIONS_V8]},fields.length);
    fields.push(group);
  }else{
    Object.assign(group,{label:'Grupo de itens',type:'select',placeholder:'Selecione o grupo de itens',required:true,visible:true,deleted:false,width:190,builtin:false,lockedType:true});
    if(!Array.isArray(group.options)||!group.options.length)group.options=[...ITEM_GROUP_OPTIONS_V8];
  }
  ['quantity','unitValue','total'].forEach((id,index)=>{const field=byId(id);if(field)Object.assign(field,{required:false,visible:false,deleted:true,order:900+index*10});});
  const editable=fields.filter(editableProductFieldV10).sort((a,b)=>Number(a.order||0)-Number(b.order||0)||String(a.label).localeCompare(String(b.label),'pt-BR'));
  editable.forEach((field,index)=>field.order=20+index*10);
  const actions=byId('actions');if(actions)Object.assign(actions,{label:'Ações',type:'action',visible:true,deleted:false,required:false,order:30+editable.length*10,width:52,lockedType:true,builtin:true});
  config.productTableFields=fields;
  return config;
}
restrictProductTableFieldsV9=function(config){return normalizeEditableProductOrderV10(config)};

function editableProductFieldsV10(){
  normalizeEditableProductOrderV10(formEditorConfig);
  return (formEditorConfig.productTableFields||[]).filter(editableProductFieldV10).sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}
function normalizeEditableOrdersOnlyV10(fields){fields.forEach((field,index)=>field.order=20+index*10);const actions=productFieldV7('actions');if(actions)actions.order=30+fields.length*10;}

renderProductFieldsEditorV7=function(){
  normalizeEditableProductOrderV10(formEditorConfig);
  ensureProductsEditorPanelV7();
  const editable=editableProductFieldsV10();
  if(!editable.some(field=>field.id===selectedProductFieldIdV7))selectedProductFieldIdV7=editable[0]?.id||'description';
  renderProductFieldsEditorBaseV9();
  const list=document.getElementById('productFieldsListV7');
  if(list){
    list.querySelectorAll('[data-product-field-item-v7]').forEach(item=>{
      const field=productFieldV7(item.dataset.productFieldItemV7);
      if(!editableProductFieldV10(field))item.remove();
    });
    [...list.querySelectorAll('[data-product-field-item-v7]')].forEach((item,index)=>{const order=item.querySelector('.product-field-order-v7');if(order)order.textContent=String(index+1)});
  }
  const add=document.getElementById('addProductFieldV7');
  if(add){add.style.display='inline-flex';add.textContent='+ Nova coluna';add.title='Inserir uma nova coluna na tabela de itens';}
  const head=document.querySelector('#productFieldsEditorV7 .product-fields-head-v7 span');
  if(head)head.textContent='Edite Descrição do item, NCM e Grupo de itens. Use + Nova coluna para incluir outros campos e arraste para reorganizar.';
  const preview=document.querySelector('#productsEditorPanelV5 .products-editor-preview-v5');if(preview)preview.style.display='none';
  const selected=productFieldV7(selectedProductFieldIdV7);
  const optionsWrap=document.getElementById('productFieldOptionsWrapV7');
  if(optionsWrap&&selected?.id==='itemGroup'){
    optionsWrap.classList.remove('hidden');
    const label=optionsWrap.querySelector('label');if(label)label.textContent='Opções da lista Grupo de itens';
    const textarea=document.getElementById('productFieldOptionsV7');if(textarea)textarea.placeholder='Insira um grupo de itens por linha';
  }
};

moveProductFieldV7=function(id,delta){
  const fields=editableProductFieldsV10();const index=fields.findIndex(field=>field.id===id);const target=index+delta;
  if(index<0||target<0||target>=fields.length)return;
  [fields[index],fields[target]]=[fields[target],fields[index]];normalizeEditableOrdersOnlyV10(fields);selectedProductFieldIdV7=id;persistProductFieldsV7('Posição da coluna atualizada.');
};
reorderProductFieldV7=function(sourceId,targetId,after=false){
  const fields=editableProductFieldsV10();const source=fields.find(field=>field.id===sourceId);if(!source)return;
  const remaining=fields.filter(field=>field.id!==sourceId);let index=remaining.findIndex(field=>field.id===targetId);if(index<0)return;if(after)index++;
  remaining.splice(index,0,source);normalizeEditableOrdersOnlyV10(remaining);selectedProductFieldIdV7=sourceId;persistProductFieldsV7('Coluna reposicionada por arraste.');
};

const addProductFieldBaseV10=addProductFieldV7;
addProductFieldV7=function(){
  addProductFieldBaseV10();
  normalizeEditableProductOrderV10(formEditorConfig);
  saveFormEditorConfig();applyFormEditorConfig();renderProductFieldsEditorV7();
};

const saveProductFieldBaseV10=saveProductFieldV7;
saveProductFieldV7=function(){
  const field=productFieldV7(selectedProductFieldIdV7);
  if(field?.id==='itemGroup'){
    const options=String(document.getElementById('productFieldOptionsV7')?.value||'').split(/\\r?\\n/).map(value=>value.trim()).filter((value,index,array)=>value&&array.indexOf(value)===index);
    if(!options.length){showToast('Cadastre ao menos uma opção para a lista Grupo de itens.');return;}
    field.type='select';field.lockedType=true;field.required=true;field.visible=true;field.deleted=false;
  }
  saveProductFieldBaseV10();
  normalizeEditableProductOrderV10(formEditorConfig);saveFormEditorConfig();applyFormEditorConfig();syncProductTableV7();renderProductFieldsEditorV7();
};

const applyFormEditorConfigBaseV10=applyFormEditorConfig;
applyFormEditorConfig=function(){
  normalizeEditableProductOrderV10(formEditorConfig);
  applyFormEditorConfigBaseV10();
  syncProductTableV7();
};

const fillProductFieldFormBaseV10=fillProductFieldFormV7;
fillProductFieldFormV7=function(){
  fillProductFieldFormBaseV10();
  const field=productFieldV7(selectedProductFieldIdV7);
  if(field?.id==='itemGroup'){
    const type=document.getElementById('productFieldTypeV7');if(type){type.value='select';type.disabled=true;}
    const wrap=document.getElementById('productFieldOptionsWrapV7');if(wrap)wrap.classList.remove('hidden');
    const label=wrap?.querySelector('label');if(label)label.textContent='Opções da lista Grupo de itens';
    const textarea=document.getElementById('productFieldOptionsV7');if(textarea)textarea.placeholder='Insira um grupo de itens por linha';
  }
};


/* V11: remocao definitiva da coluna Valor unitario no formulario */
function enforceNoUnitValueColumnV11(){
  ensureProductFieldsV7(formEditorConfig);
  const field=productFieldV7('unitValue');
  if(field)Object.assign(field,{required:false,visible:false,deleted:true,order:990});
  const directHeader=document.getElementById('productsColUnitValue');
  if(directHeader)directHeader.remove();
  document.querySelectorAll('#productsFormSection [data-product-field-v7="unitValue"]').forEach(element=>element.remove());
  document.querySelectorAll('#productsBody .p-value').forEach(control=>control.closest('td')?.remove());
  document.querySelectorAll('#productsFormSection .products-table thead th').forEach(header=>{
    if(header.textContent.trim().toLowerCase()==='valor unitário'||header.textContent.trim().toLowerCase()==='valor unitario')header.remove();
  });
}
const syncProductTableBaseV11=syncProductTableV7;
syncProductTableV7=function(){syncProductTableBaseV11();enforceNoUnitValueColumnV11();};
const addProductRowBaseV11=addProductRow;
addProductRow=function(data={}){addProductRowBaseV11(data);enforceNoUnitValueColumnV11();};
const applyFormEditorConfigBaseV11=applyFormEditorConfig;
applyFormEditorConfig=function(){applyFormEditorConfigBaseV11();enforceNoUnitValueColumnV11();};



/* V12: estrutura definitiva da tabela - somente os campos configurados, sem caixas legadas */
const LEGACY_PRODUCT_FIELD_IDS_V12=new Set(['number','quantity','unitValue','total']);
const LEGACY_PRODUCT_LABELS_V12=new Set(['quantidade','valor unitario','valor total']);
function normalizeProductLabelV12(value){return String(value||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').trim().toLowerCase()}
function sanitizeProductFieldsV12(config){
  ensureProductFieldsV7(config);
  let fields=Array.isArray(config.productTableFields)?config.productTableFields:[];
  const isGroupLabel=field=>{
    const label=normalizeProductLabelV12(field?.label);
    return ['grupo de itens','grupo de item','grupo itens','grupo do item'].includes(label);
  };
  const duplicatedGroups=fields.filter(field=>field&&field.id!=='itemGroup'&&isGroupLabel(field));
  const duplicatedGroupIds=duplicatedGroups.map(field=>field.id).filter(Boolean);
  const duplicatedOptions=duplicatedGroups.flatMap(field=>Array.isArray(field.options)?field.options:[]).map(value=>String(value||'').trim()).filter(Boolean);
  fields=fields.filter(field=>{
    if(!field)return false;
    if(field.id!=='itemGroup'&&isGroupLabel(field))return false;
    const legacyLabel=LEGACY_PRODUCT_LABELS_V12.has(normalizeProductLabelV12(field.label));
    if(!field.builtin&&legacyLabel&&!['description','ncm','itemGroup','actions'].includes(field.id))return false;
    return true;
  });
  config.productTableFields=fields;
  config.duplicateItemGroupFieldIdsV13=duplicatedGroupIds;
  const byId=id=>fields.find(field=>field.id===id);
  const description=byId('description');if(description)Object.assign(description,{label:'Descrição do item',type:'text',placeholder:'Informe a descrição do item',required:true,visible:true,deleted:false,order:10,width:260});
  const ncm=byId('ncm');if(ncm)Object.assign(ncm,{label:'NCM',type:'text',placeholder:'8 dígitos',required:true,visible:true,deleted:false,order:20,width:160,ncmRule:true});
  let group=byId('itemGroup');
  if(!group){
    group=normalizeProductFieldV7({id:'itemGroup',label:'Grupo de itens',type:'select',placeholder:'Selecione',required:true,visible:true,deleted:false,order:30,width:230,builtin:false,lockedType:true,options:[...ITEM_GROUP_OPTIONS_V8]},fields.length);
    fields.push(group);
  }else{
    Object.assign(group,{label:'Grupo de itens',type:'select',placeholder:'Selecione',required:true,visible:true,deleted:false,order:30,width:230,builtin:false,lockedType:true});
    if(!Array.isArray(group.options)||!group.options.length)group.options=[...ITEM_GROUP_OPTIONS_V8];
  }
  group.options=[...new Set([...(Array.isArray(group.options)?group.options:[]),...duplicatedOptions].map(value=>String(value||'').trim()).filter(Boolean))];
  const custom=fields.filter(field=>!field.builtin&&!['itemGroup'].includes(field.id)&&!LEGACY_PRODUCT_FIELD_IDS_V12.has(field.id)&&!LEGACY_PRODUCT_LABELS_V12.has(normalizeProductLabelV12(field.label)));
  custom.sort((a,b)=>Number(a.order||0)-Number(b.order||0)).forEach((field,index)=>field.order=40+index*10);
  const actions=byId('actions');if(actions)Object.assign(actions,{label:'Ações',type:'action',visible:true,deleted:false,required:false,order:50+custom.length*10,width:70,lockedType:true});
  fields.filter(field=>LEGACY_PRODUCT_FIELD_IDS_V12.has(field.id)).forEach((field,index)=>Object.assign(field,{required:false,visible:false,deleted:true,order:900+index*10}));
  config.productTableFields=fields;
  return config;
}
function activeProductFieldsV12(){
  sanitizeProductFieldsV12(formEditorConfig);
  return [...formEditorConfig.productTableFields]
    .filter(field=>productFieldActiveV7(field))
    .filter(field=>!LEGACY_PRODUCT_FIELD_IDS_V12.has(field.id))
    .filter(field=>!LEGACY_PRODUCT_LABELS_V12.has(normalizeProductLabelV12(field.label)))
    .filter(field=>field.id==='itemGroup'||!['grupo de itens','grupo de item','grupo itens','grupo do item'].includes(normalizeProductLabelV12(field.label)))
    .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}
function productRowValuesV12(row,data){
  const values={};
  activeProductFieldsV12().forEach(field=>{
    if(field.id==='actions')return;
    const old=row?.querySelector(\`[data-product-control-v7="\${CSS.escape(field.id)}"]\`);
    values[field.id]=data?productFieldValueV7(data,field):(old?.value??'');
  });
  return values;
}
function buildProductHeaderV12(){
  const table=document.querySelector('#productsFormSection .products-table');if(!table)return;
  const row=table.querySelector('thead tr');if(!row)return;
  row.innerHTML='';
  activeProductFieldsV12().forEach(field=>{
    const th=document.createElement('th');
    th.dataset.productFieldV7=field.id;th.textContent=field.label;th.title=field.label;
    th.style.width=field.width+'px';th.style.minWidth=field.width+'px';th.style.maxWidth=field.width+'px';
    th.style.textAlign=field.id==='actions'?'center':'left';row.appendChild(th);
  });
  const width=activeProductFieldsV12().reduce((sum,field)=>sum+Number(field.width||150),0);
  table.style.minWidth=Math.max(620,width)+'px';
}
function bindRemoveProductV12(button,row){
  button.addEventListener('click',()=>{
    if(document.querySelectorAll('#productsBody tr').length===1){showToast('A solicitação precisa ter ao menos um item.');return}
    row.remove();updateProductsSummary();
  });
}
function buildProductRowV12(row,data=null){
  if(!row)return;
  const values=productRowValuesV12(row,data);row.innerHTML='';
  activeProductFieldsV12().forEach(field=>{
    const cell=document.createElement('td');cell.dataset.productFieldV7=field.id;
    cell.style.width=field.width+'px';cell.style.minWidth=field.width+'px';cell.style.maxWidth=field.width+'px';
    if(field.id==='actions'){
      cell.style.textAlign='center';
      const button=document.createElement('button');button.type='button';button.className='btn btn-danger btn-small remove-product';button.title='Excluir item';button.textContent=uiConfigV6('removeProduct')?.text||'×';
      bindRemoveProductV12(button,row);cell.appendChild(button);
    }else{
      cell.innerHTML=productControlHtmlV7(field,values[field.id]??'');
      const control=cell.querySelector('[data-product-control-v7]');
      if(control){
        control.required=!!field.required;control.disabled=false;control.style.width='100%';control.style.maxWidth='100%';
        if(field.id==='description')control.placeholder='Informe a descrição do item';
        if(field.id==='ncm')control.placeholder='8 dígitos';
        if(field.id==='itemGroup'&&control.tagName==='SELECT'){
          const placeholder=control.querySelector('option[value=""]');if(placeholder)placeholder.textContent='Selecione';
        }
        bindProductControlV7(control,field);
      }
    }
    row.appendChild(cell);
  });
}
function migrateDuplicatedItemGroupValuesV13(config){
  const duplicateIds=Array.isArray(config?.duplicateItemGroupFieldIdsV13)?config.duplicateItemGroupFieldIdsV13:[];
  if(!duplicateIds.length)return false;
  let changed=false;
  requests.forEach(request=>{
    (request.products||[]).forEach(product=>{
      product.customFields=product.customFields||{};
      if(!String(product.customFields.itemGroup||'').trim()){
        const sourceId=duplicateIds.find(id=>String(product.customFields[id]||'').trim());
        if(sourceId){product.customFields.itemGroup=product.customFields[sourceId];changed=true;}
      }
      duplicateIds.forEach(id=>{if(Object.prototype.hasOwnProperty.call(product.customFields,id)){delete product.customFields[id];changed=true;}});
    });
  });
  if(changed)saveRequests();
  return changed;
}
const loadFormEditorConfigBaseV12=loadFormEditorConfig;
loadFormEditorConfig=function(){const config=sanitizeProductFieldsV12(loadFormEditorConfigBaseV12());migrateDuplicatedItemGroupValuesV13(config);return config};
ensureProductHeaderV7=function(){sanitizeProductFieldsV12(formEditorConfig);buildProductHeaderV12()};
ensureProductRowV7=function(row,data=null){sanitizeProductFieldsV12(formEditorConfig);buildProductRowV12(row,data)};
syncProductTableV7=function(){sanitizeProductFieldsV12(formEditorConfig);buildProductHeaderV12();document.querySelectorAll('#productsBody tr').forEach(row=>buildProductRowV12(row))};
addProductRow=function(data={}){
  sanitizeProductFieldsV12(formEditorConfig);buildProductHeaderV12();
  const row=document.createElement('tr');row.dataset.productId=data.id||productId();document.getElementById('productsBody').appendChild(row);buildProductRowV12(row,data);updateProductsSummary();
};
updateProductsSummary=function(){
  const count=document.getElementById('productsCount');if(count)count.textContent=document.querySelectorAll('#productsBody tr').length;
  const grand=document.getElementById('productsGrandTotal');if(grand)grand.textContent='';
};
const applyFormEditorConfigBaseV12=applyFormEditorConfig;
applyFormEditorConfig=function(){sanitizeProductFieldsV12(formEditorConfig);applyFormEditorConfigBaseV12();buildProductHeaderV12();document.querySelectorAll('#productsBody tr').forEach(row=>buildProductRowV12(row))};



/* V13: manter somente um campo Grupo de itens no formulario e no editor */
function normalizeItemGroupNameV13(value){
  return String(value||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
function isItemGroupFieldV13(field){
  if(!field)return false;
  if(String(field.id||'')==='itemGroup')return true;
  const id=normalizeItemGroupNameV13(field.id);
  const label=normalizeItemGroupNameV13(field.label);
  return ['grupo de itens','grupo de item','grupo itens','grupo item'].includes(label)
    || ['itemgroup','grupoitem','grupodeitens','grupo_itens'].includes(String(field.id||'').toLowerCase())
    || ((id.includes('grupo')||label.includes('grupo'))&&(id.includes('item')||label.includes('item')));
}
function dedupeItemGroupFieldV13(config){
  if(!config||typeof config!=='object')return config;
  ensureProductFieldsV7(config);
  let fields=Array.isArray(config.productTableFields)?config.productTableFields:[];
  const candidates=fields.filter(isItemGroupFieldV13);
  let canonical=fields.find(field=>field?.id==='itemGroup')||candidates[0];
  const duplicateIds=[];
  const mergedOptions=[];
  candidates.forEach(field=>{
    if(Array.isArray(field?.options))mergedOptions.push(...field.options);
    if(field&&field!==canonical&&field.id)duplicateIds.push(field.id);
  });
  if(!canonical){
    canonical=normalizeProductFieldV7({
      id:'itemGroup',label:'Grupo de itens',type:'select',placeholder:'Selecione',required:true,
      visible:true,deleted:false,order:30,width:230,builtin:false,lockedType:true,
      options:[...ITEM_GROUP_OPTIONS_V8]
    },fields.length);
    fields.push(canonical);
  }
  canonical.id='itemGroup';
  Object.assign(canonical,{
    label:'Grupo de itens',type:'select',placeholder:'Selecione',required:true,
    visible:true,deleted:false,order:30,width:230,builtin:false,lockedType:true
  });
  canonical.options=[...new Set([
    ...(Array.isArray(canonical.options)?canonical.options:[]),
    ...mergedOptions,
    ...ITEM_GROUP_OPTIONS_V8
  ].map(value=>String(value||'').trim()).filter(Boolean))];

  fields=fields.filter(field=>field===canonical||!isItemGroupFieldV13(field));
  config.productTableFields=fields;
  config.duplicateItemGroupFieldIdsV13=[...new Set([
    ...(Array.isArray(config.duplicateItemGroupFieldIdsV13)?config.duplicateItemGroupFieldIdsV13:[]),
    ...duplicateIds
  ])];

  let requestsChanged=false;
  requests.forEach(request=>{
    (request.products||[]).forEach(product=>{
      product.customFields=product.customFields||{};
      if(!String(product.customFields.itemGroup||'').trim()){
        const sourceId=config.duplicateItemGroupFieldIdsV13.find(id=>String(product.customFields[id]||'').trim());
        if(sourceId){product.customFields.itemGroup=product.customFields[sourceId];requestsChanged=true;}
      }
      config.duplicateItemGroupFieldIdsV13.forEach(id=>{
        if(id!=='itemGroup'&&Object.prototype.hasOwnProperty.call(product.customFields,id)){
          delete product.customFields[id];requestsChanged=true;
        }
      });
    });
  });
  if(requestsChanged)saveRequests();
  return config;
}

const sanitizeProductFieldsBaseV13=sanitizeProductFieldsV12;
sanitizeProductFieldsV12=function(config){
  return dedupeItemGroupFieldV13(sanitizeProductFieldsBaseV13(config));
};

const renderProductFieldsEditorBaseV13=renderProductFieldsEditorV7;
renderProductFieldsEditorV7=function(){
  dedupeItemGroupFieldV13(formEditorConfig);
  renderProductFieldsEditorBaseV13();
  const list=document.getElementById('productFieldsListV7');
  if(list){
    let groupFound=false;
    list.querySelectorAll('[data-product-field-item-v7]').forEach(item=>{
      const field=productFieldV7(item.dataset.productFieldItemV7);
      if(isItemGroupFieldV13(field)){
        if(groupFound){item.remove();return;}
        groupFound=true;
        item.dataset.productFieldItemV7='itemGroup';
        item.querySelectorAll('[data-product-field-edit-v7]').forEach(button=>button.dataset.productFieldEditV7='itemGroup');
        item.querySelectorAll('[data-product-field-hide-v7]').forEach(button=>button.dataset.productFieldHideV7='itemGroup');
        item.querySelectorAll('[data-product-field-delete-v7]').forEach(button=>button.dataset.productFieldDeleteV7='itemGroup');
        const title=item.querySelector('.product-field-copy-v7 b');if(title)title.textContent='Grupo de itens';
      }
    });
  }
};

const saveProductFieldBaseV13=saveProductFieldV7;
saveProductFieldV7=function(){
  const selected=productFieldV7(selectedProductFieldIdV7);
  const typedLabel=normalizeItemGroupNameV13(document.getElementById('productFieldLabelV7')?.value||'');
  const exactGroup=['grupo de itens','grupo de item','grupo itens','grupo item'].includes(typedLabel);
  if(selected?.id!=='itemGroup'&&exactGroup){
    selectedEditorFieldId=PRODUCTS_EDITOR_ID_V5;
    selectedProductFieldIdV7='itemGroup';
    showToast('Já existe uma coluna Grupo de itens. Edite a coluna existente.');
    renderFormEditor();
    return;
  }
  saveProductFieldBaseV13();
  dedupeItemGroupFieldV13(formEditorConfig);
  saveFormEditorConfig();
  applyFormEditorConfig();
  renderProductFieldsEditorV7();
};

const applyFormEditorConfigBaseV13=applyFormEditorConfig;
applyFormEditorConfig=function(){
  dedupeItemGroupFieldV13(formEditorConfig);
  applyFormEditorConfigBaseV13();
  buildProductHeaderV12();
  document.querySelectorAll('#productsBody tr').forEach(row=>buildProductRowV12(row));
};

const loadFormEditorConfigBaseV13=loadFormEditorConfig;
loadFormEditorConfig=function(){
  const config=dedupeItemGroupFieldV13(loadFormEditorConfigBaseV13());
  try{localStorage.setItem(FORM_EDITOR_STORAGE_KEY,JSON.stringify(config));}catch(error){}
  return config;
};



/* V15: catálogo completo de Grupo de itens informado pelo usuário */
const ITEM_GROUP_CATALOG_VERSION_V15='seel-grupos-itens-completo-2026-07-29-v1';
const loadFormEditorConfigBaseV15=loadFormEditorConfig;
loadFormEditorConfig=function(){
  const config=loadFormEditorConfigBaseV15();
  ensureProductFieldsV7(config);
  const fields=Array.isArray(config.productTableFields)?config.productTableFields:[];
  let group=fields.find(field=>field?.id==='itemGroup');
  if(!group){
    group=normalizeProductFieldV7({
      id:'itemGroup',label:'Grupo de itens',type:'select',placeholder:'Selecione',required:true,
      visible:true,deleted:false,order:30,width:230,builtin:false,lockedType:true,
      options:[...ITEM_GROUP_OPTIONS_V8]
    },fields.length);
    fields.push(group);
  }
  if(config.itemGroupCatalogVersion!==ITEM_GROUP_CATALOG_VERSION_V15){
    group.options=[...ITEM_GROUP_OPTIONS_V8];
    config.itemGroupCatalogVersion=ITEM_GROUP_CATALOG_VERSION_V15;
    try{localStorage.setItem(FORM_EDITOR_STORAGE_KEY,JSON.stringify(config));}catch(error){}
  }
  Object.assign(group,{
    label:'Grupo de itens',type:'select',placeholder:'Selecione',required:true,
    visible:true,deleted:false,lockedType:true
  });
  config.productTableFields=fields;
  return config;
};



/* V16: controle avancado de largura das colunas no Editor de formulario */
const PRODUCT_COLUMN_MIN_WIDTH_V16=80;
const PRODUCT_COLUMN_MAX_WIDTH_V16=900;
function clampProductColumnWidthV16(value,fallback=160){
  const numeric=Number(value);
  return Math.max(PRODUCT_COLUMN_MIN_WIDTH_V16,Math.min(PRODUCT_COLUMN_MAX_WIDTH_V16,Number.isFinite(numeric)?numeric:fallback));
}

const normalizeProductFieldBaseV16=normalizeProductFieldV7;
normalizeProductFieldV7=function(field,index=0){
  const requested=clampProductColumnWidthV16(field?.width,150);
  const normalized=normalizeProductFieldBaseV16(field,index);
  normalized.width=requested;
  return normalized;
};

const sanitizeProductFieldsBaseV16=sanitizeProductFieldsV12;
sanitizeProductFieldsV12=function(config){
  const previousWidths=new Map((Array.isArray(config?.productTableFields)?config.productTableFields:[])
    .filter(field=>field?.id)
    .map(field=>[String(field.id),clampProductColumnWidthV16(field.width,150)]));
  const result=sanitizeProductFieldsBaseV16(config);
  (result?.productTableFields||[]).forEach(field=>{
    if(previousWidths.has(String(field.id)))field.width=previousWidths.get(String(field.id));
    else field.width=clampProductColumnWidthV16(field.width,field.id==='description'?260:field.id==='ncm'?160:field.id==='itemGroup'?230:150);
  });
  return result;
};

function applyProductColumnWidthV16(fieldId,width){
  const safeWidth=clampProductColumnWidthV16(width,160);
  const selectorId=CSS.escape(String(fieldId||''));
  document.querySelectorAll(\`#productsFormSection th[data-product-field-v7="\${selectorId}"],#productsFormSection td[data-product-field-v7="\${selectorId}"]\`).forEach(cell=>{
    cell.style.setProperty('width',safeWidth+'px','important');
    cell.style.setProperty('min-width',safeWidth+'px','important');
    cell.style.setProperty('max-width',safeWidth+'px','important');
  });
  document.querySelectorAll(\`#productsFormSection [data-product-control-v7="\${selectorId}"]\`).forEach(control=>{
    control.style.setProperty('width','100%','important');
    control.style.setProperty('min-width','0','important');
    control.style.setProperty('max-width','100%','important');
  });
  const table=document.querySelector('#productsFormSection .products-table');
  if(table&&typeof activeProductFieldsV12==='function'){
    const total=activeProductFieldsV12().reduce((sum,field)=>sum+clampProductColumnWidthV16(field.width,150),0);
    table.style.setProperty('min-width',Math.max(620,total)+'px','important');
  }
}
function applyAllProductColumnWidthsV16(){
  if(typeof activeProductFieldsV12!=='function')return;
  activeProductFieldsV12().forEach(field=>applyProductColumnWidthV16(field.id,field.width));
}

const buildProductHeaderBaseV16=buildProductHeaderV12;
buildProductHeaderV12=function(){buildProductHeaderBaseV16();applyAllProductColumnWidthsV16();};
const buildProductRowBaseV16=buildProductRowV12;
buildProductRowV12=function(row,data=null){buildProductRowBaseV16(row,data);applyAllProductColumnWidthsV16();};

function widthFieldV16(){return typeof productFieldV7==='function'?productFieldV7(selectedProductFieldIdV7):null;}
function syncWidthControlsV16(width){
  const safe=clampProductColumnWidthV16(width,160);
  const number=document.getElementById('productFieldWidthV7');
  const range=document.getElementById('productFieldWidthRangeV16');
  const value=document.getElementById('productFieldWidthValueV16');
  if(number&&String(number.value)!==String(safe))number.value=safe;
  if(range&&String(range.value)!==String(safe))range.value=safe;
  if(value)value.textContent=safe+' px';
}
function previewProductColumnWidthV16(value){
  const field=widthFieldV16();if(!field)return;
  const safe=clampProductColumnWidthV16(value,field.width||160);
  field.width=safe;syncWidthControlsV16(safe);applyProductColumnWidthV16(field.id,safe);
}
function commitProductColumnWidthV16(value,notify=false){
  const field=widthFieldV16();if(!field)return;
  field.width=clampProductColumnWidthV16(value,field.width||160);
  syncWidthControlsV16(field.width);
  saveFormEditorConfig();
  applyFormEditorConfig();
  applyAllProductColumnWidthsV16();
  if(notify)showToast(\`Largura de “\${field.label}” atualizada para \${field.width}px.\`);
}
function ensureProductWidthControlsV16(){
  const number=document.getElementById('productFieldWidthV7');if(!number)return;
  number.min=String(PRODUCT_COLUMN_MIN_WIDTH_V16);number.max=String(PRODUCT_COLUMN_MAX_WIDTH_V16);number.step='10';
  const wrapper=number.closest('.field');if(wrapper)wrapper.classList.add('full','product-width-field-v16');
  if(!document.getElementById('productFieldWidthToolsV16')){
    const tools=document.createElement('div');tools.id='productFieldWidthToolsV16';tools.className='product-width-tools-v16';
    tools.innerHTML=\`
      <div class="product-width-range-line-v16">
        <input id="productFieldWidthRangeV16" type="range" min="\${PRODUCT_COLUMN_MIN_WIDTH_V16}" max="\${PRODUCT_COLUMN_MAX_WIDTH_V16}" step="10" aria-label="Ajustar largura da coluna">
        <strong id="productFieldWidthValueV16">160 px</strong>
      </div>
      <div class="product-width-presets-v16">
        <button type="button" data-product-width-v16="140">Compacta</button>
        <button type="button" data-product-width-v16="220">Média</button>
        <button type="button" data-product-width-v16="320">Ampla</button>
        <button type="button" data-product-width-v16="480">Extra ampla</button>
        <button type="button" data-product-width-v16="650">Máxima</button>
      </div>
      <small>Defina de 80 a 900 px. A alteração aparece imediatamente na tabela e fica salva no formulário.</small>\`;
    number.insertAdjacentElement('afterend',tools);
  }
  if(number.dataset.widthBoundV16!=='1'){
    number.dataset.widthBoundV16='1';
    number.addEventListener('input',()=>previewProductColumnWidthV16(number.value));
    number.addEventListener('change',()=>commitProductColumnWidthV16(number.value));
  }
  const range=document.getElementById('productFieldWidthRangeV16');
  if(range&&range.dataset.widthBoundV16!=='1'){
    range.dataset.widthBoundV16='1';
    range.addEventListener('input',()=>previewProductColumnWidthV16(range.value));
    range.addEventListener('change',()=>commitProductColumnWidthV16(range.value));
  }
  document.querySelectorAll('[data-product-width-v16]').forEach(button=>{
    if(button.dataset.widthBoundV16==='1')return;
    button.dataset.widthBoundV16='1';
    button.addEventListener('click',()=>commitProductColumnWidthV16(button.dataset.productWidthV16,true));
  });
}

const ensureProductsEditorPanelBaseV16=ensureProductsEditorPanelV7;
ensureProductsEditorPanelV7=function(){ensureProductsEditorPanelBaseV16();ensureProductWidthControlsV16();};
const fillProductFieldFormBaseV16=fillProductFieldFormV7;
fillProductFieldFormV7=function(){fillProductFieldFormBaseV16();ensureProductWidthControlsV16();const field=widthFieldV16();if(field)syncWidthControlsV16(field.width);};
const renderProductFieldsEditorBaseV16=renderProductFieldsEditorV7;
renderProductFieldsEditorV7=function(){renderProductFieldsEditorBaseV16();ensureProductWidthControlsV16();const field=widthFieldV16();if(field)syncWidthControlsV16(field.width);};

const saveProductFieldBaseV16=saveProductFieldV7;
saveProductFieldV7=function(){
  const selectedId=selectedProductFieldIdV7;
  const requested=clampProductColumnWidthV16(document.getElementById('productFieldWidthV7')?.value,productFieldV7(selectedId)?.width||160);
  saveProductFieldBaseV16();
  const field=productFieldV7(selectedId);
  if(field){
    field.width=requested;
    saveFormEditorConfig();applyFormEditorConfig();applyAllProductColumnWidthsV16();
    syncWidthControlsV16(requested);
  }
};

migrateRequests();initializeFormEditor();resetForm();renderAll();
})();
<\/script>

<style>
/* Editor v4: arrastar perguntas rapidamente entre posições e seções */
.editor-question-item{
  grid-template-columns:30px minmax(0,1fr) minmax(118px,auto)!important;
  position:relative;
  cursor:grab;
  user-select:none;
}
.editor-question-item:active{cursor:grabbing}
.editor-drag-handle{
  width:28px;height:40px;border-radius:9px;display:grid;place-items:center;
  color:#617b8c;background:#edf3f6;border:1px solid #d8e4ea;
  font-size:16px;font-weight:950;letter-spacing:-2px;cursor:grab;
  touch-action:none;
}
.editor-question-item:hover .editor-drag-handle{background:#e3edf2;color:var(--navy);border-color:#b9ccd7}
.editor-question-item.dragging{opacity:.42;transform:scale(.985);cursor:grabbing}
.editor-question-item.drop-before:before,
.editor-question-item.drop-after:after{
  content:"";position:absolute;left:8px;right:8px;height:4px;border-radius:999px;
  background:var(--blue);box-shadow:0 0 0 4px rgba(7,89,133,.12);z-index:6;
}
.editor-question-item.drop-before:before{top:-5px}
.editor-question-item.drop-after:after{bottom:-5px}
.editor-section-dropzone{
  min-height:58px;border:1px dashed transparent;border-radius:12px;padding:3px;
  transition:background .14s,border-color .14s,box-shadow .14s;
}
.editor-section-dropzone.drag-over-section{
  background:#eef7fb;border-color:#79a8bd;box-shadow:inset 0 0 0 2px rgba(7,89,133,.08);
}
.editor-section-block.drag-target .editor-section-header{
  background:#e8f3f8;border-radius:10px;color:var(--navy);
}
.editor-question-quick{
  display:grid!important;grid-template-columns:minmax(105px,1fr) auto;gap:5px!important;
  align-items:center!important;min-width:118px;
}
.editor-section-quick-select{
  width:100%;height:30px;margin:0!important;padding:0 25px 0 8px!important;
  border-radius:8px!important;border:1px solid #d2dfe6!important;
  background:#fff!important;color:#476273!important;font-size:9px!important;
  font-weight:850!important;cursor:pointer;
}
.editor-question-quick [data-field-visibility]{
  min-height:28px;padding:0 7px;border-radius:8px;background:#fff;border:1px solid var(--line);
  color:#516d7d;font-size:8.5px;font-weight:900;
}
.editor-order-badge{grid-column:2;grid-row:1 / span 2}
.editor-drag-instruction{
  margin:8px 0 0;padding:9px 10px;border-radius:10px;background:#edf6fa;
  border:1px solid #d2e6ee;color:#456577;font-size:9.5px;font-weight:800;line-height:1.4;
}
.editor-drag-instruction b{color:var(--navy)}
@media(max-width:650px){
  .editor-question-item{grid-template-columns:28px minmax(0,1fr)!important}
  .editor-question-quick{grid-column:2;grid-template-columns:1fr auto auto!important;width:100%}
  .editor-order-badge{grid-column:auto;grid-row:auto}
}
</style>



<style>
/* Editor V5: leitura limpa, sem itens subscritos ou sobrepostos */
.editor-layout-v2{grid-template-columns:minmax(390px,440px) minmax(0,1fr)!important}
.editor-sidebar-v2,.editor-main-v2{min-width:0!important}
.editor-question-list{overflow-x:hidden!important;padding-right:4px}
.editor-section-header{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:start!important;gap:8px!important}
.editor-section-name{min-width:0!important;align-items:flex-start!important;flex-wrap:wrap!important}
.editor-section-name b{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;overflow-wrap:anywhere;line-height:1.3}
.editor-section-actions{max-width:100%;align-items:center}
.editor-question-item{grid-template-columns:30px minmax(0,1fr)!important;align-items:start!important;gap:8px!important;min-width:0!important;padding:10px!important}
.editor-question-item-main{min-width:0!important;width:100%!important}
.editor-question-item-main>b{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;overflow-wrap:anywhere!important;word-break:normal!important;line-height:1.35!important;max-width:100%!important}
.editor-question-item-meta{min-width:0;align-items:center}
.editor-question-quick{grid-column:2!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto auto!important;width:100%!important;min-width:0!important;gap:6px!important}
.editor-section-quick-select{min-width:0!important;max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}
.editor-order-badge{grid-column:auto!important;grid-row:auto!important}
.editor-special-handle-v5{letter-spacing:0!important;cursor:default!important}
.editor-products-special-v5{cursor:pointer!important}
.products-editor-panel-v5{display:none;border:1px solid var(--line);border-radius:16px;background:#fbfdfe;padding:16px;margin:0 0 14px}
.editor-main-v2.products-editor-mode-v5 .products-editor-panel-v5{display:block}
.editor-main-v2.products-editor-mode-v5 .editor-quick-actions,
.editor-main-v2.products-editor-mode-v5 .editor-fields-v2,
.editor-main-v2.products-editor-mode-v5 #editorOptionsBox,
.editor-main-v2.products-editor-mode-v5 .editor-preview-card,
.editor-main-v2.products-editor-mode-v5 .editor-actions-v2{display:none!important}
.products-editor-intro{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:12px 13px;margin-bottom:14px;border-radius:13px;background:#eef5f8;border:1px solid #d8e6ed}
.products-editor-intro div{display:grid;gap:4px;min-width:0}.products-editor-intro strong{color:var(--navy);font-size:14px}.products-editor-intro span{color:var(--muted);font-size:11px;line-height:1.45}.products-editor-intro i{font-style:normal;white-space:nowrap;background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 9px;color:var(--blue);font-size:9px;font-weight:900}
.products-editor-grid-v5{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.products-editor-grid-v5 .full{grid-column:1/-1}.products-editor-grid-v5 input,.products-editor-grid-v5 textarea{margin-top:7px}.products-editor-grid-v5 textarea{min-height:76px}
.products-editor-preview-v5{margin-top:14px;border:1px solid var(--line);border-radius:13px;overflow:hidden;background:#fff}.products-editor-preview-v5>span{display:block;padding:11px 13px;background:#eef4f7;color:var(--navy);font-weight:900;font-size:13px;border-bottom:1px solid var(--line)}.products-editor-preview-v5>div{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:1px;background:var(--line)}.products-editor-preview-v5 b{min-width:0;padding:10px;background:#fff;color:#587181;font-size:9px;overflow-wrap:anywhere}
.products-editor-actions-v5{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}
@media(max-width:1080px){.editor-layout-v2{grid-template-columns:1fr!important}.editor-question-list{max-height:470px}}
@media(max-width:720px){.editor-section-header{grid-template-columns:1fr!important}.editor-section-actions{justify-content:flex-start}.products-editor-grid-v5{grid-template-columns:1fr}.products-editor-grid-v5 .full{grid-column:auto}.products-editor-preview-v5>div{grid-template-columns:1fr 1fr}.products-editor-intro{flex-direction:column}.products-editor-actions-v5,.products-editor-actions-v5 .btn{width:100%}}
</style>


<style>
/* Editor V6: elementos e botões totalmente configuráveis */
[data-ui-removed-v6="1"]{display:none!important}
.form-action-buttons-v6{width:100%;display:flex;justify-content:flex-end;align-items:center;gap:9px;flex-wrap:wrap}
.form-action-buttons-v6[data-empty="1"]{display:none!important}
.ui-elements-block-v6{border-color:#bed5e0!important;background:#f7fbfd!important}
.ui-editor-item-v6{cursor:pointer!important}
.ui-editor-item-v6.ui-deleted-v6{opacity:.62;background:#f6f7f8!important}
.ui-item-actions-v6{grid-template-columns:1fr 1fr!important}
.ui-item-actions-v6 button{min-width:0!important}
.ui-item-actions-v6 button.danger{color:#b42318!important;border-color:#f1c4c0!important;background:#fff8f7!important}
.ui-element-panel-v6{display:none;border:1px solid var(--line);border-radius:16px;background:#fbfdfe;padding:16px;margin:0 0 14px}
.editor-main-v2.ui-element-editor-mode-v6 .ui-element-panel-v6{display:block}
.editor-main-v2.ui-element-editor-mode-v6 .products-editor-panel-v5,
.editor-main-v2.ui-element-editor-mode-v6 .editor-quick-actions,
.editor-main-v2.ui-element-editor-mode-v6 .editor-fields-v2,
.editor-main-v2.ui-element-editor-mode-v6 #editorOptionsBox,
.editor-main-v2.ui-element-editor-mode-v6 .editor-preview-card,
.editor-main-v2.ui-element-editor-mode-v6 .editor-actions-v2{display:none!important}
.ui-element-intro-v6{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:12px 13px;margin-bottom:14px;border-radius:13px;background:#eef5f8;border:1px solid #d8e6ed}
.ui-element-intro-v6 div{display:grid;gap:4px;min-width:0}.ui-element-intro-v6 strong{color:var(--navy);font-size:14px}.ui-element-intro-v6 span{color:var(--muted);font-size:11px;line-height:1.45}.ui-element-intro-v6 i{font-style:normal;white-space:nowrap;background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 9px;color:var(--blue);font-size:9px;font-weight:900}
.ui-element-grid-v6{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.ui-element-grid-v6 .full{grid-column:1/-1}
.ui-element-status-v6{margin-top:13px;padding:11px 12px;border-radius:12px;background:#f4f8fa;border:1px solid #dce7ed;color:#607989;font-size:10px;line-height:1.45}.ui-element-status-v6 b{color:var(--navy)}
#productsFormSection .products-table th,#productsFormSection .products-table td{transition:none}
@media(max-width:720px){.ui-element-grid-v6{grid-template-columns:1fr}.ui-element-grid-v6 .full{grid-column:auto}.ui-element-intro-v6{flex-direction:column}.form-action-buttons-v6,.form-action-buttons-v6 .btn{width:100%}.ui-item-actions-v6{grid-template-columns:1fr!important}}
</style>


<style>
/* Editor V7: edição completa dos campos da tabela */
.legacy-product-column-editor-v7{display:none!important}
.product-fields-editor-v7{margin-top:16px;padding-top:16px;border-top:1px solid var(--line)}
.product-fields-head-v7{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px;padding:12px 13px;border-radius:13px;background:#f7fafb;border:1px solid #dce7ed}
.product-fields-head-v7>div{display:grid;gap:4px;min-width:0}.product-fields-head-v7 strong{color:var(--navy);font-size:14px}.product-fields-head-v7 span{color:var(--muted);font-size:10.5px;line-height:1.45}
.product-fields-layout-v7{display:grid;grid-template-columns:minmax(330px,.9fr) minmax(390px,1.1fr);gap:14px;align-items:start}
.product-fields-list-v7{display:grid;gap:8px;max-height:620px;overflow:auto;padding:3px}
.product-field-item-v7{display:grid;grid-template-columns:28px minmax(0,1fr) 30px;gap:8px;align-items:start;padding:10px;border:1px solid var(--line);border-radius:12px;background:#fff;cursor:grab;box-shadow:0 4px 12px rgba(15,53,80,.04);min-width:0}
.product-field-item-v7.active{border-color:#85b5ca;box-shadow:0 0 0 3px rgba(7,89,133,.08)}.product-field-item-v7.deleted{opacity:.58;background:#f7f8f9}.product-field-item-v7.dragging{opacity:.38}.product-field-item-v7.drag-target{border-color:var(--blue);box-shadow:inset 0 -4px 0 var(--yellow)}
.product-field-drag-v7{width:28px;height:38px;border-radius:9px;background:#edf3f6;border:1px solid #d6e2e8;color:#607b8c;display:grid;place-items:center;font-weight:950;cursor:grab;user-select:none}
.product-field-copy-v7{display:grid;gap:5px;min-width:0}.product-field-copy-v7>b{color:var(--navy);font-size:11px;line-height:1.3;overflow-wrap:anywhere}.product-field-copy-v7>span{display:flex;gap:5px;flex-wrap:wrap}.product-field-copy-v7 i{font-style:normal;padding:3px 6px;border-radius:999px;background:#eaf2f6;color:#587181;font-size:7.5px;font-weight:900;text-transform:uppercase}.product-field-copy-v7 i.required{background:#ffedd5;color:#a84b08}.product-field-copy-v7 i.hidden-field{background:#fee2e2;color:#a61b1b}
.product-field-order-v7{width:28px;height:28px;border-radius:9px;background:#f1f5f7;color:#4e6979;display:grid;place-items:center;font-size:9px;font-weight:950}
.product-field-quick-v7{grid-column:2/4;display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px}.product-field-quick-v7 button{min-width:0;min-height:28px;padding:0 7px;border-radius:8px;background:#f3f7f9;color:#31566d;border:1px solid #d7e3e9;font-size:8px}.product-field-quick-v7 button.danger{background:#fff5f5;color:#a61b1b;border-color:#f0c8c8}
.product-field-form-v7{border:1px solid var(--line);border-radius:14px;background:#fff;padding:14px;box-shadow:0 7px 20px rgba(15,53,80,.05)}
.product-field-form-head-v7{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding-bottom:12px;margin-bottom:13px;border-bottom:1px solid var(--line)}.product-field-form-head-v7>div{display:grid;gap:3px;min-width:0}.product-field-form-head-v7 small{color:var(--muted);font-size:8px;font-weight:950;letter-spacing:.07em}.product-field-form-head-v7 strong{color:var(--navy);font-size:15px;overflow-wrap:anywhere}.product-field-form-head-v7>span{white-space:nowrap;padding:5px 8px;border-radius:999px;background:#edf5f8;color:var(--blue);font-size:8px;font-weight:900}
.product-field-grid-v7{display:grid;grid-template-columns:1fr 1fr;gap:11px}.product-field-grid-v7 .full{grid-column:1/-1}.product-field-grid-v7 textarea{min-height:110px}
.product-field-actions-v7{display:flex;justify-content:flex-end;gap:7px;flex-wrap:wrap;margin-top:14px;padding-top:13px;border-top:1px solid var(--line)}
#productsFormSection .products-table textarea{min-height:58px;resize:vertical;margin:0}
#productsFormSection .products-table select{margin:0;min-width:120px}
#productsFormSection .products-table th{white-space:normal;overflow-wrap:anywhere;line-height:1.25}
@media(max-width:1180px){.product-fields-layout-v7{grid-template-columns:1fr}.product-fields-list-v7{max-height:420px}}
@media(max-width:720px){.product-fields-head-v7{flex-direction:column}.product-fields-head-v7 .btn{width:100%}.product-field-grid-v7{grid-template-columns:1fr}.product-field-grid-v7 .full{grid-column:auto}.product-field-actions-v7,.product-field-actions-v7 .btn{width:100%}.product-field-quick-v7{grid-template-columns:1fr}.product-fields-layout-v7{grid-template-columns:1fr}}
</style>


<style>
/* V8: formulário enxuto para Cadastro de Itens */
.module-hidden-v8{display:none!important}
#productsValueSummaryLabel{display:none!important}
#productsFormSection .products-summary{justify-content:flex-end}
#productsFormSection .products-table input,
#productsFormSection .products-table select,
#productsFormSection .products-table textarea{min-height:34px;padding:7px 8px;font-size:12px}
#productsFormSection [data-product-control-v7="description"]{min-width:0;width:170px;max-width:170px}
#productsFormSection [data-product-control-v7="itemGroup"]{min-width:0;width:175px;max-width:175px}
#view-dashboard .charts{grid-template-columns:1fr 1fr}
@media(max-width:900px){#view-dashboard .charts{grid-template-columns:1fr}}
</style>


<style id="cadastro-itens-caixas-reduzidas-v9">
/* V9: tabela de itens mais compacta */
#productsFormSection .table-scroll{overflow-x:auto}
#productsFormSection .products-table{
  width:auto!important;
  min-width:0!important;
  table-layout:fixed;
}
#productsFormSection .products-table th,
#productsFormSection .products-table td{
  padding:6px!important;
}
#productsFormSection .products-table th[data-product-field-v7="number"],
#productsFormSection .products-table td[data-product-field-v7="number"]{width:42px!important;min-width:42px!important;max-width:42px!important}
#productsFormSection .products-table th[data-product-field-v7="description"],
#productsFormSection .products-table td[data-product-field-v7="description"]{width:170px!important;min-width:170px!important;max-width:170px!important}
#productsFormSection .products-table th[data-product-field-v7="ncm"],
#productsFormSection .products-table td[data-product-field-v7="ncm"]{width:105px!important;min-width:105px!important;max-width:105px!important}
#productsFormSection .products-table th[data-product-field-v7="itemGroup"],
#productsFormSection .products-table td[data-product-field-v7="itemGroup"]{width:175px!important;min-width:175px!important;max-width:175px!important}
#productsFormSection .products-table th[data-product-field-v7="actions"],
#productsFormSection .products-table td[data-product-field-v7="actions"]{width:52px!important;min-width:52px!important;max-width:52px!important}
#productsFormSection [data-product-control-v7="description"]{width:158px!important;min-width:0!important;max-width:158px!important}
#productsFormSection [data-product-control-v7="ncm"]{width:93px!important;min-width:0!important;max-width:93px!important}
#productsFormSection [data-product-control-v7="itemGroup"]{width:163px!important;min-width:0!important;max-width:163px!important}
#productsFormSection .products-table input,
#productsFormSection .products-table select,
#productsFormSection .products-table textarea{
  min-height:32px!important;
  padding:5px 7px!important;
  font-size:11px!important;
}
@media(max-width:650px){
  #productsFormSection .products-table{width:auto!important}
}
</style>

<style id="product-column-width-editor-v16">
.product-width-field-v16{grid-column:1/-1!important}
.product-width-field-v16>label{display:flex;align-items:center;justify-content:space-between}
#productFieldWidthV7{max-width:180px}
.product-width-tools-v16{display:grid;gap:9px;margin-top:8px;padding:11px;border:1px solid #d7e4ea;border-radius:12px;background:#f7fafb}
.product-width-range-line-v16{display:grid;grid-template-columns:minmax(180px,1fr) 74px;gap:12px;align-items:center}
#productFieldWidthRangeV16{width:100%;padding:0;border:0;background:transparent;accent-color:var(--blue)}
#productFieldWidthValueV16{height:34px;display:grid;place-items:center;border:1px solid #cbdde6;border-radius:9px;background:#fff;color:var(--navy);font-size:11px}
.product-width-presets-v16{display:flex;gap:6px;flex-wrap:wrap}
.product-width-presets-v16 button{min-height:30px;padding:0 9px;border-radius:8px;border:1px solid #d2e0e7;background:#fff;color:#31566d;font-size:9px;font-weight:900;cursor:pointer}
.product-width-presets-v16 button:hover{border-color:#78a9be;background:#edf6fa;color:var(--navy)}
.product-width-tools-v16 small{color:var(--muted);font-size:9.5px;line-height:1.4}
@media(max-width:650px){.product-width-range-line-v16{grid-template-columns:1fr}.product-width-presets-v16 button{flex:1 1 120px}}
</style>

</body>
</html>
`;export{e as default};