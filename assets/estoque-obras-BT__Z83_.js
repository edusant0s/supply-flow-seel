var e=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ObraStock SEEL - Almoxarifado Digital</title>
<style>
:root{--yellow:#fff159;--blue:#0057c2;--blue2:#003f8f;--green:#00a650;--red:#d93025;--bg:#eef2f6;--text:#172033;--muted:#667085;--line:#d9e2ec;--shadow:0 16px 40px rgba(19,44,74,.10)}
*{box-sizing:border-box}body{margin:0;font-family:Aptos,'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text)}button,input,select,textarea{font-family:inherit}button{border:0;border-radius:12px;padding:10px 14px;font-weight:800;cursor:pointer;transition:.18s}button:hover{transform:translateY(-1px)}button:disabled{opacity:.5;cursor:not-allowed;transform:none}input,select,textarea{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:14px}textarea{min-height:76px;resize:vertical}a{text-decoration:none;color:inherit}.hidden{display:none!important}.muted{color:var(--muted);font-size:13px}.danger{color:var(--red);font-weight:900}.btn-primary{background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff}.btn-green{background:linear-gradient(135deg,#00a650,#05833f);color:#fff}.btn-red{background:var(--red);color:#fff}.btn-light{background:#fff;border:1px solid var(--line);color:#1d3654}.btn-dark{background:#172033;color:#fff}.badge{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;border-radius:999px;background:#ffd600;color:#003f8f;font-size:12px;font-weight:900;padding:0 7px}
.login-page{min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(135deg,var(--yellow) 0 43%,#e8eef5 43% 100%)}.login-card{width:min(450px,100%);background:#fff;border-radius:24px;box-shadow:0 24px 60px rgba(0,0,0,.18);padding:30px}.logo-wrap{display:flex;align-items:center;gap:12px;margin-bottom:18px}.logo-img{width:96px;height:auto;object-fit:contain}.logo-title{font-size:26px;font-weight:950;color:var(--blue2);line-height:1}.logo-title small{display:block;color:#667085;font-size:13px;margin-top:4px}.field{margin:12px 0}.field label{display:block;font-size:13px;font-weight:900;color:#1e3a5f;margin-bottom:6px}.login-actions{display:grid;gap:10px;margin-top:14px}
.topbar{position:sticky;top:0;z-index:25;background:var(--yellow);box-shadow:0 3px 12px rgba(0,0,0,.10)}.topbar-inner{max-width:1320px;margin:0 auto;padding:12px 20px;display:grid;grid-template-columns:260px 1fr auto;gap:16px;align-items:center}.brand{display:flex;align-items:center;gap:10px;font-weight:950;color:var(--blue2)}.brand img{width:74px;height:42px;object-fit:contain}.brand span{font-size:20px;line-height:1}.brand small{display:block;font-size:11px;color:#526070;font-weight:900}.search{display:flex;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5d13d;box-shadow:0 4px 14px rgba(0,0,0,.08)}.search input{border:0;border-radius:0}.search button{border-radius:0;background:#fff;color:var(--blue2);font-size:18px}.top-actions{display:flex;align-items:center;gap:8px}.nav{background:#fff;border-bottom:1px solid var(--line)}.nav-inner{max-width:1320px;margin:0 auto;padding:9px 20px;display:flex;gap:8px;flex-wrap:wrap}.nav button{background:#fff;color:#33506f;border:1px solid #eef2f6;padding:8px 12px;font-size:13px}.nav button.active{background:#eef5ff;border-color:#cfe0f3;color:var(--blue2)}
.main{max-width:1320px;margin:0 auto;padding:22px 20px 80px}.hero{border-radius:24px;background:linear-gradient(135deg,#003f8f,#0057c2);color:#fff;padding:28px;display:grid;grid-template-columns:1.4fr .8fr;gap:20px;align-items:center;box-shadow:var(--shadow);overflow:hidden}.hero h1{font-size:38px;line-height:1.02;margin:8px 0}.hero p{color:#dbeafe;max-width:680px}.hero-card{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:22px;padding:24px;text-align:center}.hero-card .icon{font-size:70px}.hero-pills{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.hero-pill{border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.13);border-radius:999px;padding:7px 10px;font-size:12px;font-weight:900}.section{margin-top:24px}.section-head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:14px}.section-head h2{margin:0;color:#17365f;font-size:22px}.section-head a{font-weight:900;color:var(--blue);cursor:pointer}.product-row{display:grid;grid-template-columns:repeat(4,minmax(220px,1fr));gap:16px}.card{background:#fff;border:1px solid #d7e3ef;border-radius:22px;overflow:hidden;box-shadow:0 12px 28px rgba(18,45,81,.08);display:flex;flex-direction:column;min-height:428px;position:relative}.card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--blue),var(--blue2))}.card-img{height:175px;background:linear-gradient(180deg,#f8fbff,#eef3f8);display:grid;place-items:center;border-bottom:1px solid #e5edf5}.card-img img{max-width:142px;max-height:142px;object-fit:contain}.placeholder{font-size:64px}.card-body{padding:14px 14px 16px 18px;display:flex;flex-direction:column;gap:9px;flex:1}.card-top{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}.status{display:inline-flex;border-radius:999px;padding:7px 11px;font-size:11px;font-weight:950;text-transform:uppercase}.status.available{background:#eaf2ff;color:var(--blue2)}.status.low{background:#fff7cc;color:#7a5b00}.status.unavailable{background:#fde8e8;color:#9f2020}.qty{min-width:72px;text-align:center;background:#f3f7fb;border:1px solid #dbe6f2;border-radius:14px;padding:7px 8px}.qty strong{display:block;color:var(--blue2);font-size:17px}.qty span{font-size:10px;text-transform:uppercase;color:#667085;font-weight:900}.name{font-size:15px;font-weight:950;line-height:1.25;color:#1d2b3d;min-height:38px}.code{font-size:12px;color:#7a8ca0;font-weight:800}.chips{display:flex;gap:6px;flex-wrap:wrap}.chip{border-radius:999px;padding:5px 9px;font-size:11px;font-weight:900;background:#edf4ff;color:var(--blue2);border:1px solid #d7e8ff}.avail{display:flex;gap:8px;background:#f8fbff;border:1px solid #dce7f3;border-radius:14px;padding:9px;font-size:12px;line-height:1.3;color:#52677d}.dot{width:10px;height:10px;border-radius:50%;background:var(--green);margin-top:4px;flex:0 0 10px}.card-footer{margin-top:auto;display:grid;gap:8px}.card-footer button{width:100%;min-height:44px}
.cart-fab{position:fixed;right:22px;bottom:22px;z-index:35;width:62px;height:62px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--blue),var(--blue2));border:3px solid #ffd600;color:#fff;font-size:26px;box-shadow:0 18px 36px rgba(0,63,143,.28)}.cart-count{position:absolute;top:-8px;right:-8px;min-width:25px;height:25px;border-radius:999px;background:#ffd600;color:var(--blue2);font-size:12px;font-weight:950;display:grid;place-items:center;border:2px solid #fff}.cart-panel{position:fixed;right:22px;top:138px;width:340px;max-height:calc(100vh - 160px);overflow:auto;z-index:32;background:#fff;border:1px solid #d8e3ef;border-radius:20px;box-shadow:0 20px 50px rgba(0,63,143,.20);padding:14px;transition:.2s}.cart-panel.hidden-cart{transform:translateX(390px);opacity:0;pointer-events:none}.cart-head{display:flex;justify-content:space-between;align-items:center;gap:10px;background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border-radius:16px;padding:10px 12px;margin-bottom:10px}.cart-item{border:1px solid #e0e8f2;border-radius:14px;background:#f8fbff;padding:10px;margin-bottom:10px}.cart-fulfillment{font-size:12px;color:var(--blue2);font-weight:900;margin-top:4px}.empty{padding:18px;text-align:center;background:#f8fbff;border:1px dashed #cbd5e1;border-radius:16px;color:#667085}
.modal-root{position:relative;z-index:60}.modal-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.55);display:grid;place-items:center;padding:16px;z-index:60}.modal{width:min(820px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.30);padding:20px}.modal-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:14px}.modal-head h2{margin:0;color:#17365f}.row-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.fulfillment-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0 12px}.fulfillment-card{position:relative;border:1px solid #d7e3ef;border-radius:16px;padding:12px;background:#fff;cursor:pointer}.fulfillment-card input{position:absolute;opacity:0}.fulfillment-card:has(input:checked){background:#eef5ff;border-color:var(--blue)}.fulfillment-title{font-weight:950;color:var(--blue2);margin-bottom:4px}.fulfillment-desc{font-size:12px;color:#667085;line-height:1.35}.delivery-box{display:none;margin-top:10px;border:1px solid #d7e3ef;background:#f8fbff;border-radius:16px;padding:12px}.delivery-box.active{display:block}.route-point{border:1px solid #e0e8f2;background:#fff;border-radius:12px;padding:10px 11px;border-left:4px solid #ffd600;margin-bottom:10px}.route-point b{display:block;color:var(--blue2);font-size:12.5px;margin-bottom:4px}.map-box{margin-top:10px;border:1px solid #d7e8ff;border-radius:18px;padding:10px;background:#fff}.google-map-frame{width:100%;height:315px;border:0;border-radius:16px;background:#eaf2fb}.map-info,.delivery-route-summary{margin-top:8px;padding:9px 10px;border-radius:12px;background:#eef5ff;border:1px solid #d7e8ff;color:var(--blue2);font-size:12.5px;line-height:1.35}.gmaps-link{display:inline-flex;margin-top:6px;border-radius:999px;padding:7px 11px;background:#fff;border:1px solid #c9daed;color:var(--blue2);font-size:12px;font-weight:950}
.orders-wrap{max-width:1140px;margin:0 auto}.orders-titlebar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:6px 0 14px}.orders-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(285px,1fr));gap:12px}.order-card{background:linear-gradient(180deg,#f6f9fc,#eef3f8);border:1px solid #d7e2ef;border-radius:18px;padding:10px;box-shadow:0 6px 18px rgba(17,24,39,.07);position:relative;overflow:hidden}.order-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--blue)}.order-head{display:flex;justify-content:space-between;gap:8px;padding-left:4px;margin-bottom:8px}.order-code{font-size:12px;color:#7d91a8;font-weight:900}.order-title{margin:0;font-size:15px;color:#083b73}.order-status{border-radius:999px;padding:7px 10px;font-size:12px;font-weight:950;background:#e0efff;color:var(--blue2);height:max-content}.meta{font-size:12px;color:#52677d;display:grid;gap:4px;padding:0 4px 8px}.tags{display:flex;gap:6px;flex-wrap:wrap;padding:0 4px 8px}.tag{border-radius:999px;padding:5px 8px;font-size:11px;font-weight:900;background:#fff7cc;color:#7a5b00;border:1px solid #ffe37b}.panel{background:rgba(255,255,255,.75);border:1px solid #dbe6f1;border-radius:14px;padding:9px;margin:0 2px 8px;font-size:12.2px}.panel-title{font-weight:950;color:#29496d;margin-bottom:6px}.order-map{height:195px}
.admin-main{max-width:1320px;margin:0 auto;padding:20px}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}.tabs button{background:#fff;border:1px solid #d7e3ef;color:#17365f}.tabs button.active{background:var(--blue);color:#fff}.table-wrap{overflow:auto;background:#fff;border-radius:18px;border:1px solid var(--line);box-shadow:var(--shadow)}table{width:100%;border-collapse:collapse;font-size:13px}th,td{padding:11px;border-bottom:1px solid #edf2f7;text-align:left;vertical-align:middle}th{color:#17365f;background:#f8fbff}.thumb{width:52px;height:52px;border-radius:12px;background:#eef5ff;display:grid;place-items:center;font-size:28px;object-fit:cover}.kanban{display:grid;grid-template-columns:repeat(3,minmax(240px,1fr));gap:12px}.kcol{background:#fff;border:1px solid #d7e3ef;border-radius:18px;padding:12px;min-height:240px}.kcol h3{margin:0 0 10px;color:#17365f}.kcard{border:1px solid #e0e8f2;background:#f8fbff;border-radius:16px;padding:10px;margin-bottom:10px}.kcard-title{font-weight:950;color:#12385f;margin-bottom:4px}.kactions{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.kactions button,.kactions select{font-size:12px;padding:7px 9px;min-height:32px}.toast-root{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:90}.toast{background:#172033;color:#fff;border-radius:999px;padding:11px 16px;box-shadow:0 12px 28px rgba(0,0,0,.25);font-weight:800;font-size:13px}
@media(max-width:1050px){.product-row{grid-template-columns:repeat(2,1fr)}.hero{grid-template-columns:1fr}.topbar-inner{grid-template-columns:1fr;gap:8px}.brand{justify-content:center}}@media(max-width:720px){.product-row,.row-2,.row-3,.fulfillment-options,.kanban{grid-template-columns:1fr}.cart-panel{left:12px;right:12px;top:auto;bottom:90px;width:auto;max-height:58vh}.cart-panel.hidden-cart{transform:translateY(calc(100% + 120px))}.google-map-frame{height:245px}.main,.admin-main{padding-left:12px;padding-right:12px}.hero h1{font-size:30px}}

/* ===== Barra superior estilo Mercado Livre com categorias fixas ===== */
.ml-category-strip{
  background:#ffffff;
  border-bottom:1px solid #e3e8ef;
}
.ml-category-inner{
  max-width:1320px;
  margin:0 auto;
  padding:8px 20px;
  display:flex;
  align-items:center;
  gap:8px;
  overflow-x:auto;
  scrollbar-width:thin;
}
.ml-category-inner::-webkit-scrollbar{
  height:6px;
}
.ml-category-inner::-webkit-scrollbar-thumb{
  background:#cfd8e3;
  border-radius:999px;
}
.ml-cat-btn{
  background:#fff!important;
  border:1px solid #edf2f7!important;
  color:#425b76!important;
  border-radius:999px!important;
  padding:8px 13px!important;
  font-size:13px!important;
  font-weight:800!important;
  white-space:nowrap!important;
  box-shadow:none!important;
}
.ml-cat-btn:hover{
  background:#eef5ff!important;
  border-color:#cfe0f3!important;
  color:#003f8f!important;
}
.ml-cat-btn.active{
  background:#003f8f!important;
  border-color:#003f8f!important;
  color:#fff!important;
}
.nav{
  border-bottom:0!important;
}
.nav-inner{
  padding-top:7px!important;
  padding-bottom:7px!important;
}
@media(max-width:720px){
  .ml-category-inner{
    padding:8px 12px;
  }
  .ml-cat-btn{
    font-size:12.5px!important;
    padding:7px 11px!important;
  }
}


/* ===== Visual refinado estilo Mercado Livre ===== */
:root{
  --yellow:#fff159;
  --yellow-strong:#ffe600;
  --blue:#3483fa;
  --blue2:#2968c8;
  --ml-text:#333333;
  --ml-muted:#666666;
  --ml-bg:#ebebeb;
  --ml-line:#e6e6e6;
  --ml-card-shadow:0 1px 2px 0 rgba(0,0,0,.12);
}
body{
  background:var(--ml-bg)!important;
  color:var(--ml-text)!important;
}
.topbar{
  background:var(--yellow)!important;
  box-shadow:none!important;
  border-bottom:0!important;
}
.topbar-inner{
  max-width:1180px!important;
  padding:10px 16px!important;
  grid-template-columns:220px 1fr auto!important;
  gap:14px!important;
}
.brand{
  color:#2d3277!important;
}
.brand img{
  width:78px!important;
  height:44px!important;
}
.brand span{
  font-size:21px!important;
  font-weight:900!important;
}
.brand small{
  color:#6d6d6d!important;
  font-size:11px!important;
}
.search{
  background:#fff!important;
  border:0!important;
  border-radius:8px!important;
  box-shadow:0 1px 2px rgba(0,0,0,.15)!important;
  overflow:hidden!important;
}
.search input{
  font-size:15px!important;
  color:#333!important;
  padding:12px 14px!important;
}
.search input::placeholder{
  color:#999!important;
}
.search button{
  background:#fff!important;
  color:#666!important;
  min-width:52px!important;
  border-left:1px solid #eee!important;
}
.top-actions{
  gap:10px!important;
}
.top-actions .btn-light,
.top-actions .btn-primary{
  border-radius:8px!important;
  padding:10px 14px!important;
  font-size:13px!important;
  box-shadow:none!important;
}
.top-actions .btn-light{
  background:#ffffff!important;
  border:1px solid #e5e5e5!important;
  color:#333!important;
}
.top-actions .btn-primary{
  background:var(--blue)!important;
  color:#fff!important;
}

.ml-category-strip{
  background:var(--yellow)!important;
  border-bottom:1px solid rgba(0,0,0,.06)!important;
}
.ml-category-inner{
  max-width:1180px!important;
  padding:4px 16px 10px!important;
  gap:18px!important;
}
.ml-cat-btn{
  background:transparent!important;
  border:0!important;
  color:#666!important;
  padding:4px 0!important;
  border-radius:0!important;
  font-size:14px!important;
  font-weight:500!important;
}
.ml-cat-btn:hover{
  background:transparent!important;
  color:#333!important;
}
.ml-cat-btn.active{
  background:transparent!important;
  color:#333!important;
  font-weight:700!important;
}

.nav{
  background:#fff!important;
  border-bottom:1px solid var(--ml-line)!important;
}
.nav-inner{
  max-width:1180px!important;
  padding:10px 16px!important;
  gap:20px!important;
}
.nav button{
  background:transparent!important;
  border:0!important;
  color:#666!important;
  padding:0!important;
  font-weight:500!important;
  font-size:14px!important;
}
.nav button.active{
  color:#333!important;
  font-weight:700!important;
  background:transparent!important;
  border:0!important;
}

.main,
.admin-main{
  max-width:1180px!important;
  padding:16px!important;
}
.hero{
  background:linear-gradient(135deg,#fff4c4 0%, #fff 48%, #eaf2ff 100%)!important;
  color:#333!important;
  border-radius:6px!important;
  padding:24px!important;
  box-shadow:var(--ml-card-shadow)!important;
  border:1px solid #eee!important;
  grid-template-columns:1.2fr .9fr!important;
}
.hero h1{
  color:#333!important;
  font-size:34px!important;
  line-height:1.1!important;
  margin-top:4px!important;
}
.hero p{
  color:#666!important;
  font-size:15px!important;
}
.hero-card{
  background:#fff!important;
  border:1px solid #eee!important;
  color:#333!important;
  box-shadow:0 8px 20px rgba(52,131,250,.12)!important;
}
.hero-pill{
  background:#fff!important;
  color:#333!important;
  border:1px solid #e5e5e5!important;
  font-size:11px!important;
}

.section{
  margin-top:22px!important;
}
.section-head{
  margin-bottom:12px!important;
}
.section-head h2{
  color:#333!important;
  font-size:22px!important;
  font-weight:700!important;
}
.section-head a{
  color:var(--blue)!important;
  font-size:14px!important;
  font-weight:600!important;
}
.product-row{
  grid-template-columns:repeat(4,minmax(220px,1fr))!important;
  gap:14px!important;
}
.card{
  min-height:400px!important;
  border-radius:6px!important;
  border:1px solid #ededed!important;
  box-shadow:var(--ml-card-shadow)!important;
  overflow:hidden!important;
  transition:box-shadow .18s ease, transform .18s ease!important;
}
.card:hover{
  box-shadow:0 8px 24px rgba(0,0,0,.14)!important;
  transform:translateY(-2px)!important;
}
.card:before{
  display:none!important;
}
.card-img{
  height:180px!important;
  background:#fff!important;
  border-bottom:1px solid #f2f2f2!important;
}
.card-img img{
  max-width:150px!important;
  max-height:150px!important;
}
.placeholder{
  font-size:60px!important;
}
.card-body{
  padding:14px!important;
  gap:8px!important;
}
.card-top{
  align-items:center!important;
}
.status{
  border-radius:999px!important;
  padding:5px 9px!important;
  font-size:10.5px!important;
  letter-spacing:.2px!important;
}
.status.available{
  background:#e3f7e9!important;
  color:#0a7d34!important;
}
.status.low{
  background:#fff3cd!important;
  color:#7a5b00!important;
}
.status.unavailable{
  background:#fce8e6!important;
  color:#b3261e!important;
}
.qty{
  min-width:70px!important;
  border-radius:10px!important;
  background:#f5f5f5!important;
  border:1px solid #ececec!important;
}
.qty strong{
  color:#333!important;
  font-size:18px!important;
}
.qty span{
  color:#888!important;
  font-size:10px!important;
}
.name{
  color:#333!important;
  font-size:15px!important;
  font-weight:500!important;
  min-height:38px!important;
}
.code{
  color:#999!important;
  font-size:12px!important;
  font-weight:500!important;
}
.chip{
  background:#f5f5f5!important;
  border:1px solid #ebebeb!important;
  color:#666!important;
  font-size:11px!important;
  font-weight:700!important;
}
.avail{
  background:#fafafa!important;
  border:1px solid #efefef!important;
  border-radius:10px!important;
  padding:9px!important;
  color:#666!important;
}
.dot{
  background:#00a650!important;
}
.card-footer button{
  min-height:42px!important;
  border-radius:6px!important;
  font-size:14px!important;
}
.card-footer .btn-primary{
  background:var(--blue)!important;
}
.card-footer .btn-primary:hover{
  background:var(--blue2)!important;
}
.card-footer .muted{
  font-size:12px!important;
  color:#888!important;
}

.cart-fab{
  background:var(--blue)!important;
  border:3px solid #fff!important;
  box-shadow:0 8px 20px rgba(52,131,250,.35)!important;
}
.cart-count,
.badge{
  background:var(--yellow-strong)!important;
  color:#333!important;
  border-color:#fff!important;
}
.cart-panel{
  width:360px!important;
  border-radius:8px!important;
  box-shadow:0 8px 24px rgba(0,0,0,.18)!important;
  border:1px solid #e5e5e5!important;
}
.cart-head{
  background:#fff!important;
  color:#333!important;
  border:1px solid #eee!important;
  margin-bottom:12px!important;
}
.cart-item{
  background:#fff!important;
  border:1px solid #eee!important;
  border-radius:8px!important;
}
.cart-item b{
  color:#333!important;
}
.cart-fulfillment{
  color:#666!important;
}
.empty{
  background:#fff!important;
  border:1px dashed #ddd!important;
  color:#777!important;
}

.modal{
  border-radius:8px!important;
}
.modal-head h2{
  color:#333!important;
}
.field label{
  color:#333!important;
}
.gmaps-link{
  background:#fff!important;
  border:1px solid #ddd!important;
  color:var(--blue)!important;
}
.map-box,
.delivery-route-summary,
.map-info,
.panel,
.order-card,
.kcol,
.kcard,
.table-wrap{
  box-shadow:var(--ml-card-shadow)!important;
}
.order-card,
.kcol,
.kcard,
.table-wrap{
  border-radius:8px!important;
}
.order-card{
  background:#fff!important;
  border:1px solid #ededed!important;
}
.order-card:before{
  background:var(--blue)!important;
}
.order-status{
  background:#eaf2ff!important;
  color:var(--blue2)!important;
}
.panel{
  background:#fafafa!important;
  border:1px solid #ededed!important;
}
.tabs button.active{
  background:var(--blue)!important;
}
.table-wrap{
  border:1px solid #e8e8e8!important;
}
th{
  background:#fafafa!important;
  color:#333!important;
}
th,td{
  border-bottom:1px solid #f0f0f0!important;
}

@media(max-width:1050px){
  .topbar-inner{
    grid-template-columns:1fr!important;
  }
  .product-row{
    grid-template-columns:repeat(2,minmax(220px,1fr))!important;
  }
  .hero{
    grid-template-columns:1fr!important;
  }
}
@media(max-width:720px){
  .main,.admin-main{
    padding:12px!important;
  }
  .topbar-inner,
  .nav-inner{
    padding-left:12px!important;
    padding-right:12px!important;
  }
  .ml-category-inner{
    padding-left:12px!important;
    padding-right:12px!important;
  }
  .product-row{
    grid-template-columns:1fr!important;
  }
  .hero h1{
    font-size:28px!important;
  }
}


/* ===== Mapa interativo fluido ===== */
.interactive-map,
.order-interactive-map{
  width:100%;
  border-radius:16px;
  border:1px solid #d7e8ff;
  background:#eaf2fb;
  overflow:hidden;
  position:relative;
}
.interactive-map{
  height:360px;
  min-height:360px;
}
.order-interactive-map{
  height:240px;
  min-height:240px;
}
.leaflet-container{
  font-family:Aptos,'Segoe UI',Arial,sans-serif!important;
}
.leaflet-control-zoom a{
  color:#333!important;
  font-weight:900!important;
}
.map-actions-row{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  align-items:center;
  margin-top:8px;
}
.map-actions-row button,
.map-actions-row a{
  min-height:34px;
}
.map-loading{
  margin-top:8px;
  padding:9px 10px;
  border-radius:12px;
  background:#fff8d6;
  border:1px solid #ffe37b;
  color:#705600;
  font-size:12.5px;
  font-weight:800;
}
.map-ok{
  margin-top:8px;
  padding:9px 10px;
  border-radius:12px;
  background:#eef5ff;
  border:1px solid #d7e8ff;
  color:#003f8f;
  font-size:12.5px;
  line-height:1.35;
}
.map-error{
  margin-top:8px;
  padding:9px 10px;
  border-radius:12px;
  background:#fff1f1;
  border:1px solid #ffc9c9;
  color:#9f2020;
  font-size:12.5px;
  line-height:1.35;
}
@media(max-width:720px){
  .interactive-map{
    height:290px;
    min-height:290px;
  }
  .order-interactive-map{
    height:200px;
    min-height:200px;
  }
}


/* ===== Google Maps dentro do app, porém interativo ===== */
.google-map-fluid{
  width:100%;
  height:360px;
  min-height:360px;
  border:0;
  border-radius:16px;
  background:#eaf2fb;
  display:block;
  pointer-events:auto!important;
}
.google-map-fluid-wrap{
  position:relative;
  width:100%;
  border-radius:16px;
  overflow:hidden;
  border:1px solid #d7e8ff;
  background:#eaf2fb;
}
.order-google-map-fluid{
  height:240px;
  min-height:240px;
}
.map-hint{
  margin-top:8px;
  padding:8px 10px;
  border-radius:12px;
  background:#fff8d6;
  border:1px solid #ffe37b;
  color:#705600;
  font-size:12.5px;
  line-height:1.35;
  font-weight:700;
}
@media(max-width:720px){
  .google-map-fluid{
    height:290px;
    min-height:290px;
  }
  .order-google-map-fluid{
    height:200px;
    min-height:200px;
  }
}


/* ===== Correção final de funcionamento perfeito ===== */
button, a, input, select, textarea{-webkit-tap-highlight-color:transparent}
button:active{transform:translateY(0)!important}
.app-status-chip{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 10px;background:#e3f7e9;color:#0a7d34;border:1px solid #b7ebc6;font-size:12px;font-weight:900}
.checkout-alert{padding:10px 12px;border-radius:12px;border:1px solid #d7e8ff;background:#eef5ff;color:#003f8f;font-size:13px;margin:8px 0 12px}
.cart-panel{will-change:transform,opacity}
.modal-backdrop{overflow:auto}.modal{margin:auto}
.google-map-fluid{pointer-events:auto!important}


/* ===== DUAL_KANBAN_SEEL_TRUCK ===== */
.dual-kanban-wrap{display:grid;gap:18px}
.kanban-section-card{background:#fff;border:1px solid #e6ebf2;border-radius:18px;padding:16px;box-shadow:var(--ml-card-shadow)}
.kanban-section-title{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px}
.kanban-section-title h2{margin:0;color:var(--blue2);font-size:22px}
.delivery-kanban{grid-template-columns:repeat(4,minmax(230px,1fr))}
.pickup-card,.delivery-card{background:linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)}
.delivery-card .truck-tracker{margin:10px 0 4px}

.truck-tracker{margin:10px 0 12px;padding:14px 14px 12px;border-radius:18px;background:linear-gradient(180deg,#fff 0%,#fbfcff 100%);border:1px solid #e7eef8}
.truck-tracker-title{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;font-size:12px;font-weight:900;color:#183153}
.delivery-phase-badge{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;background:#eef4ff;border:1px solid #d7e6ff;color:#0b57b7;font-size:11px;font-weight:900}
.truck-track{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding-top:26px}
.truck-track::before{content:"";position:absolute;left:8%;right:8%;top:14px;height:10px;border-radius:999px;background:#dbe4ef}
.truck-track-fill{position:absolute;left:8%;top:14px;height:10px;border-radius:999px;background:linear-gradient(90deg,#2f6df6 0%,#5a88fb 30%,#f2c200 85%,#efb700 100%);transition:width .45s ease;overflow:hidden}
.truck-track-fill::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);transform:translateX(-100%);animation:trackerShine 2.6s linear infinite}
@keyframes trackerShine{to{transform:translateX(100%)}}
.truck-runner{position:absolute;top:-10px;transform:translateX(-50%);z-index:2;transition:left .45s ease}
.truck-svg{width:56px;height:32px;display:block;filter:drop-shadow(0 4px 8px rgba(0,0,0,.18));animation:truckFloat 1.5s ease-in-out infinite}
.truck-svg .wheel{transform-origin:center;animation:truckWheel 1s linear infinite}
@keyframes truckFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes truckWheel{to{transform:rotate(360deg)}}
.truck-step{position:relative;z-index:1;text-align:center;padding:0 4px}
.truck-step-dot{width:22px;height:22px;margin:24px auto 8px;border-radius:50%;background:#fff;border:4px solid #c8d2e0}
.truck-step.done .truck-step-dot{background:#2f6df6;border-color:#2f6df6}
.truck-step.active .truck-step-dot{background:#f2c200;border-color:#f2c200;box-shadow:0 0 0 10px rgba(242,194,0,.18)}
.truck-step-title{font-size:12px;font-weight:950;line-height:1.05;color:#1f2f46}
.truck-step-sub{margin-top:4px;font-size:10px;line-height:1.2;color:#6b7a90;font-weight:800}
.truck-step.pending .truck-step-title,.truck-step.pending .truck-step-sub{color:#7b8798}
.order-card .truck-tracker{margin-top:14px}
@media(max-width:1180px){.delivery-kanban{grid-template-columns:repeat(2,minmax(230px,1fr))}}
@media(max-width:720px){.delivery-kanban,.kanban{grid-template-columns:1fr!important}.truck-svg{width:48px;height:28px}.truck-step-title{font-size:11px}.truck-step-sub{font-size:9px}}


/* ===== KANBAN EM ABAS + CAMINHAO ANIMADO SOLICITANTE ===== */
.kanban-tab-shell{
  background:#fff;
  border:1px solid #e5e7eb;
  border-radius:18px;
  box-shadow:0 1px 2px rgba(0,0,0,.10);
  padding:16px;
}
.kanban-tab-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:14px;
  flex-wrap:wrap;
  margin-bottom:14px;
}
.kanban-tab-header h2{
  margin:0;
  color:#333;
  font-size:22px;
}
.kanban-switch{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  background:#f5f5f5;
  border:1px solid #e6e6e6;
  padding:6px;
  border-radius:999px;
}
.kanban-switch button{
  border-radius:999px!important;
  border:0!important;
  background:transparent!important;
  color:#666!important;
  padding:9px 14px!important;
  font-size:13px!important;
  font-weight:900!important;
}
.kanban-switch button.active{
  background:#3483fa!important;
  color:#fff!important;
  box-shadow:0 5px 12px rgba(52,131,250,.22)!important;
}
.kanban-current-info{
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
  margin-bottom:12px;
}
.kanban-current-info .pill{
  display:inline-flex;
  border-radius:999px;
  padding:7px 10px;
  background:#eef5ff;
  border:1px solid #d7e8ff;
  color:#2968c8;
  font-size:12px;
  font-weight:900;
}
.kanban.delivery-kanban-tabs{
  grid-template-columns:repeat(4,minmax(230px,1fr))!important;
}
.kanban.pickup-kanban-tabs{
  grid-template-columns:repeat(3,minmax(240px,1fr))!important;
}
.kcard.delivery-card{
  border-left:4px solid #3483fa!important;
}
.kcard.pickup-card{
  border-left:4px solid #00a650!important;
}

/* Rastreamento com caminhão estilo e-commerce */
.truck-tracker{
  margin:12px 0 12px;
  padding:14px 14px 12px;
  border-radius:18px;
  background:linear-gradient(180deg,#fff 0%,#fbfcff 100%);
  border:1px solid #e7eef8;
  box-shadow:0 8px 22px rgba(28,63,120,.07);
}
.truck-tracker-title{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
  margin-bottom:13px;
  font-size:12px;
  font-weight:900;
  color:#183153;
}
.delivery-phase-badge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:6px 10px;
  border-radius:999px;
  background:#eef4ff;
  border:1px solid #d7e6ff;
  color:#0b57b7;
  font-size:11px;
  font-weight:900;
}
.truck-track{
  position:relative;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:0;
  padding-top:28px;
}
.truck-track::before{
  content:"";
  position:absolute;
  left:8%;
  right:8%;
  top:15px;
  height:10px;
  border-radius:999px;
  background:#dbe4ef;
}
.truck-track-fill{
  position:absolute;
  left:8%;
  top:15px;
  height:10px;
  border-radius:999px;
  background:linear-gradient(90deg,#2f6df6 0%,#5a88fb 28%,#f2c200 84%,#efb700 100%);
  transition:width .55s cubic-bezier(.22,.61,.36,1);
  overflow:hidden;
  z-index:1;
}
.truck-track-fill::after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.52),transparent);
  transform:translateX(-100%);
  animation:truckShine 2.4s linear infinite;
}
@keyframes truckShine{
  to{transform:translateX(100%)}
}
.truck-runner{
  position:absolute;
  top:-12px;
  transform:translateX(-50%);
  z-index:4;
  transition:left .55s cubic-bezier(.22,.61,.36,1);
}
.truck-svg{
  width:58px;
  height:34px;
  display:block;
  filter:drop-shadow(0 5px 8px rgba(0,0,0,.20));
  animation:truckFloat 1.45s ease-in-out infinite;
}
.truck-svg .wheel{
  transform-origin:center;
  animation:truckWheel 1s linear infinite;
}
@keyframes truckFloat{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-2px)}
}
@keyframes truckWheel{
  to{transform:rotate(360deg)}
}
.truck-step{
  position:relative;
  z-index:2;
  text-align:center;
  padding:0 4px;
}
.truck-step-dot{
  width:22px;
  height:22px;
  margin:25px auto 8px;
  border-radius:50%;
  background:#fff;
  border:4px solid #c8d2e0;
}
.truck-step.done .truck-step-dot{
  background:#2f6df6;
  border-color:#2f6df6;
}
.truck-step.active .truck-step-dot{
  background:#f2c200;
  border-color:#f2c200;
  box-shadow:0 0 0 10px rgba(242,194,0,.18);
}
.truck-step-title{
  font-size:12px;
  font-weight:950;
  line-height:1.05;
  color:#1f2f46;
}
.truck-step-sub{
  margin-top:4px;
  font-size:10px;
  line-height:1.2;
  color:#6b7a90;
  font-weight:800;
}
.truck-step.pending .truck-step-title,
.truck-step.pending .truck-step-sub{
  color:#7b8798;
}
.order-card .truck-tracker{
  margin-top:14px;
}
@media(max-width:1180px){
  .kanban.delivery-kanban-tabs,
  .kanban.pickup-kanban-tabs{
    grid-template-columns:repeat(2,minmax(230px,1fr))!important;
  }
}
@media(max-width:720px){
  .kanban.delivery-kanban-tabs,
  .kanban.pickup-kanban-tabs{
    grid-template-columns:1fr!important;
  }
  .truck-svg{
    width:50px;
    height:29px;
  }
  .truck-step-title{
    font-size:10.5px;
  }
  .truck-step-sub{
    font-size:9px;
  }
}


/* ===== Duas abas reais de Kanban de Pedidos no Admin ===== */
.admin-kanban-titlebar{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  flex-wrap:wrap;
  margin-bottom:14px;
}
.admin-kanban-titlebar h2{
  margin:0;
  color:#333;
  font-size:22px;
}
.admin-kanban-type-pill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  border-radius:999px;
  padding:8px 12px;
  background:#eef5ff;
  border:1px solid #d7e8ff;
  color:#2968c8;
  font-size:12px;
  font-weight:900;
}
.admin-main .tabs button[onclick*="kanbanRetirada"],
.admin-main .tabs button[onclick*="kanbanEntrega"]{
  font-weight:900!important;
}

</style>


</head>
<body>
<section id="loginPage" class="login-page"><div class="login-card"><div class="logo-wrap"><img class="logo-img" src="data:image/png;base64,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" alt="SEEL"><div class="logo-title">ObraStock<small>Almoxarifado Digital SEEL</small></div></div><div class="field"><label>E-mail</label><input id="loginEmail" value="solicitante@obra.com"></div><div class="field"><label>Senha</label><input id="loginPass" type="password" value="123456"></div><div class="login-actions"><button class="btn-primary" onclick="login('requester')">Entrar como solicitante</button><button class="btn-dark" onclick="login('admin')">Entrar como almoxarife/admin</button></div><p class="muted">Demo: solicitante@obra.com / almoxarife@obra.com</p></div></section>
<section id="appPage" class="hidden"><div id="topArea"></div><div id="mainArea"></div></section>
<div id="modalRoot" class="modal-root"></div><div id="toastRoot" class="toast-root"></div>
<script>const STORAGE_KEY='obrastock_clean_state_v1';
const CART_KEY='obrastock_clean_cart_v1';
const SEEL_SEDE_ADDRESS='Rua Açu, 1500 - Engenho do Porto, Duque de Caxias – RJ, 25010-000';
const DEFAULT_ITEMS=[{"id": 1, "name": "Camisa uniforme manga longa", "code": "UNI-001", "category": "Uniformes", "unit": "unidade", "qty": 120, "min": 25, "location": "Sede", "emoji": "👕", "active": true}, {"id": 2, "name": "Calça uniforme operacional", "code": "UNI-002", "category": "Uniformes", "unit": "unidade", "qty": 80, "min": 20, "location": "Sede", "emoji": "👖", "active": true}, {"id": 3, "name": "Detergente neutro 5L", "code": "LIM-001", "category": "Materiais de limpeza", "unit": "galão", "qty": 45, "min": 10, "location": "Sede", "emoji": "🧴", "active": true}, {"id": 4, "name": "Papel higiênico fardo", "code": "LIM-002", "category": "Materiais de limpeza", "unit": "fardo", "qty": 60, "min": 12, "location": "Sede", "emoji": "🧻", "active": true}, {"id": 5, "name": "Papel toalha interfolha", "code": "LIM-003", "category": "Materiais de limpeza", "unit": "pacote", "qty": 35, "min": 10, "location": "Sede", "emoji": "🧻", "active": true}, {"id": 6, "name": "Saco de lixo reforçado 100L", "code": "LIM-004", "category": "Materiais de limpeza", "unit": "pacote", "qty": 70, "min": 15, "location": "Sede", "emoji": "🗑️", "active": true}, {"id": 7, "name": "Café torrado 500g", "code": "CON-001", "category": "Uso e consumo", "unit": "pacote", "qty": 90, "min": 20, "location": "Sede", "emoji": "☕", "active": true}, {"id": 8, "name": "Açúcar refinado 1kg", "code": "CON-002", "category": "Uso e consumo", "unit": "pacote", "qty": 75, "min": 20, "location": "Sede", "emoji": "🍬", "active": true}, {"id": 9, "name": "Copo descartável 200ml", "code": "CON-003", "category": "Uso e consumo", "unit": "caixa", "qty": 55, "min": 12, "location": "Sede", "emoji": "🥤", "active": true}, {"id": 10, "name": "Filtro de café", "code": "CON-004", "category": "Uso e consumo", "unit": "caixa", "qty": 40, "min": 10, "location": "Sede", "emoji": "☕", "active": true}, {"id": 11, "name": "Beliche metálica", "code": "MOV-001", "category": "Móveis", "unit": "unidade", "qty": 12, "min": 4, "location": "Sede", "emoji": "🛏️", "active": true}, {"id": 12, "name": "Colchão solteiro", "code": "MOV-002", "category": "Móveis", "unit": "unidade", "qty": 20, "min": 5, "location": "Sede", "emoji": "🛏️", "active": true}, {"id": 13, "name": "Mesa de escritório", "code": "MOV-003", "category": "Móveis", "unit": "unidade", "qty": 15, "min": 4, "location": "Sede", "emoji": "🪑", "active": true}, {"id": 14, "name": "Cadeira operacional", "code": "MOV-004", "category": "Móveis", "unit": "unidade", "qty": 26, "min": 6, "location": "Sede", "emoji": "🪑", "active": true}, {"id": 15, "name": "Capacete de segurança", "code": "EPI-001", "category": "EPIs", "unit": "unidade", "qty": 160, "min": 30, "location": "Sede", "emoji": "⛑️", "active": true}, {"id": 16, "name": "Luva de proteção", "code": "EPI-002", "category": "EPIs", "unit": "par", "qty": 230, "min": 50, "location": "Sede", "emoji": "🧤", "active": true}, {"id": 17, "name": "Óculos de proteção", "code": "EPI-003", "category": "EPIs", "unit": "unidade", "qty": 95, "min": 25, "location": "Sede", "emoji": "🥽", "active": true}, {"id": 18, "name": "Protetor auricular", "code": "EPI-004", "category": "EPIs", "unit": "unidade", "qty": 180, "min": 40, "location": "Sede", "emoji": "🎧", "active": true}, {"id": 19, "name": "Ventilador de coluna", "code": "VEN-001", "category": "Ventiladores", "unit": "unidade", "qty": 14, "min": 4, "location": "Sede", "emoji": "🌀", "active": true}, {"id": 20, "name": "Resma de papel A4", "code": "ESC-001", "category": "Materiais de escritório", "unit": "resma", "qty": 85, "min": 20, "location": "Sede", "emoji": "📄", "active": true}, {"id": 21, "name": "Caneta esferográfica azul", "code": "ESC-002", "category": "Materiais de escritório", "unit": "caixa", "qty": 30, "min": 8, "location": "Sede", "emoji": "🖊️", "active": true}, {"id": 22, "name": "Prancheta acrílica", "code": "ESC-003", "category": "Materiais de escritório", "unit": "unidade", "qty": 38, "min": 10, "location": "Sede", "emoji": "📋", "active": true}];
const OBRAS=["OBRA 922", "OBRA 923", "OBRA 924", "OBRA 925", "OBRA 926", "OBRA 927", "OBRA 928", "OBRA 929", "OBRA 930", "OBRA 931", "OBRA 932", "OBRA 933", "OBRA 934", "OBRA 935", "OBRA 936", "OBRA 937", "OBRA 938", "OBRA 939", "OBRA 940", "OBRA 941", "OBRA 942", "OBRA 943", "OBRA 944", "OBRA 945", "OBRA 946", "OBRA 947", "OBRA 948", "OBRA 949", "OBRA 950", "OBRA 951", "OBRA 952", "OBRA 953", "OBRA 954", "OBRA 955", "OBRA 956", "OBRA 957", "OBRA 958", "OBRA 959", "OBRA 960", "OBRA 961", "OBRA 962", "OBRA 963", "OBRA 964", "OBRA 965", "OBRA 966", "OBRA 967", "OBRA 968", "OBRA 969", "OBRA 970", "OBRA 971", "Supply Chain", "Comercial", "Orçamento", "Recursos Humanos", "Departamento Pessoal", "QSMS", "Financeiro", "Engenharia", "Mobilização de Pessoal", "Equipamentos", "Planejamento", "Contabilidade", "Estratégia", "Jurídico", "Marketing", "Pessoas", "Ti"];
const STATUSES=['Solicitado','Em análise','Programado','Separado','Retirado/Entregue','Cancelado'];
const COMPANY_LOGO="data:image/png;base64,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";
let currentUser=null,activeTab='catalogo',adminSearch='',cart=[],state=loadState();
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const s=JSON.parse(raw);if(Array.isArray(s.items)&&Array.isArray(s.orders))return s}}catch(e){}return {items:DEFAULT_ITEMS,orders:[],settings:{email:'almoxarifado@seel.com.br',whatsapp:'5521999999999',message:'Olá, preciso falar sobre uma solicitação de materiais.'}}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function loadCart(){try{const raw=localStorage.getItem(CART_KEY);cart=raw?JSON.parse(raw):[];if(!Array.isArray(cart))cart=[]}catch(e){cart=[]}cart=cart.map(normalizeCart).filter(c=>getItem(c.itemId))}
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart.map(normalizeCart)))}
function clearCart(){cart=[];localStorage.removeItem(CART_KEY)}
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#039;")}
function toast(msg){toastRoot.innerHTML=\`<div class="toast">\${esc(msg)}</div>\`;setTimeout(()=>toastRoot.innerHTML='',2600)}
function fmtDate(d){if(!d)return'-';const [y,m,da]=String(d).slice(0,10).split('-');return da&&m&&y?\`\${da}/\${m}/\${y}\`:d}
function fmtDateTime(d){try{return new Date(d).toLocaleString('pt-BR')}catch(e){return '-'}}
function nowDate(){return new Date().toISOString().slice(0,10)}
function nowLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}
function getItem(id){return state.items.find(i=>String(i.id)===String(id))}
function getOrder(id){return state.orders.find(o=>String(o.id)===String(id))}
function normalizeCart(c){return {itemId:c.itemId,qty:Math.max(1,Number(c.qty||1)),date:c.date||nowDate(),note:c.note||'',fulfillmentType:c.fulfillmentType||'retirada_sede',deliveryOrigin:c.deliveryOrigin||SEEL_SEDE_ADDRESS,deliveryAddress:c.deliveryAddress||'',deliveryRouteUrl:c.deliveryRouteUrl||'',deliveryEmbedUrl:c.deliveryEmbedUrl||''}}
function fulfillmentLabel(t){return t==='entrega_obra'?'Entrega na obra com caminhão SEEL':'Retirada na sede'}
function fulfillmentIcon(t){return t==='entrega_obra'?'🚚':'🏢'}
function gmapsRoute(origin,dest){return \`https://www.google.com/maps/dir/?api=1&origin=\${encodeURIComponent(origin||SEEL_SEDE_ADDRESS)}&destination=\${encodeURIComponent(dest||'')}&travelmode=driving\`}
function gmapsEmbed(origin,dest){return dest?\`https://www.google.com/maps?f=d&source=s_d&saddr=\${encodeURIComponent(origin||SEEL_SEDE_ADDRESS)}&daddr=\${encodeURIComponent(dest)}&hl=pt-BR&output=embed\`:\`https://www.google.com/maps?q=\${encodeURIComponent(origin||SEEL_SEDE_ADDRESS)}&output=embed\`}
function routeSummary(origin,dest){if(!dest)return'';return \`<div class="delivery-route-summary"><b>Rota de entrega:</b><br>Origem: \${esc(origin||SEEL_SEDE_ADDRESS)}<br>Destino: \${esc(dest)}<br><a class="gmaps-link" target="_blank" href="\${gmapsRoute(origin,dest)}">Abrir rota no Google Maps</a></div>\`}

const TOP_CATEGORIES=['Uniformes','Materiais de limpeza','Uso e consumo','Móveis','EPIs','Ventiladores','Materiais de escritório'];
function chooseTopCategory(cat){
 activeTab='catalogo';
 renderApp();
 setTimeout(()=>{
  const input=document.getElementById('globalSearch');
  if(input){
   input.value=cat;
   renderRequester();
  }
  const first=document.querySelector('.section');
  if(first)first.scrollIntoView({behavior:'smooth',block:'start'});
 },50);
}
function topCategoryStrip(){
 if(currentUser?.role==='admin')return '';
 return \`<div class="ml-category-strip"><div class="ml-category-inner">
  \${TOP_CATEGORIES.map(c=>\`<button class="ml-cat-btn" onclick="chooseTopCategory('\${esc(c)}')">\${esc(c)}</button>\`).join('')}
 </div></div>\`;
}

function login(mode){const email=(loginEmail.value||'').trim()||(mode==='admin'?'almoxarife@obra.com':'solicitante@obra.com');currentUser={email,name:mode==='admin'?'Almoxarife':'Solicitante da Obra',role:mode==='admin'?'admin':'requester',phone:'',worksite:''};activeTab=currentUser.role==='admin'?'estoque':'catalogo';loginPage.classList.add('hidden');appPage.classList.remove('hidden');loadCart();renderApp();toast('Login realizado.')}
function logout(){currentUser=null;activeTab='catalogo';cart=[];topArea.innerHTML='';mainArea.innerHTML='';appPage.classList.add('hidden');loginPage.classList.remove('hidden');closeModal();toast('Sessão encerrada.')}
function renderApp(){if(!currentUser)return;loadCart();renderTop();if(currentUser.role==='admin')renderAdmin();else renderRequester()}
function renderTop(){const isAdmin=currentUser.role==='admin';topArea.innerHTML=\`<div class="topbar"><div class="topbar-inner"><div class="brand">\${COMPANY_LOGO?\`<img src="\${COMPANY_LOGO}" alt="SEEL">\`:''}<span>ObraStock<small>\${isAdmin?'Admin':'Marketplace interno'}</small></span></div><div class="search"><input id="globalSearch" placeholder="\${isAdmin?'Buscar pedidos ou materiais':'Buscar materiais, EPIs, limpeza...'}" oninput="\${isAdmin?'adminSearch=this.value;renderAdmin()':'renderRequester()'}"><button onclick="document.getElementById('globalSearch')?.focus()">⌕</button></div><div class="top-actions">\${!isAdmin?\`<button class="btn-light" onclick="activeTab='meusPedidos';renderApp()">Meus pedidos</button><button class="btn-primary" onclick="toggleCart(true)">Carrinho <span class="badge">\${cart.length}</span></button>\`:''}<button class="btn-light" onclick="logout()">Sair</button></div></div></div>\${topCategoryStrip()}<div class="nav"><div class="nav-inner">\${isAdmin?adminTabs():requesterTabs()}</div></div>\`}
function requesterTabs(){return ['catalogo|Catálogo','meusPedidos|Meus pedidos','contato|Contato'].map(x=>{const [k,l]=x.split('|');return \`<button class="\${activeTab===k?'active':''}" onclick="activeTab='\${k}';renderApp()">\${l}</button>\`}).join('')}
function adminTabs(){return ['estoque|Estoque','kanban|Kanban','agenda|Agenda','config|Configurações'].map(x=>{const [k,l]=x.split('|');return \`<button class="\${activeTab===k?'active':''}" onclick="activeTab='\${k}';renderApp()">\${l}</button>\`}).join('')}
function renderRequester(){if(activeTab==='catalogo')mainArea.innerHTML=catalogo();else if(activeTab==='meusPedidos')mainArea.innerHTML=meusPedidos();else if(activeTab==='contato')mainArea.innerHTML=contato();else{activeTab='catalogo';mainArea.innerHTML=catalogo()}}
function filteredItems(){const q=(document.getElementById('globalSearch')?.value||'').toLowerCase();return state.items.filter(i=>i.active!==false&&(i.name.toLowerCase().includes(q)||i.code.toLowerCase().includes(q)||i.category.toLowerCase().includes(q)))}
function catalogo(){const cats=[...new Set(state.items.filter(i=>i.active!==false).map(i=>i.category))],all=filteredItems();return \`<main class="main"><section class="hero"><div><span class="hero-pill">ESTOQUE ONLINE SEEL</span><h1>Seu marketplace interno de materiais para obras</h1><p>Pesquise materiais disponíveis, adicione ao carrinho, agende retirada na sede ou solicite entrega na obra com o caminhão da SEEL.</p><div class="hero-pills"><span class="hero-pill">Carrinho funcional</span><span class="hero-pill">Google Maps integrado</span><span class="hero-pill">Baixa de estoque</span></div></div><div class="hero-card"><div class="icon">📦</div><h3>Almoxarifado Digital</h3><p>Controle completo para solicitante e almoxarife.</p></div></section>\${cats.map(c=>{const items=all.filter(i=>i.category===c);if(!items.length)return'';return \`<section class="section"><div class="section-head"><h2>\${esc(c)}</h2><a onclick="document.getElementById('globalSearch').value='\${esc(c)}';renderRequester()">Ver categoria</a></div><div class="product-row">\${items.map(card).join('')}</div></section>\`}).join('')}<button class="cart-fab" onclick="toggleCart()"><span>🛒</span>\${cart.length?\`<span class="cart-count">\${cart.length}</span>\`:''}</button>\${cartPanel()}</main>\`}
function card(i){const unavailable=i.qty<=0||i.active===false,low=i.qty<=i.min&&i.qty>0,cls=unavailable?'unavailable':low?'low':'available';return \`<div class="card"><div class="card-img">\${i.image?\`<img src="\${esc(i.image)}">\`:\`<div class="placeholder">\${i.emoji||'📦'}</div>\`}</div><div class="card-body"><div class="card-top"><span class="status \${cls}">\${unavailable?'Indisponível':low?'Estoque baixo':'Disponível'}</span><div class="qty"><strong>\${i.qty}</strong><span>\${esc(i.unit)}</span></div></div><div class="name">\${esc(i.name)}</div><div class="code">Código \${esc(i.code)} • \${esc(i.location||'Sede')}</div><div class="chips"><span class="chip">\${esc(i.category)}</span><span class="chip">\${unavailable?'Consultar':'Retirada/entrega'}</span></div><div class="avail"><span class="dot"></span><div><b>\${unavailable?'Sem saldo':'Pronto para solicitação'}</b><br>\${unavailable?'Este item está indisponível.':\`Há \${i.qty} \${esc(i.unit)} disponíveis.\`}</div></div><div class="card-footer"><button class="btn-primary" \${unavailable?'disabled':''} onclick="openRequest(\${i.id})">\${unavailable?'Item indisponível':'Solicitar material'}</button><div class="muted">Escolha retirada ou entrega na obra.</div></div></div></div>\`}
function cartPanel(){return \`<aside id="cartPanel" class="cart-panel \${cart.length?'':'hidden-cart'}"><div class="cart-head"><b>🛒 Carrinho</b><span class="badge">\${cart.length}</span><button class="btn-light" onclick="toggleCart(false)">Fechar</button></div><div id="cartBox">\${cartHTML()}</div></aside>\`}
function toggleCart(force){const p=document.getElementById('cartPanel');if(!p)return;if(typeof force==='boolean')p.classList.toggle('hidden-cart',!force);else p.classList.toggle('hidden-cart');const b=document.getElementById('cartBox');if(b)b.innerHTML=cartHTML()}
function cartHTML(){if(!cart.length)return '<div class="empty">Seu carrinho está vazio.</div>';return cart.map((c,idx)=>{c=normalizeCart(c);const i=getItem(c.itemId)||{name:'Item removido',unit:''};return \`<div class="cart-item"><b>\${esc(i.name)}</b><div class="muted">Qtd.: \${c.qty} \${esc(i.unit||'')} • Data: \${fmtDate(c.date)}</div><div class="cart-fulfillment">\${fulfillmentIcon(c.fulfillmentType)} \${fulfillmentLabel(c.fulfillmentType)}</div>\${c.fulfillmentType==='entrega_obra'?routeSummary(c.deliveryOrigin,c.deliveryAddress):''}\${c.note?\`<div class="muted">Obs.: \${esc(c.note)}</div>\`:''}<button class="btn-light" onclick="removeCartItem(\${idx})">Remover</button></div>\`}).join('')+\`<button class="btn-green" style="width:100%" onclick="submitOrder()">Finalizar solicitação</button>\`}
function removeCartItem(idx){cart.splice(idx,1);saveCart();renderApp();setTimeout(()=>toggleCart(cart.length>0),80);toast('Item removido.')}

/* ===== Mapa fluido com Leaflet ===== */
const SEEL_SEDE_COORD={lat:-22.785831,lng:-43.300401};
let requestMapInstance=null;
let requestMapLayerGroup=null;
const mapGeoCache={};

function mapAvailable(){
 return typeof L!=='undefined';
}
function mapTile(){
 return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19,
  attribution:'© OpenStreetMap'
 });
}
function clearLeafletGroup(group){
 if(group)group.clearLayers();
}
function normalizeMapAddress(address){
 const raw=String(address||'').trim();
 if(!raw)return '';
 if(/brasil|brazil/i.test(raw))return raw;
 if(/rj|rio de janeiro|duque de caxias/i.test(raw))return raw+', Brasil';
 return raw+', Rio de Janeiro, RJ, Brasil';
}
async function geocodeMapAddress(address){
 const raw=String(address||'').trim();
 if(!raw)return null;
 if(raw===SEEL_SEDE_ADDRESS)return {lat:SEEL_SEDE_COORD.lat,lng:SEEL_SEDE_COORD.lng,label:SEEL_SEDE_ADDRESS};
 const key=raw.toLowerCase();
 if(mapGeoCache[key])return mapGeoCache[key];

 const queries=[normalizeMapAddress(raw), raw+', Brasil', raw].filter((v,i,a)=>v&&a.indexOf(v)===i);
 for(const q of queries){
  try{
   const url='https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&q='+encodeURIComponent(q);
   const res=await fetch(url,{headers:{'Accept':'application/json'}});
   if(!res.ok)continue;
   const data=await res.json();
   if(Array.isArray(data)&&data[0]){
    const geo={lat:Number(data[0].lat),lng:Number(data[0].lon),label:data[0].display_name||q};
    if(Number.isFinite(geo.lat)&&Number.isFinite(geo.lng)){
     mapGeoCache[key]=geo;
     return geo;
    }
   }
  }catch(e){
   console.warn('Geocoding falhou:',e);
  }
 }
 return null;
}
function ensureRequestMap(){
 const el=document.getElementById('interactiveMap');
 if(!el||!mapAvailable())return null;
 if(requestMapInstance){
  setTimeout(()=>requestMapInstance.invalidateSize(),80);
  return requestMapInstance;
 }
 requestMapInstance=L.map(el,{
  zoomControl:true,
  scrollWheelZoom:true,
  dragging:true,
  touchZoom:true,
  doubleClickZoom:true,
  boxZoom:true,
  keyboard:true
 }).setView([SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng],13);
 mapTile().addTo(requestMapInstance);
 requestMapLayerGroup=L.layerGroup().addTo(requestMapInstance);
 L.marker([SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng]).addTo(requestMapLayerGroup).bindPopup('Coleta • Sede SEEL');
 setTimeout(()=>requestMapInstance.invalidateSize(),120);
 return requestMapInstance;
}
function drawInteractiveRoute(map,group,destGeo,destinationAddress){
 if(!map||!group)return;
 clearLeafletGroup(group);
 const origin=[SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng];
 const dest=[destGeo.lat,destGeo.lng];
 const originMarker=L.marker(origin).addTo(group).bindPopup('Coleta • Sede SEEL');
 const destMarker=L.marker(dest).addTo(group).bindPopup('Entrega • Obra');
 const line=L.polyline([origin,dest],{weight:5,opacity:.85,color:'#3483fa'}).addTo(group);
 map.fitBounds(L.featureGroup([originMarker,destMarker,line]).getBounds().pad(0.22));
 const info=document.getElementById('mapInfo');
 if(info){
  info.innerHTML=\`<div class="map-ok"><b>Mapa interativo carregado.</b><br>Você pode arrastar, ampliar/reduzir e clicar nos marcadores de coleta e entrega.<div class="map-actions-row"><a class="gmaps-link" target="_blank" href="\${gmapsRoute(SEEL_SEDE_ADDRESS,destinationAddress)}">Abrir rota no Google Maps</a></div></div>\`;
 }
}
async function updateMap(){
 const addr=(document.getElementById('rqDeliveryAddress')?.value||'').trim();
 const frame=document.getElementById('mapFrame');
 const info=document.getElementById('mapInfo');
 if(!frame)return;
 frame.src=gmapsEmbed(SEEL_SEDE_ADDRESS,addr);
 if(info){
  info.innerHTML=addr
   ? \`Mapa Google Maps carregado com a rota da Sede SEEL até a obra.<br><a class="gmaps-link" target="_blank" href="\${gmapsRoute(SEEL_SEDE_ADDRESS,addr)}">Abrir rota no Google Maps</a>\`
   : 'Informe o endereço da obra para carregar a rota no Google Maps.';
 }
}
function destroyRequestMap(){
 if(requestMapInstance){
  requestMapInstance.remove();
  requestMapInstance=null;
  requestMapLayerGroup=null;
 }
}
function renderInteractiveOrderMaps(){
 if(!mapAvailable())return;
 document.querySelectorAll('.order-interactive-map').forEach(async el=>{
  if(el.dataset.ready==='1')return;
  const dest=el.dataset.destination||'';
  const map=L.map(el,{zoomControl:true,scrollWheelZoom:true,dragging:true,touchZoom:true,doubleClickZoom:true}).setView([SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng],12);
  mapTile().addTo(map);
  const group=L.layerGroup().addTo(map);
  L.marker([SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng]).addTo(group).bindPopup('Coleta • Sede SEEL');
  const geo=await geocodeMapAddress(dest);
  if(geo){
   const originMarker=L.marker([SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng]).addTo(group).bindPopup('Coleta • Sede SEEL');
   const destMarker=L.marker([geo.lat,geo.lng]).addTo(group).bindPopup('Entrega • Obra');
   const line=L.polyline([[SEEL_SEDE_COORD.lat,SEEL_SEDE_COORD.lng],[geo.lat,geo.lng]],{weight:4,opacity:.85,color:'#3483fa'}).addTo(group);
   map.fitBounds(L.featureGroup([originMarker,destMarker,line]).getBounds().pad(0.20));
  }
  el.dataset.ready='1';
  setTimeout(()=>map.invalidateSize(),120);
 });
}

function openRequest(id){const i=getItem(id);if(!i||i.qty<=0)return toast('Item indisponível.');const today=nowDate();openModal(\`<div class="modal-head"><div><h2>Solicitar material</h2><div class="muted">\${esc(i.name)} • Disponível: \${i.qty} \${esc(i.unit)}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Quantidade</label><input id="rqQty" type="number" min="1" max="\${i.qty}" value="1"></div><div class="field"><label id="rqDateLabel">Data desejada</label><input id="rqDate" type="date" min="\${today}" value="\${today}"></div></div><div class="field"><label>Forma de atendimento</label><div class="fulfillment-options"><label class="fulfillment-card"><input type="radio" name="fulfillmentType" value="retirada_sede" checked onchange="toggleDeliveryFields()"><div class="fulfillment-title">🏢 Retirar na sede</div><div class="fulfillment-desc">Solicitante retira os materiais na sede.</div></label><label class="fulfillment-card"><input type="radio" name="fulfillmentType" value="entrega_obra" onchange="toggleDeliveryFields()"><div class="fulfillment-title">🚚 Entrega na obra</div><div class="fulfillment-desc">Entrega com caminhão da SEEL.</div></label></div></div><div id="deliveryBox" class="delivery-box"><div class="route-point"><b>Origem fixa - Sede SEEL</b><span>\${SEEL_SEDE_ADDRESS}</span></div><div class="field"><label>Endereço completo da obra</label><textarea id="rqDeliveryAddress" oninput="updateMap()" placeholder="Rua, número, bairro, cidade, CEP e referência"></textarea></div><div class="map-box">
  <div id="mapInfo" class="map-info">Informe o endereço da obra para carregar a rota no Google Maps.</div>
  <div class="google-map-fluid-wrap">
    <iframe id="mapFrame" class="google-map-fluid" src="\${gmapsEmbed(SEEL_SEDE_ADDRESS,'')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  </div>
  <div class="map-hint">Use o mouse ou touch para ampliar, reduzir e arrastar o mapa. Para navegação completa, use o botão abaixo.</div>
  <div class="map-actions-row"><a class="gmaps-link" target="_blank" href="\${gmapsRoute(SEEL_SEDE_ADDRESS,'')}">Abrir Google Maps</a></div>
 </div></div><div class="field"><label>Observação</label><textarea id="rqNote" placeholder="Horário, responsável, ponto de referência ou urgência"></textarea></div><button class="btn-primary" style="width:100%" onclick="addCart(\${i.id})">Adicionar ao carrinho</button>\`)}
function toggleDeliveryFields(){const t=document.querySelector('input[name="fulfillmentType"]:checked')?.value||'retirada_sede';document.getElementById('deliveryBox')?.classList.toggle('active',t==='entrega_obra');document.getElementById('rqDateLabel').textContent=t==='entrega_obra'?'Data desejada para entrega na obra':'Data desejada para retirada na sede';if(t==='entrega_obra')setTimeout(()=>{ensureRequestMap();updateMap();},120)}
function updateMap(){const addr=(document.getElementById('rqDeliveryAddress')?.value||'').trim(),frame=document.getElementById('mapFrame'),info=document.getElementById('mapInfo');if(!frame)return;frame.src=gmapsEmbed(SEEL_SEDE_ADDRESS,addr);if(info)info.innerHTML=addr?\`Mapa carregado pelo Google Maps.<br><a class="gmaps-link" target="_blank" href="\${gmapsRoute(SEEL_SEDE_ADDRESS,addr)}">Abrir rota no Google Maps</a>\`:'Informe o endereço da obra para carregar a rota.'}
async function addCart(id){const i=getItem(id);if(!i)return toast('Item não encontrado.');const qty=Math.max(1,Number(document.getElementById('rqQty')?.value||1));if(qty>i.qty)return toast('Quantidade acima do estoque disponível.');const date=document.getElementById('rqDate')?.value||nowDate(),note=(document.getElementById('rqNote')?.value||'').trim(),fulfillmentType=document.querySelector('input[name="fulfillmentType"]:checked')?.value||'retirada_sede',deliveryAddress=(document.getElementById('rqDeliveryAddress')?.value||'').trim();if(fulfillmentType==='entrega_obra'&&!deliveryAddress)return toast('Informe o endereço da obra.');const item=normalizeCart({itemId:id,qty,date,note,fulfillmentType,deliveryOrigin:SEEL_SEDE_ADDRESS,deliveryAddress,deliveryRouteUrl:gmapsRoute(SEEL_SEDE_ADDRESS,deliveryAddress),deliveryEmbedUrl:gmapsEmbed(SEEL_SEDE_ADDRESS,deliveryAddress)});const existing=cart.find(c=>String(c.itemId)===String(item.itemId)&&c.date===item.date&&c.fulfillmentType===item.fulfillmentType&&c.deliveryAddress===item.deliveryAddress&&c.note===item.note);if(existing){const n=existing.qty+item.qty;if(n>i.qty)return toast('A soma ultrapassa o estoque.');existing.qty=n}else cart.push(item);saveCart();closeModal();renderApp();setTimeout(()=>toggleCart(true),100);toast('Item adicionado ao carrinho.')}
function submitOrder(){loadCart();if(!cart.length)return toast('Adicione itens ao carrinho.');for(const c of cart){const i=getItem(c.itemId);if(!i||i.qty<c.qty)return toast('Revise o carrinho: item indisponível ou acima do saldo.')}const resumo=cartHTML().replace('<button class="btn-green" style="width:100%" onclick="submitOrder()">Finalizar solicitação</button>','');openModal(\`<div class="modal-head"><div><h2>Finalizar solicitação</h2><div class="muted">Informe os dados para registrar o pedido.</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Nome</label><input id="checkoutName" value="\${esc(currentUser.name==='Solicitante da Obra'?'':currentUser.name)}"></div><div class="field"><label>E-mail</label><input id="checkoutEmail" value="\${esc(currentUser.email)}" type="email"></div></div><div class="row-2"><div class="field"><label>Telefone / WhatsApp</label><input id="checkoutPhone" value="\${esc(currentUser.phone||'')}"></div><div class="field"><label>Obra / Setor</label><select id="checkoutWorksite">\${OBRAS.map(o=>\`<option \${currentUser.worksite===o?'selected':''}>\${esc(o)}</option>\`).join('')}</select></div></div><h3>Resumo</h3>\${resumo}<button class="btn-green" style="width:100%;margin-top:8px" onclick="confirmSubmitOrder()">Enviar solicitação</button>\`)}
function confirmSubmitOrder(){const name=(document.getElementById('checkoutName')?.value||'').trim(),email=(document.getElementById('checkoutEmail')?.value||'').trim(),phone=(document.getElementById('checkoutPhone')?.value||'').trim(),worksite=document.getElementById('checkoutWorksite')?.value||'';if(!name)return toast('Informe o nome.');if(!email.includes('@'))return toast('Informe um e-mail válido.');if(!worksite)return toast('Selecione a obra/setor.');const first=normalizeCart(cart[0]);const order={id:Date.now(),number:'PED-'+String(state.orders.length+1).padStart(4,'0'),requester:email,requesterEmail:email,requesterName:name,requesterPhone:phone,worksite,status:'Solicitado',createdAt:new Date().toISOString(),desiredDate:first.date,fulfillmentType:first.fulfillmentType,deliveryOrigin:first.deliveryOrigin,deliveryAddress:first.deliveryAddress,deliveryRouteUrl:first.deliveryRouteUrl,deliveryEmbedUrl:first.deliveryEmbedUrl,confirmedDate:'',adminNote:'',items:cart.map(normalizeCart)};state.orders.unshift(order);currentUser.email=email;currentUser.name=name;currentUser.phone=phone;currentUser.worksite=worksite;clearCart();saveState();closeModal();activeTab='meusPedidos';renderApp();toast('Solicitação enviada ao almoxarife.')}
function meusPedidos(){const email=(currentUser.email||'').toLowerCase(),os=state.orders.filter(o=>String(o.requesterEmail||o.requester||'').toLowerCase()===email);return \`<main class="admin-main"><div class="orders-wrap"><div class="orders-titlebar"><div><h2>Meus pedidos</h2><div class="muted">Acompanhe retirada, entrega e status.</div></div><span class="badge">\${os.length}</span></div>\${os.length?\`<div class="orders-grid">\${os.map(orderHTML).join('')}</div>\`:'<div class="empty">Você ainda não fez nenhuma solicitação.</div>'}</div></main>\`}
function orderHTML(o){const total=(o.items||[]).reduce((a,c)=>a+Number(c.qty||0),0);return \`<div class="order-card"><div class="order-head"><div><div class="order-code">\${esc(o.number)}</div><h3 class="order-title">Solicitação de materiais</h3></div><div class="order-status">\${esc(o.status)}</div></div><div class="meta"><div>👤 \${esc(o.requesterName)}</div><div>🏗️ \${esc(o.worksite)}</div><div>📞 \${esc(o.requesterPhone||'-')}</div><div>🗓️ Solicitado em \${fmtDateTime(o.createdAt)}</div></div><div class="tags"><span class="tag">\${fmtDate(o.desiredDate)}</span><span class="tag">\${fulfillmentIcon(o.fulfillmentType)} \${fulfillmentLabel(o.fulfillmentType)}</span><span class="tag">\${total} itens</span></div>\${o.fulfillmentType==='entrega_obra'?routeSummary(o.deliveryOrigin,o.deliveryAddress):''}\${o.fulfillmentType==='entrega_obra'?\`<div class="map-box">
  <div class="google-map-fluid-wrap">
    <iframe class="google-map-fluid order-google-map-fluid" src="\${o.deliveryEmbedUrl||gmapsEmbed(o.deliveryOrigin,o.deliveryAddress)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  </div>
  <div class="map-hint">Mapa Google Maps interativo: amplie, reduza e arraste dentro do pedido.</div>
  <div class="map-actions-row"><a class="gmaps-link" target="_blank" href="\${gmapsRoute(o.deliveryOrigin,o.deliveryAddress)}">Abrir rota no Google Maps</a></div>
 </div>\`:''}<div class="panel"><div class="panel-title">Itens solicitados</div><ul>\${(o.items||[]).map(c=>{const i=getItem(c.itemId)||{name:'Item removido',unit:''};return \`<li>\${esc(i.name)}: <b>\${c.qty} \${esc(i.unit||'')}</b>\${c.note?' — '+esc(c.note):''}</li>\`}).join('')}</ul></div>\${o.adminNote?\`<div class="panel"><b>Observação:</b> \${esc(o.adminNote)}</div>\`:''}\${o.withdrawalDateTime?\`<div class="panel"><b>\${o.fulfillmentType==='entrega_obra'?'Entrega':'Retirada'} registrada</b><br>\${fmtDateTime(o.withdrawalDateTime)}<br>Responsável: \${esc(o.withdrawnBy||'-')}\${o.withdrawalPhoto?\`<br><img src="\${o.withdrawalPhoto}" style="max-width:160px;border-radius:10px;margin-top:8px">\`:''}</div>\`:''}<div class="kactions"><button class="btn-light" onclick="activeTab='contato';renderApp()">Contato</button></div></div>\`}
function contato(){const s=state.settings;return \`<main class="admin-main"><h2>Contato do almoxarife</h2><div class="orders-grid"><div class="panel"><h3>E-mail</h3><p>\${esc(s.email)}</p><a class="gmaps-link" href="mailto:\${esc(s.email)}">Enviar e-mail</a></div><div class="panel"><h3>WhatsApp</h3><p>\${esc(s.whatsapp)}</p><a class="gmaps-link" target="_blank" href="https://wa.me/\${esc(s.whatsapp)}?text=\${encodeURIComponent(s.message)}">Abrir WhatsApp</a></div></div></main>\`}
function renderAdmin(){mainArea.innerHTML=\`<main class="admin-main"><div class="tabs">\${adminTabs()}</div>\${activeTab==='estoque'?estoque():activeTab==='kanban'?kanban():activeTab==='agenda'?agenda():config()}</main>\`}
function estoque(){const q=(adminSearch||'').toLowerCase(),items=state.items.filter(i=>!q||i.name.toLowerCase().includes(q)||i.code.toLowerCase().includes(q)||i.category.toLowerCase().includes(q));return \`<div class="section-head"><div><h2>Controle de estoque</h2><div class="muted">Cadastre imagens, quantidades e disponibilidade.</div></div><button class="btn-primary" onclick="openItem()">Cadastrar item</button></div><div class="table-wrap"><table><thead><tr><th>Imagem</th><th>Item</th><th>Código</th><th>Categoria</th><th>Qtd.</th><th>Mín.</th><th>Local</th><th>Status</th><th>Ações</th></tr></thead><tbody>\${items.map(i=>\`<tr><td>\${i.image?\`<img class="thumb" src="\${esc(i.image)}">\`:\`<div class="thumb">\${i.emoji||'📦'}</div>\`}</td><td><b>\${esc(i.name)}</b></td><td>\${esc(i.code)}</td><td>\${esc(i.category)}</td><td class="\${i.qty<=i.min?'danger':''}">\${i.qty} \${esc(i.unit)}</td><td>\${i.min}</td><td>\${esc(i.location||'-')}</td><td>\${i.active!==false?'Ativo':'Inativo'}</td><td><button class="btn-light" onclick="openItem(\${i.id})">Editar</button> <button class="btn-light" onclick="quickQty(\${i.id})">Qtd.</button></td></tr>\`).join('')}</tbody></table></div>\`}
function openItem(id=null){const i=id?getItem(id):{id:null,name:'',code:'',category:'',unit:'unidade',qty:0,min:0,location:'Sede',emoji:'📦',image:'',active:true};openModal(\`<div class="modal-head"><div><h2>\${id?'Editar item':'Cadastrar item'}</h2></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Nome</label><input id="itName" value="\${esc(i.name)}"></div><div class="field"><label>Código</label><input id="itCode" value="\${esc(i.code)}"></div></div><div class="row-3"><div class="field"><label>Categoria</label><input id="itCat" value="\${esc(i.category)}"></div><div class="field"><label>Unidade</label><input id="itUnit" value="\${esc(i.unit)}"></div><div class="field"><label>Emoji</label><input id="itEmoji" value="\${esc(i.emoji)}"></div></div><div class="row-3"><div class="field"><label>Qtd.</label><input id="itQty" type="number" value="\${i.qty}"></div><div class="field"><label>Mínimo</label><input id="itMin" type="number" value="\${i.min}"></div><div class="field"><label>Local</label><input id="itLoc" value="\${esc(i.location||'')}"></div></div><div class="field"><label>URL da imagem</label><input id="itImage" value="\${esc(i.image||'')}"></div><div class="field"><label>Status</label><select id="itActive"><option value="true" \${i.active!==false?'selected':''}>Ativo</option><option value="false" \${i.active===false?'selected':''}>Inativo</option></select></div><button class="btn-primary" style="width:100%" onclick="saveItem(\${id||'null'})">Salvar cadastro</button>\`)}
function saveItem(id){const obj={id:id||Date.now(),name:itName.value.trim(),code:itCode.value.trim(),category:itCat.value.trim(),unit:itUnit.value.trim()||'unidade',qty:Number(itQty.value||0),min:Number(itMin.value||0),location:itLoc.value.trim(),emoji:itEmoji.value.trim()||'📦',image:itImage.value.trim(),active:itActive.value==='true'};if(!obj.name||!obj.code||!obj.category)return toast('Preencha nome, código e categoria.');const idx=state.items.findIndex(x=>String(x.id)===String(obj.id));if(idx>=0)state.items[idx]=obj;else state.items.unshift(obj);saveState();closeModal();renderApp();toast('Item salvo.')}
function quickQty(id){const i=getItem(id);if(!i)return;openModal(\`<div class="modal-head"><div><h2>Atualizar quantidade</h2><div class="muted">\${esc(i.name)}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="field"><label>Quantidade</label><input id="newQty" type="number" value="\${i.qty}"></div><button class="btn-primary" onclick="const it=getItem(\${id});it.qty=Number(newQty.value||0);saveState();closeModal();renderApp();toast('Quantidade atualizada.')">Atualizar</button>\`)}
function kanban(){return \`<div class="section-head"><div><h2>Kanban de pedidos</h2><div class="muted">Acompanhe solicitações por status.</div></div></div><div class="kanban">\${STATUSES.map(st=>\`<div class="kcol"><h3>\${st} <span class="badge">\${state.orders.filter(o=>o.status===st).length}</span></h3>\${state.orders.filter(o=>o.status===st).map(kcard).join('')||'<div class="empty">Sem pedidos</div>'}</div>\`).join('')}</div>\`}
function kcard(o){return \`<div class="kcard"><div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div><div class="muted">\${esc(o.worksite)}<br>\${fulfillmentIcon(o.fulfillmentType)} \${fulfillmentLabel(o.fulfillmentType)}<br>\${fmtDate(o.desiredDate)}</div><div class="kactions"><select onchange="changeStatus(\${o.id},this.value)">\${STATUSES.map(s=>\`<option \${o.status===s?'selected':''}>\${s}</option>\`).join('')}</select><button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>\${o.status!=='Retirado/Entregue'&&o.status!=='Cancelado'?\`<button class="btn-green" onclick="deliver(\${o.id})">Baixa</button>\`:''}</div></div>\`}
function changeStatus(id,st){const o=getOrder(id);if(!o)return;if(st==='Retirado/Entregue')return deliver(id);o.status=st;if(st==='Programado'||st==='Separado')o.confirmedDate=o.confirmedDate||o.desiredDate;saveState();renderApp();toast('Status atualizado.')}
function openOrder(id){const o=getOrder(id);if(!o)return;openModal(\`<div class="modal-head"><div><h2>\${esc(o.number)}</h2><div class="muted">\${esc(o.requesterName)} • \${esc(o.worksite)}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Status</label><select id="oStatus">\${STATUSES.map(s=>\`<option \${o.status===s?'selected':''}>\${s}</option>\`).join('')}</select></div><div class="field"><label>Data confirmada</label><input id="oDate" type="date" value="\${esc(o.confirmedDate||'')}"></div></div><div class="field"><label>Observação</label><textarea id="oNote">\${esc(o.adminNote||'')}</textarea></div>\${orderHTML(o)}<button class="btn-primary" style="width:100%" onclick="saveOrder(\${o.id})">Salvar pedido</button>\`)}
function saveOrder(id){const o=getOrder(id);if(!o)return;o.status=oStatus.value;o.confirmedDate=oDate.value;o.adminNote=oNote.value.trim();saveState();closeModal();renderApp();toast('Pedido salvo.')}
function deliver(id){const o=getOrder(id);if(!o)return;if(o.status==='Retirado/Entregue')return toast('Pedido já concluído.');openModal(\`<div class="modal-head"><div><h2>\${o.fulfillmentType==='entrega_obra'?'Confirmar entrega':'Confirmar retirada'}</h2><div class="muted">\${esc(o.number)}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Data e hora</label><input id="wdDateTime" type="datetime-local" value="\${nowLocal()}"></div><div class="field"><label>\${o.fulfillmentType==='entrega_obra'?'Responsável pelo recebimento':'Quem retirou'}</label><input id="wdBy"></div></div><div class="field"><label>Foto obrigatória</label><input id="wdPhoto" type="file" accept="image/*"></div><div class="panel"><b>Itens que serão baixados:</b><ul>\${(o.items||[]).map(c=>{const i=getItem(c.itemId)||{name:'Item removido',unit:''};return \`<li>\${esc(i.name)} — \${c.qty} \${esc(i.unit||'')}</li>\`}).join('')}</ul></div><button class="btn-green" style="width:100%" onclick="confirmDeliver(\${o.id})">Confirmar baixa</button>\`)}
function confirmDeliver(id){const o=getOrder(id);if(!o)return;const dt=wdDateTime.value,by=wdBy.value.trim(),file=wdPhoto.files[0];if(!dt)return toast('Informe data e hora.');if(!by)return toast('Informe o responsável.');if(!file)return toast('Anexe uma foto.');for(const c of o.items){const i=getItem(c.itemId);if(!i||i.qty<c.qty)return toast('Estoque insuficiente para baixa.')}const r=new FileReader();r.onload=()=>{for(const c of o.items){const i=getItem(c.itemId);i.qty=Math.max(0,i.qty-c.qty)}o.status='Retirado/Entregue';o.withdrawalDateTime=dt;o.withdrawnBy=by;o.withdrawalPhoto=r.result;saveState();closeModal();renderApp();toast('Baixa realizada com sucesso.')};r.readAsDataURL(file)}
function agenda(){return \`<h2>Agenda</h2><div class="orders-grid">\${state.orders.filter(o=>o.status!=='Retirado/Entregue'&&o.status!=='Cancelado').map(orderHTML).join('')||'<div class="empty">Sem agendamentos pendentes.</div>'}</div>\`}
function config(){const s=state.settings;return \`<h2>Configurações</h2><div class="panel"><div class="row-2"><div class="field"><label>E-mail</label><input id="cfgEmail" value="\${esc(s.email)}"></div><div class="field"><label>WhatsApp</label><input id="cfgWhats" value="\${esc(s.whatsapp)}"></div></div><div class="field"><label>Mensagem padrão</label><textarea id="cfgMsg">\${esc(s.message)}</textarea></div><button class="btn-primary" onclick="state.settings.email=cfgEmail.value;state.settings.whatsapp=cfgWhats.value;state.settings.message=cfgMsg.value;saveState();toast('Configurações salvas.')">Salvar</button></div>\`}
function openModal(html){modalRoot.innerHTML=\`<div class="modal-backdrop"><div class="modal">\${html}</div></div>\`}
function closeModal(){modalRoot.innerHTML=''}
window.addEventListener('error',e=>{console.error(e.message);toast('Erro tratado automaticamente.')})

/* ===== PERFECT_APP_RUNTIME_PATCH ===== */
(function(){
  function ensureState(){
    if(!state || typeof state!=='object') state={items:[],orders:[],settings:{}};
    if(!Array.isArray(state.items)) state.items=[];
    if(!Array.isArray(state.orders)) state.orders=[];
    if(!state.settings) state.settings={email:'almoxarifado@seel.com.br',whatsapp:'5521999999999',message:'Olá, preciso falar sobre uma solicitação de materiais.'};
  }
  function safeStorageSet(key,value){
    try{ localStorage.setItem(key,value); return true; }
    catch(e){ console.error('Falha no localStorage',e); toast('Não foi possível salvar no navegador.'); return false; }
  }
  window.saveState=function(){ensureState();return safeStorageSet(STORAGE_KEY,JSON.stringify(state));};
  window.loadCart=function(){
    try{
      const raw=localStorage.getItem(CART_KEY);
      const data=raw?JSON.parse(raw):[];
      cart=Array.isArray(data)?data.map(normalizeCart).filter(c=>getItem(c.itemId)):[];
    }catch(e){console.warn('Carrinho inválido, reiniciando.',e);cart=[];}
  };
  window.saveCart=function(){if(!Array.isArray(cart))cart=[];return safeStorageSet(CART_KEY,JSON.stringify(cart.map(normalizeCart)));};
  window.clearCart=function(){cart=[];try{localStorage.removeItem(CART_KEY)}catch(e){}};
  window.closeModal=function(){modalRoot.innerHTML='';};
  window.login=function(mode){
    const email=(document.getElementById('loginEmail')?.value||'').trim()||(mode==='admin'?'almoxarife@obra.com':'solicitante@obra.com');
    const isAdmin=mode==='admin'||email.toLowerCase().includes('almoxarife')||email.toLowerCase().includes('admin');
    currentUser={email,name:isAdmin?'Almoxarife':'Solicitante da Obra',role:isAdmin?'admin':'requester',phone:'',worksite:''};
    activeTab=isAdmin?'estoque':'catalogo';
    document.getElementById('loginPage')?.classList.add('hidden');
    document.getElementById('appPage')?.classList.remove('hidden');
    loadCart();renderApp();toast('Login realizado.');
  };
  window.logout=function(){
    currentUser=null;activeTab='catalogo';cart=[];
    if(window.topArea)topArea.innerHTML='';
    if(window.mainArea)mainArea.innerHTML='';
    document.getElementById('appPage')?.classList.add('hidden');
    document.getElementById('loginPage')?.classList.remove('hidden');
    closeModal();toast('Sessão encerrada.');
  };
  window.renderApp=function(){
    try{
      if(!currentUser)return;
      ensureState();
      loadCart();
      const allowed=currentUser.role==='admin'?['estoque','kanban','agenda','config']:['catalogo','meusPedidos','contato'];
      if(!allowed.includes(activeTab))activeTab=allowed[0];
      renderTop();
      if(currentUser.role==='admin')renderAdmin();else renderRequester();
    }catch(e){console.error(e);toast('Erro tratado automaticamente.');}
  };
  window.toggleCart=function(force){
    const panel=document.getElementById('cartPanel');
    const box=document.getElementById('cartBox');
    if(box)box.innerHTML=cartHTML();
    if(!panel)return;
    if(typeof force==='boolean')panel.classList.toggle('hidden-cart',!force);
    else panel.classList.toggle('hidden-cart');
  };
  window.cartHTML=function(){
    if(!Array.isArray(cart)||!cart.length)return '<div class="empty">Seu carrinho está vazio.</div>';
    return cart.map((raw,idx)=>{
      const c=normalizeCart(raw);
      const i=getItem(c.itemId)||{name:'Item removido',unit:''};
      return \`<div class="cart-item">
        <b>\${esc(i.name)}</b>
        <div class="muted">Qtd.: \${c.qty} \${esc(i.unit||'')} • Data: \${fmtDate(c.date)}</div>
        <div class="cart-fulfillment">\${fulfillmentIcon(c.fulfillmentType)} \${fulfillmentLabel(c.fulfillmentType)}</div>
        \${c.fulfillmentType==='entrega_obra'?routeSummary(c.deliveryOrigin,c.deliveryAddress):''}
        \${c.note?\`<div class="muted">Obs.: \${esc(c.note)}</div>\`:''}
        <button class="btn-light" onclick="removeCartItem(\${idx})">Remover</button>
      </div>\`;
    }).join('')+\`<button class="btn-green" style="width:100%" onclick="submitOrder()">Finalizar solicitação</button>\`;
  };
  window.removeCartItem=function(idx){
    loadCart();if(idx<0||idx>=cart.length)return;
    cart.splice(idx,1);saveCart();renderApp();
    setTimeout(()=>{if(cart.length)toggleCart(true)},80);
    toast('Item removido.');
  };
  window.updateMap=function(){
    const addr=(document.getElementById('rqDeliveryAddress')?.value||'').trim();
    const frame=document.getElementById('mapFrame');
    const info=document.getElementById('mapInfo');
    if(frame)frame.src=gmapsEmbed(SEEL_SEDE_ADDRESS,addr);
    const route=gmapsRoute(SEEL_SEDE_ADDRESS,addr);
    document.querySelectorAll('.map-actions-row a').forEach(a=>{a.href=route;});
    if(info){
      info.innerHTML=addr?\`Mapa Google Maps carregado com a rota da Sede SEEL até a obra.<br><a class="gmaps-link" target="_blank" href="\${route}">Abrir rota no Google Maps</a>\`:'Informe o endereço da obra para carregar a rota no Google Maps.';
    }
  };
  window.toggleDeliveryFields=function(){
    const t=document.querySelector('input[name="fulfillmentType"]:checked')?.value||'retirada_sede';
    document.getElementById('deliveryBox')?.classList.toggle('active',t==='entrega_obra');
    const lbl=document.getElementById('rqDateLabel');
    if(lbl)lbl.textContent=t==='entrega_obra'?'Data desejada para entrega na obra':'Data desejada para retirada na sede';
    if(t==='entrega_obra')setTimeout(updateMap,60);
  };
  window.addCart=async function(id){
    const i=getItem(id);
    if(!i||i.active===false||Number(i.qty)<=0)return toast('Item indisponível.');
    const qty=Math.max(1,Number(document.getElementById('rqQty')?.value||1));
    if(qty>Number(i.qty))return toast('Quantidade acima do estoque disponível.');
    const date=document.getElementById('rqDate')?.value||nowDate();
    const note=(document.getElementById('rqNote')?.value||'').trim();
    const fulfillmentType=document.querySelector('input[name="fulfillmentType"]:checked')?.value||'retirada_sede';
    const deliveryAddress=(document.getElementById('rqDeliveryAddress')?.value||'').trim();
    if(fulfillmentType==='entrega_obra'&&!deliveryAddress)return toast('Informe o endereço da obra.');
    loadCart();
    const item=normalizeCart({itemId:id,qty,date,note,fulfillmentType,deliveryOrigin:SEEL_SEDE_ADDRESS,deliveryAddress,deliveryRouteUrl:gmapsRoute(SEEL_SEDE_ADDRESS,deliveryAddress),deliveryEmbedUrl:gmapsEmbed(SEEL_SEDE_ADDRESS,deliveryAddress)});
    const existing=cart.find(c=>String(c.itemId)===String(item.itemId)&&c.date===item.date&&c.fulfillmentType===item.fulfillmentType&&c.deliveryAddress===item.deliveryAddress&&c.note===item.note);
    if(existing){const next=Number(existing.qty||0)+Number(item.qty||0);if(next>Number(i.qty))return toast('A soma ultrapassa o estoque.');existing.qty=next;}else cart.push(item);
    saveCart();closeModal();renderApp();setTimeout(()=>toggleCart(true),100);toast('Item adicionado ao carrinho.');
  };
  window.submitOrder=function(){
    loadCart();
    if(!cart.length)return toast('Adicione itens ao carrinho.');
    for(const c of cart){const i=getItem(c.itemId);if(!i||i.active===false)return toast('Existe item indisponível no carrinho.');if(Number(i.qty)<Number(c.qty))return toast(\`Estoque insuficiente para \${i.name}.\`);}
    const resumo=cart.map(raw=>{const c=normalizeCart(raw);const i=getItem(c.itemId)||{name:'Item removido',unit:''};return \`<div class="cart-item"><b>\${esc(i.name)}</b><div class="muted">Qtd.: \${c.qty} \${esc(i.unit||'')} • Data: \${fmtDate(c.date)}</div><div class="cart-fulfillment">\${fulfillmentIcon(c.fulfillmentType)} \${fulfillmentLabel(c.fulfillmentType)}</div>\${c.fulfillmentType==='entrega_obra'?routeSummary(c.deliveryOrigin,c.deliveryAddress):''}\${c.note?\`<div class="muted">Obs.: \${esc(c.note)}</div>\`:''}</div>\`;}).join('');
    openModal(\`<div class="modal-head"><div><h2>Finalizar solicitação</h2><div class="muted">Informe os dados para registrar o pedido.</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="checkout-alert">Após enviar, o pedido aparecerá automaticamente em <b>Meus pedidos</b> e no Kanban do almoxarife.</div><div class="row-2"><div class="field"><label>Nome</label><input id="checkoutName" value="\${esc(currentUser.name==='Solicitante da Obra'?'':currentUser.name)}"></div><div class="field"><label>E-mail</label><input id="checkoutEmail" value="\${esc(currentUser.email)}" type="email"></div></div><div class="row-2"><div class="field"><label>Telefone / WhatsApp</label><input id="checkoutPhone" value="\${esc(currentUser.phone||'')}"></div><div class="field"><label>Obra / Setor</label><select id="checkoutWorksite">\${OBRAS.map(o=>\`<option \${currentUser.worksite===o?'selected':''}>\${esc(o)}</option>\`).join('')}</select></div></div><h3>Resumo</h3>\${resumo}<button class="btn-green" style="width:100%;margin-top:8px" onclick="confirmSubmitOrder()">Enviar solicitação</button>\`);
  };
  window.confirmSubmitOrder=function(){
    loadCart();
    if(!cart.length){closeModal();renderApp();return toast('O carrinho está vazio.');}
    const name=(document.getElementById('checkoutName')?.value||'').trim();
    const email=(document.getElementById('checkoutEmail')?.value||'').trim();
    const phone=(document.getElementById('checkoutPhone')?.value||'').trim();
    const worksite=document.getElementById('checkoutWorksite')?.value||'';
    if(!name)return toast('Informe o nome.');if(!email.includes('@'))return toast('Informe um e-mail válido.');if(!worksite)return toast('Selecione a obra/setor.');
    for(const c of cart){const i=getItem(c.itemId);if(!i||Number(i.qty)<Number(c.qty))return toast('Revise o carrinho: estoque insuficiente.');}
    const first=normalizeCart(cart[0]);
    const order={id:Date.now(),number:'PED-'+String((state.orders||[]).length+1).padStart(4,'0'),requester:email,requesterEmail:email,requesterName:name,requesterPhone:phone,worksite,status:'Solicitado',createdAt:new Date().toISOString(),desiredDate:first.date,fulfillmentType:first.fulfillmentType,deliveryOrigin:first.deliveryOrigin,deliveryAddress:first.deliveryAddress,deliveryRouteUrl:first.deliveryRouteUrl,deliveryEmbedUrl:first.deliveryEmbedUrl,confirmedDate:'',adminNote:'',items:cart.map(normalizeCart)};
    state.orders.unshift(order);currentUser.email=email;currentUser.name=name;currentUser.phone=phone;currentUser.worksite=worksite;clearCart();saveState();closeModal();activeTab='meusPedidos';renderApp();toast('Solicitação enviada ao almoxarife.');
  };
  window.meusPedidos=function(){
    const email=(currentUser?.email||'').toLowerCase();
    const os=(state.orders||[]).filter(o=>String(o.requesterEmail||o.requester||'').toLowerCase()===email);
    return \`<main class="admin-main"><div class="orders-wrap"><div class="orders-titlebar"><div><h2>Meus pedidos</h2><div class="muted">Acompanhe retirada, entrega e status.</div></div><span class="app-status-chip">Sistema OK</span></div>\${os.length?\`<div class="orders-grid">\${os.map(orderHTML).join('')}</div>\`:'<div class="empty">Você ainda não fez nenhuma solicitação.</div>'}</div></main>\`;
  };
  window.changeStatus=function(id,st){const o=getOrder(id);if(!o)return toast('Pedido não encontrado.');if(st==='Retirado/Entregue')return deliver(id);o.status=st;if(st==='Programado'||st==='Separado')o.confirmedDate=o.confirmedDate||o.desiredDate;saveState();renderApp();toast('Status atualizado.');};
  window.saveOrder=function(id){const o=getOrder(id);if(!o)return toast('Pedido não encontrado.');o.status=document.getElementById('oStatus')?.value||o.status;o.confirmedDate=document.getElementById('oDate')?.value||'';o.adminNote=(document.getElementById('oNote')?.value||'').trim();saveState();closeModal();renderApp();toast('Pedido salvo.');};
  window.confirmDeliver=function(id){
    const o=getOrder(id);if(!o)return toast('Pedido não encontrado.');if(o.status==='Retirado/Entregue')return toast('Pedido já concluído.');
    const dt=document.getElementById('wdDateTime')?.value||'',by=(document.getElementById('wdBy')?.value||'').trim(),file=document.getElementById('wdPhoto')?.files?.[0];
    if(!dt)return toast('Informe data e hora.');if(!by)return toast('Informe o responsável.');if(!file)return toast('Anexe uma foto.');
    for(const c of o.items||[]){const i=getItem(c.itemId);if(!i||Number(i.qty)<Number(c.qty))return toast('Estoque insuficiente para baixa.');}
    const r=new FileReader();
    r.onload=function(){for(const c of o.items||[]){const i=getItem(c.itemId);if(i)i.qty=Math.max(0,Number(i.qty)-Number(c.qty||0));}o.status='Retirado/Entregue';o.withdrawalDateTime=dt;o.withdrawnBy=by;o.withdrawalPhoto=r.result;saveState();closeModal();renderApp();toast('Baixa realizada com sucesso.');};
    r.onerror=function(){toast('Não foi possível carregar a foto.');};
    r.readAsDataURL(file);
  };
  window.addEventListener('unhandledrejection',function(e){console.warn('Erro assíncrono tratado:',e.reason);});
})();


/* ===== DUAL_KANBAN_SEEL_TRUCK ===== */
(function(){
  const PICKUP_STATUSES=['Solicitado','Em análise','Programado','Separado','Retirado/Entregue','Cancelado'];
  const DELIVERY_STATUSES=['Solicitado','Coleta','Em rota','Entregue'];
  const DELIVERY_META={
    'Solicitado':{title:'Solicitado',sub:'Pedido recebido'},
    'Coleta':{title:'Coleta',sub:'Coleta programada'},
    'Em rota':{title:'Em rota',sub:'Carga em trânsito'},
    'Entregue':{title:'Entregue',sub:'Entrega concluída'}
  };
  const truckSVG=\`<svg class="truck-svg" viewBox="0 0 120 68" aria-hidden="true"><rect x="14" y="18" rx="10" ry="10" width="64" height="28" fill="#28364f"></rect><rect x="78" y="25" rx="6" ry="6" width="24" height="21" fill="#28364f"></rect><rect x="81" y="19" rx="4" ry="4" width="15" height="10" fill="#7bb6ff"></rect><rect x="22" y="22" rx="4" ry="4" width="18" height="6" fill="#e8eef7"></rect><circle class="wheel" cx="34" cy="49" r="8.5" fill="#1c2433"></circle><circle cx="34" cy="49" r="3.3" fill="#c6d2e5"></circle><circle class="wheel" cx="79" cy="49" r="8.5" fill="#1c2433"></circle><circle cx="79" cy="49" r="3.3" fill="#c6d2e5"></circle></svg>\`;

  function deliveryLeft(idx){return ['8%','36%','64%','92%'][idx]||'8%'}
  function deliveryFill(idx){return ['0%','30%','60%','84%'][idx]||'0%'}

  window.getDeliveryStatus=function(order){
    if(!order) return 'Solicitado';
    if(order.fulfillmentType!=='entrega_obra') return order.status||'Solicitado';
    if(order.deliveryStatus && DELIVERY_STATUSES.includes(order.deliveryStatus)) return order.deliveryStatus;
    if(order.status==='Retirado/Entregue') return 'Entregue';
    if(DELIVERY_STATUSES.includes(order.status)) return order.status;
    return 'Solicitado';
  };

  window.truckTrackerHTML=function(order){
    if(!order || order.fulfillmentType!=='entrega_obra') return '';
    const status=getDeliveryStatus(order);
    const idx=Math.max(0,DELIVERY_STATUSES.indexOf(status));
    return \`<div class="truck-tracker">
      <div class="truck-tracker-title">
        <span>🚚 Acompanhamento da entrega SEEL</span>
        <span class="delivery-phase-badge">\${esc(status)}</span>
      </div>
      <div class="truck-track">
        <div class="truck-track-fill" style="width:\${deliveryFill(idx)}"></div>
        <div class="truck-runner" style="left:\${deliveryLeft(idx)}">\${truckSVG}</div>
        \${DELIVERY_STATUSES.map((step,i)=>{
          const cls=i<idx?'done':(i===idx?'active':'pending');
          return \`<div class="truck-step \${cls}">
            <div class="truck-step-dot"></div>
            <div class="truck-step-title">\${DELIVERY_META[step].title}</div>
            <div class="truck-step-sub">\${DELIVERY_META[step].sub}</div>
          </div>\`;
        }).join('')}
      </div>
    </div>\`;
  };

  window.orderHTML=function(o){
    const total=(o.items||[]).reduce((acc,item)=>acc+Number(item.qty||0),0);
    const displayStatus=o.fulfillmentType==='entrega_obra'?getDeliveryStatus(o):(o.status||'Solicitado');
    return \`<div class="order-card"><div class="order-head"><div><div class="order-code">\${esc(o.number)}</div><h3 class="order-title">Solicitação de materiais</h3></div><div class="order-status">\${esc(displayStatus)}</div></div><div class="meta"><div>👤 \${esc(o.requesterName)}</div><div>🏗️ \${esc(o.worksite)}</div><div>📞 \${esc(o.requesterPhone||'-')}</div><div>🗓️ Solicitado em \${fmtDateTime(o.createdAt)}</div></div><div class="tags"><span class="tag">\${fmtDate(o.desiredDate)}</span><span class="tag">\${fulfillmentIcon(o.fulfillmentType)} \${fulfillmentLabel(o.fulfillmentType)}</span><span class="tag">\${total} itens</span></div>\${o.fulfillmentType==='entrega_obra'?routeSummary(o.deliveryOrigin,o.deliveryAddress):''}\${o.fulfillmentType==='entrega_obra'?\`<div class="map-box"><div class="google-map-fluid-wrap"><iframe class="google-map-fluid order-google-map-fluid" src="\${o.deliveryEmbedUrl||gmapsEmbed(o.deliveryOrigin,o.deliveryAddress)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><div class="map-hint">Mapa Google Maps interativo: amplie, reduza e arraste dentro do pedido.</div><div class="map-actions-row"><a class="gmaps-link" target="_blank" href="\${gmapsRoute(o.deliveryOrigin,o.deliveryAddress)}">Abrir rota no Google Maps</a></div></div>\`:''}\${o.fulfillmentType==='entrega_obra'?truckTrackerHTML(o):''}<div class="panel"><div class="panel-title">Itens solicitados</div><ul>\${(o.items||[]).map(c=>{const i=getItem(c.itemId)||{name:'Item removido',unit:''};return \`<li>\${esc(i.name)}: <b>\${c.qty} \${esc(i.unit||'')}</b>\${c.note?' — '+esc(c.note):''}</li>\`}).join('')}</ul></div>\${o.adminNote?\`<div class="panel"><b>Observação:</b> \${esc(o.adminNote)}</div>\`:''}\${o.withdrawalDateTime?\`<div class="panel"><b>\${o.fulfillmentType==='entrega_obra'?'Entrega':'Retirada'} registrada</b><br>\${fmtDateTime(o.withdrawalDateTime)}<br>Responsável: \${esc(o.withdrawnBy||'-')}\${o.withdrawalPhoto?\`<br><img src="\${o.withdrawalPhoto}" style="max-width:160px;border-radius:10px;margin-top:8px">\`:''}</div>\`:''}<div class="kactions"><button class="btn-light" onclick="activeTab='contato';renderApp()">Contato</button></div></div>\`;
  };

  window.kcardPickup=function(o){
    return \`<div class="kcard pickup-card"><div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div><div class="muted">\${esc(o.worksite)}<br>\${fulfillmentIcon(o.fulfillmentType)} \${fulfillmentLabel(o.fulfillmentType)}<br>\${fmtDate(o.desiredDate)}</div><div class="kactions"><select onchange="changeStatus(\${o.id},this.value)">\${PICKUP_STATUSES.map(s=>\`<option \${o.status===s?'selected':''}>\${s}</option>\`).join('')}</select><button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>\${o.status!=='Retirado/Entregue'&&o.status!=='Cancelado'?\`<button class="btn-green" onclick="deliver(\${o.id})">Baixa</button>\`:''}</div></div>\`;
  };

  window.kcardDelivery=function(o){
    const displayStatus=getDeliveryStatus(o);
    return \`<div class="kcard delivery-card"><div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div><div class="muted">\${esc(o.worksite)}<br>🚚 Entrega com caminhão SEEL<br>\${fmtDate(o.desiredDate)}</div>\${truckTrackerHTML(o)}<div class="kactions"><select onchange="setDeliveryStatus(\${o.id},this.value)">\${DELIVERY_STATUSES.map(s=>\`<option \${displayStatus===s?'selected':''}>\${s}</option>\`).join('')}</select><button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>\${displayStatus!=='Entregue'?\`<button class="btn-green" onclick="deliver(\${o.id})">Confirmar entrega</button>\`:''}</div></div>\`;
  };

  window.kanban=function(){
    const pickupOrders=(state.orders||[]).filter(o=>o.fulfillmentType!=='entrega_obra');
    const deliveryOrders=(state.orders||[]).filter(o=>o.fulfillmentType==='entrega_obra');
    return \`<div class="section-head"><div><h2>Kanban de pedidos</h2><div class="muted">Fluxos separados para retirada e entrega com caminhão SEEL.</div></div></div><div class="dual-kanban-wrap"><div class="kanban-section-card"><div class="kanban-section-title"><div><h2>Retirada na sede</h2><div class="muted">Fases: Solicitado, Em análise, Programado, Separado, Retirado/Entregue e Cancelado.</div></div><span class="badge">\${pickupOrders.length}</span></div><div class="kanban">\${PICKUP_STATUSES.map(st=>\`<div class="kcol"><h3>\${st} <span class="badge">\${pickupOrders.filter(o=>(o.status||'Solicitado')===st).length}</span></h3>\${pickupOrders.filter(o=>(o.status||'Solicitado')===st).map(kcardPickup).join('')||'<div class="empty">Sem pedidos</div>'}</div>\`).join('')}</div></div><div class="kanban-section-card"><div class="kanban-section-title"><div><h2>Entrega com caminhão SEEL</h2><div class="muted">Fases: Solicitado, Coleta, Em rota e Entregue.</div></div><span class="badge">\${deliveryOrders.length}</span></div><div class="kanban delivery-kanban">\${DELIVERY_STATUSES.map(st=>\`<div class="kcol"><h3>\${st} <span class="badge">\${deliveryOrders.filter(o=>getDeliveryStatus(o)===st).length}</span></h3>\${deliveryOrders.filter(o=>getDeliveryStatus(o)===st).map(kcardDelivery).join('')||'<div class="empty">Sem entregas</div>'}</div>\`).join('')}</div></div></div>\`;
  };

  const originalChangeStatus=window.changeStatus;
  window.changeStatus=function(id,status){
    const o=getOrder(id);
    if(!o) return toast('Pedido não encontrado.');
    if(o.fulfillmentType==='entrega_obra') return setDeliveryStatus(id,status);
    if(status==='Retirado/Entregue') return deliver(id);
    o.status=status;
    if(status==='Programado'||status==='Separado') o.confirmedDate=o.confirmedDate||o.desiredDate;
    saveState(); renderApp(); toast('Status atualizado.');
  };

  window.setDeliveryStatus=function(id,status){
    const o=getOrder(id);
    if(!o) return toast('Pedido não encontrado.');
    if(status==='Entregue') return deliver(id);
    o.deliveryStatus=status;
    o.status=status;
    if(status==='Coleta'||status==='Em rota') o.confirmedDate=o.confirmedDate||o.desiredDate;
    saveState(); renderApp(); toast('Status da entrega atualizado.');
  };

  window.openOrder=function(id){
    const o=getOrder(id); if(!o) return;
    const isDelivery=o.fulfillmentType==='entrega_obra';
    const currentStatus=isDelivery?getDeliveryStatus(o):(o.status||'Solicitado');
    const statusList=isDelivery?DELIVERY_STATUSES:PICKUP_STATUSES;
    openModal(\`<div class="modal-head"><div><h2>\${esc(o.number)}</h2><div class="muted">\${esc(o.requesterName)} • \${esc(o.worksite)}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Status</label><select id="oStatus">\${statusList.map(s=>\`<option \${currentStatus===s?'selected':''}>\${s}</option>\`).join('')}</select></div><div class="field"><label>Data confirmada</label><input id="oDate" type="date" value="\${esc(o.confirmedDate||'')}"></div></div><div class="field"><label>Observação</label><textarea id="oNote">\${esc(o.adminNote||'')}</textarea></div>\${orderHTML(o)}<button class="btn-primary" style="width:100%" onclick="saveOrder(\${o.id})">Salvar pedido</button>\`);
  };

  window.saveOrder=function(id){
    const o=getOrder(id); if(!o) return toast('Pedido não encontrado.');
    const newStatus=document.getElementById('oStatus')?.value||o.status;
    if(o.fulfillmentType==='entrega_obra'){
      o.deliveryStatus=newStatus;
      o.status=newStatus==='Entregue'?'Retirado/Entregue':newStatus;
    } else {
      o.status=newStatus;
    }
    o.confirmedDate=document.getElementById('oDate')?.value||'';
    o.adminNote=(document.getElementById('oNote')?.value||'').trim();
    saveState(); closeModal(); renderApp(); toast('Pedido salvo.');
  };

  const originalConfirmSubmitOrder=window.confirmSubmitOrder;
  window.confirmSubmitOrder=function(){
    const before=(state.orders||[]).length;
    originalConfirmSubmitOrder();
    if((state.orders||[]).length>before){
      const newest=state.orders[0];
      if(newest && newest.fulfillmentType==='entrega_obra' && !newest.deliveryStatus){
        newest.deliveryStatus='Solicitado';
        newest.status='Solicitado';
        saveState();
        renderApp();
      }
    }
  };

  const originalConfirmDeliver=window.confirmDeliver;
  window.confirmDeliver=function(id){
    const o=getOrder(id);
    if(!o) return toast('Pedido não encontrado.');
    if(o.fulfillmentType!=='entrega_obra') return originalConfirmDeliver(id);
    const dt=document.getElementById('wdDateTime')?.value||'';
    const by=(document.getElementById('wdBy')?.value||'').trim();
    const file=document.getElementById('wdPhoto')?.files?.[0];
    if(!dt) return toast('Informe data e hora.');
    if(!by) return toast('Informe o responsável.');
    if(!file) return toast('Anexe uma foto.');
    for(const c of (o.items||[])){
      const i=getItem(c.itemId);
      if(!i || Number(i.qty)<Number(c.qty)) return toast('Estoque insuficiente para baixa.');
    }
    const reader=new FileReader();
    reader.onload=()=>{
      for(const c of (o.items||[])){
        const i=getItem(c.itemId);
        if(i) i.qty=Math.max(0,Number(i.qty)-Number(c.qty||0));
      }
      o.status='Retirado/Entregue';
      o.deliveryStatus='Entregue';
      o.withdrawalDateTime=dt;
      o.withdrawnBy=by;
      o.withdrawalPhoto=reader.result;
      saveState(); closeModal(); renderApp(); toast('Entrega confirmada com sucesso.');
    };
    reader.onerror=()=>toast('Não foi possível carregar a foto.');
    reader.readAsDataURL(file);
  };
})();

/* ===== KANBAN_ABAS_CAMINHAO_ANIMADO_PATCH ===== */
(function(){
  const PICKUP_STATUSES=['Solicitado','Em análise','Programado','Separado','Retirado/Entregue','Cancelado'];
  const DELIVERY_STATUSES=['Solicitado','Coleta','Em rota','Entregue'];
  const DELIVERY_META={
    'Solicitado':{title:'Solicitado',sub:'Pedido recebido'},
    'Coleta':{title:'Coleta',sub:'Coleta programada'},
    'Em rota':{title:'Em rota',sub:'Carga em trânsito'},
    'Entregue':{title:'Entregue',sub:'Entrega concluída'}
  };
  const truckSVG=\`<svg class="truck-svg" viewBox="0 0 120 68" aria-hidden="true">
    <rect x="14" y="18" rx="10" ry="10" width="64" height="28" fill="#28364f"></rect>
    <rect x="78" y="25" rx="6" ry="6" width="24" height="21" fill="#28364f"></rect>
    <rect x="81" y="19" rx="4" ry="4" width="15" height="10" fill="#7bb6ff"></rect>
    <rect x="22" y="22" rx="4" ry="4" width="18" height="6" fill="#e8eef7"></rect>
    <circle class="wheel" cx="34" cy="49" r="8.5" fill="#1c2433"></circle>
    <circle cx="34" cy="49" r="3.3" fill="#c6d2e5"></circle>
    <circle class="wheel" cx="79" cy="49" r="8.5" fill="#1c2433"></circle>
    <circle cx="79" cy="49" r="3.3" fill="#c6d2e5"></circle>
  </svg>\`;

  window.adminKanbanView = window.adminKanbanView || 'retirada';

  function isDeliveryOrder(order){
    return order && order.fulfillmentType==='entrega_obra';
  }

  window.getDeliveryStatus=function(order){
    if(!order) return 'Solicitado';
    if(!isDeliveryOrder(order)) return order.status || 'Solicitado';
    if(order.deliveryStatus && DELIVERY_STATUSES.includes(order.deliveryStatus)) return order.deliveryStatus;
    if(order.status==='Retirado/Entregue' || order.status==='Entregue') return 'Entregue';
    if(DELIVERY_STATUSES.includes(order.status)) return order.status;
    return 'Solicitado';
  };

  function deliveryIndex(status){
    const idx=DELIVERY_STATUSES.indexOf(status);
    return idx<0?0:idx;
  }
  function deliveryLeft(idx){return ['8%','36%','64%','92%'][idx]||'8%'}
  function deliveryFill(idx){return ['0%','30%','60%','84%'][idx]||'0%'}

  window.truckTrackerHTML=function(order){
    if(!isDeliveryOrder(order)) return '';
    const status=getDeliveryStatus(order);
    const idx=deliveryIndex(status);
    return \`<div class="truck-tracker">
      <div class="truck-tracker-title">
        <span>🚚 Acompanhamento da entrega SEEL</span>
        <span class="delivery-phase-badge">\${esc(status)}</span>
      </div>
      <div class="truck-track">
        <div class="truck-track-fill" style="width:\${deliveryFill(idx)}"></div>
        <div class="truck-runner" style="left:\${deliveryLeft(idx)}">\${truckSVG}</div>
        \${DELIVERY_STATUSES.map((step,i)=>{
          const cls=i<idx?'done':(i===idx?'active':'pending');
          return \`<div class="truck-step \${cls}">
            <div class="truck-step-dot"></div>
            <div class="truck-step-title">\${esc(DELIVERY_META[step].title)}</div>
            <div class="truck-step-sub">\${esc(DELIVERY_META[step].sub)}</div>
          </div>\`;
        }).join('')}
      </div>
    </div>\`;
  };

  window.setAdminKanbanView=function(view){
    window.adminKanbanView = view==='entrega' ? 'entrega' : 'retirada';
    activeTab='kanban';
    renderApp();
  };

  window.setDeliveryStatus=function(id,status){
    const order=getOrder(id);
    if(!order) return toast('Pedido não encontrado.');
    if(!isDeliveryOrder(order)) return changeStatus(id,status);
    if(!DELIVERY_STATUSES.includes(status)) return toast('Status inválido.');
    order.deliveryStatus=status;
    order.status = status==='Entregue' ? 'Retirado/Entregue' : status;
    if(status==='Coleta' || status==='Em rota') order.confirmedDate = order.confirmedDate || order.desiredDate;
    if(status==='Entregue') order.deliveryCompletedAt = order.deliveryCompletedAt || new Date().toISOString();
    saveState();
    renderApp();
    toast('Status da entrega atualizado.');
  };

  window.kanban=function(){
    const pickupOrders=(state.orders||[]).filter(o=>!isDeliveryOrder(o));
    const deliveryOrders=(state.orders||[]).filter(o=>isDeliveryOrder(o));
    const view=window.adminKanbanView==='entrega'?'entrega':'retirada';
    const currentOrders=view==='entrega'?deliveryOrders:pickupOrders;
    const statuses=view==='entrega'?DELIVERY_STATUSES:PICKUP_STATUSES;

    return \`<div class="kanban-tab-shell">
      <div class="kanban-tab-header">
        <div>
          <h2>Kanban do almoxarife</h2>
          <div class="muted">As solicitações entram automaticamente na aba correta de acordo com o tipo escolhido pelo solicitante.</div>
        </div>
        <div class="kanban-switch">
          <button class="\${view==='retirada'?'active':''}" onclick="setAdminKanbanView('retirada')">🏢 Retirada na Sede <span class="badge">\${pickupOrders.length}</span></button>
          <button class="\${view==='entrega'?'active':''}" onclick="setAdminKanbanView('entrega')">🚚 Entrega na obra com caminhão SEEL <span class="badge">\${deliveryOrders.length}</span></button>
        </div>
      </div>
      <div class="kanban-current-info">
        <span class="pill">\${view==='entrega'?'Entrega na obra com caminhão SEEL':'Retirada na Sede'}</span>
        <span class="muted">\${view==='entrega'?'Fases: Solicitado → Coleta → Em rota → Entregue':'Fases: Solicitado → Em análise → Programado → Separado → Retirado/Entregue → Cancelado'}</span>
      </div>
      <div class="kanban \${view==='entrega'?'delivery-kanban-tabs':'pickup-kanban-tabs'}">
        \${statuses.map(st=>{
          const filtered=currentOrders.filter(o=>view==='entrega'?getDeliveryStatus(o)===st:(o.status||'Solicitado')===st);
          return \`<div class="kcol">
            <h3>\${esc(st)} <span class="badge">\${filtered.length}</span></h3>
            \${filtered.length?filtered.map(o=>view==='entrega'?kcardDelivery(o):kcardPickup(o)).join(''):\`<div class="empty">\${view==='entrega'?'Sem entregas':'Sem pedidos'}</div>\`}
          </div>\`;
        }).join('')}
      </div>
    </div>\`;
  };

  window.kcardPickup=function(o){
    return \`<div class="kcard pickup-card">
      <div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div>
      <div class="muted">\${esc(o.worksite)}<br>🏢 Retirada na Sede<br>\${fmtDate(o.desiredDate)}</div>
      <div class="kactions">
        <select onchange="changeStatus(\${o.id},this.value)">\${PICKUP_STATUSES.map(s=>\`<option \${o.status===s?'selected':''}>\${esc(s)}</option>\`).join('')}</select>
        <button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>
        \${o.status!=='Retirado/Entregue'&&o.status!=='Cancelado'?\`<button class="btn-green" onclick="deliver(\${o.id})">Baixa</button>\`:''}
      </div>
    </div>\`;
  };

  window.kcardDelivery=function(o){
    const displayStatus=getDeliveryStatus(o);
    return \`<div class="kcard delivery-card">
      <div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div>
      <div class="muted">\${esc(o.worksite)}<br>🚚 Entrega com caminhão SEEL<br>\${fmtDate(o.desiredDate)}</div>
      \${truckTrackerHTML(o)}
      <div class="kactions">
        <select onchange="setDeliveryStatus(\${o.id},this.value)">\${DELIVERY_STATUSES.map(s=>\`<option \${displayStatus===s?'selected':''}>\${esc(s)}</option>\`).join('')}</select>
        <button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>
        \${displayStatus!=='Entregue'?\`<button class="btn-green" onclick="deliver(\${o.id})">Confirmar entrega</button>\`:''}
      </div>
    </div>\`;
  };

  window.orderHTML=function(o){
    const total=(o.items||[]).reduce((a,c)=>a+Number(c.qty||0),0);
    const displayStatus=isDeliveryOrder(o)?getDeliveryStatus(o):(o.status||'Solicitado');
    return \`<div class="order-card">
      <div class="order-head">
        <div><div class="order-code">\${esc(o.number)}</div><h3 class="order-title">Solicitação de materiais</h3></div>
        <div class="order-status">\${esc(displayStatus)}</div>
      </div>
      <div class="meta">
        <div>👤 \${esc(o.requesterName)}</div>
        <div>🏗️ \${esc(o.worksite)}</div>
        <div>📞 \${esc(o.requesterPhone||'-')}</div>
        <div>🗓️ Solicitado em \${fmtDateTime(o.createdAt)}</div>
      </div>
      <div class="tags">
        <span class="tag">\${fmtDate(o.desiredDate)}</span>
        <span class="tag">\${fulfillmentIcon(o.fulfillmentType)} \${fulfillmentLabel(o.fulfillmentType)}</span>
        <span class="tag">\${total} itens</span>
      </div>
      \${isDeliveryOrder(o)?routeSummary(o.deliveryOrigin,o.deliveryAddress):''}
      \${isDeliveryOrder(o)?\`<div class="map-box"><div class="google-map-fluid-wrap"><iframe class="google-map-fluid order-google-map-fluid" src="\${o.deliveryEmbedUrl||gmapsEmbed(o.deliveryOrigin,o.deliveryAddress)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><div class="map-hint">Mapa Google Maps interativo: amplie, reduza e arraste dentro do pedido.</div><div class="map-actions-row"><a class="gmaps-link" target="_blank" href="\${gmapsRoute(o.deliveryOrigin,o.deliveryAddress)}">Abrir rota no Google Maps</a></div></div>\`:''}
      \${isDeliveryOrder(o)?truckTrackerHTML(o):''}
      <div class="panel"><div class="panel-title">Itens solicitados</div><ul>\${(o.items||[]).map(c=>{const i=getItem(c.itemId)||{name:'Item removido',unit:''};return \`<li>\${esc(i.name)}: <b>\${c.qty} \${esc(i.unit||'')}</b>\${c.note?' — '+esc(c.note):''}</li>\`}).join('')}</ul></div>
      \${o.adminNote?\`<div class="panel"><b>Observação:</b> \${esc(o.adminNote)}</div>\`:''}
      \${o.withdrawalDateTime?\`<div class="panel"><b>\${isDeliveryOrder(o)?'Entrega':'Retirada'} registrada</b><br>\${fmtDateTime(o.withdrawalDateTime)}<br>Responsável: \${esc(o.withdrawnBy||'-')}\${o.withdrawalPhoto?\`<br><img src="\${o.withdrawalPhoto}" style="max-width:160px;border-radius:10px;margin-top:8px">\`:''}</div>\`:''}
      <div class="kactions"><button class="btn-light" onclick="activeTab='contato';renderApp()">Contato</button></div>
    </div>\`;
  };

  window.openOrder=function(id){
    const o=getOrder(id);
    if(!o) return;
    const delivery=isDeliveryOrder(o);
    const list=delivery?DELIVERY_STATUSES:PICKUP_STATUSES;
    const current=delivery?getDeliveryStatus(o):(o.status||'Solicitado');
    openModal(\`<div class="modal-head"><div><h2>\${esc(o.number)}</h2><div class="muted">\${esc(o.requesterName)} • \${esc(o.worksite)}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div>
      <div class="row-2">
        <div class="field"><label>Status</label><select id="oStatus">\${list.map(s=>\`<option \${current===s?'selected':''}>\${esc(s)}</option>\`).join('')}</select></div>
        <div class="field"><label>Data confirmada</label><input id="oDate" type="date" value="\${esc(o.confirmedDate||'')}"></div>
      </div>
      <div class="field"><label>Observação</label><textarea id="oNote">\${esc(o.adminNote||'')}</textarea></div>
      \${orderHTML(o)}
      <button class="btn-primary" style="width:100%" onclick="saveOrder(\${o.id})">Salvar pedido</button>\`);
  };

  window.saveOrder=function(id){
    const o=getOrder(id);
    if(!o) return toast('Pedido não encontrado.');
    const newStatus=document.getElementById('oStatus')?.value||o.status;
    if(isDeliveryOrder(o)){
      o.deliveryStatus=newStatus;
      o.status=newStatus==='Entregue'?'Retirado/Entregue':newStatus;
    }else{
      o.status=newStatus;
    }
    o.confirmedDate=document.getElementById('oDate')?.value||'';
    o.adminNote=(document.getElementById('oNote')?.value||'').trim();
    saveState();
    closeModal();
    renderApp();
    toast('Pedido salvo.');
  };

  const oldChangeStatus=window.changeStatus;
  window.changeStatus=function(id,status){
    const o=getOrder(id);
    if(o && isDeliveryOrder(o)) return setDeliveryStatus(id,status);
    return oldChangeStatus ? oldChangeStatus(id,status) : null;
  };

  const oldConfirmSubmitOrder=window.confirmSubmitOrder;
  window.confirmSubmitOrder=function(){
    const before=(state.orders||[]).length;
    oldConfirmSubmitOrder();
    if((state.orders||[]).length>before){
      const newest=state.orders[0];
      if(newest && isDeliveryOrder(newest)){
        newest.deliveryStatus='Solicitado';
        newest.status='Solicitado';
        saveState();
        renderApp();
      }
    }
  };

  const oldConfirmDeliver=window.confirmDeliver;
  window.confirmDeliver=function(id){
    const o=getOrder(id);
    if(!o || !isDeliveryOrder(o)) return oldConfirmDeliver(id);
    const dt=document.getElementById('wdDateTime')?.value||'';
    const by=(document.getElementById('wdBy')?.value||'').trim();
    const file=document.getElementById('wdPhoto')?.files?.[0];
    if(!dt) return toast('Informe data e hora.');
    if(!by) return toast('Informe o responsável.');
    if(!file) return toast('Anexe uma foto.');
    for(const c of (o.items||[])){
      const i=getItem(c.itemId);
      if(!i || Number(i.qty)<Number(c.qty)) return toast('Estoque insuficiente para baixa.');
    }
    const reader=new FileReader();
    reader.onload=()=>{
      for(const c of (o.items||[])){
        const i=getItem(c.itemId);
        if(i) i.qty=Math.max(0,Number(i.qty)-Number(c.qty||0));
      }
      o.status='Retirado/Entregue';
      o.deliveryStatus='Entregue';
      o.withdrawalDateTime=dt;
      o.withdrawnBy=by;
      o.withdrawalPhoto=reader.result;
      saveState();
      closeModal();
      renderApp();
      toast('Entrega confirmada com sucesso.');
    };
    reader.onerror=()=>toast('Não foi possível carregar a foto.');
    reader.readAsDataURL(file);
  };
})();

/* ===== ADMIN_DUAS_ABAS_KANBAN_PEDIDOS_PATCH ===== */
(function(){
  const PICKUP_STATUSES_REAL=['Solicitado','Em análise','Programado','Separado','Retirado/Entregue','Cancelado'];
  const DELIVERY_STATUSES_REAL=['Solicitado','Coleta','Em rota','Entregue'];

  function isDeliveryPedido(o){
    return o && o.fulfillmentType==='entrega_obra';
  }

  function ensureDeliveryStatusReal(o){
    if(!o)return 'Solicitado';
    if(o.deliveryStatus && DELIVERY_STATUSES_REAL.includes(o.deliveryStatus))return o.deliveryStatus;
    if(o.status==='Retirado/Entregue' || o.status==='Entregue')return 'Entregue';
    if(DELIVERY_STATUSES_REAL.includes(o.status))return o.status;
    return 'Solicitado';
  }

  window.getDeliveryStatus = window.getDeliveryStatus || ensureDeliveryStatusReal;

  const originalAdminTabsRealKanban = window.adminTabs || adminTabs;
  window.adminTabs=function(){
    const tabs=[
      ['estoque','Estoque'],
      ['kanbanRetirada','Kanban Retirada'],
      ['kanbanEntrega','Kanban Entrega SEEL'],
      ['agenda','Agenda'],
      ['config','Configurações']
    ];
    return tabs.map(([k,l])=>\`<button class="\${activeTab===k?'active':''}" onclick="activeTab='\${k}';renderApp()">\${l}</button>\`).join('');
  };

  const originalRenderAdminRealKanban = window.renderAdmin || renderAdmin;
  window.renderAdmin=function(){
    let content='';
    if(activeTab==='estoque')content=estoque();
    else if(activeTab==='kanbanRetirada')content=kanbanRetiradaPedidos();
    else if(activeTab==='kanbanEntrega')content=kanbanEntregaPedidos();
    else if(activeTab==='kanban')content=kanbanRetiradaPedidos();
    else if(activeTab==='agenda')content=agenda();
    else if(activeTab==='config')content=config();
    else{
      activeTab='estoque';
      content=estoque();
    }
    mainArea.innerHTML=\`<main class="admin-main"><div class="tabs">\${adminTabs()}</div>\${content}</main>\`;
  };

  const originalRenderAppRealKanban = window.renderApp || renderApp;
  window.renderApp=function(){
    try{
      if(!currentUser)return;
      loadCart();
      const adminAllowed=['estoque','kanbanRetirada','kanbanEntrega','kanban','agenda','config'];
      const requesterAllowed=['catalogo','meusPedidos','contato'];
      const allowed=currentUser.role==='admin'?adminAllowed:requesterAllowed;
      if(!allowed.includes(activeTab))activeTab=currentUser.role==='admin'?'estoque':'catalogo';
      if(activeTab==='kanban')activeTab='kanbanRetirada';
      renderTop();
      if(currentUser.role==='admin')renderAdmin();else renderRequester();
    }catch(e){
      console.error(e);
      toast('Erro tratado automaticamente.');
    }
  };

  window.kanbanRetiradaPedidos=function(){
    const pedidos=(state.orders||[]).filter(o=>!isDeliveryPedido(o));
    return \`<div class="admin-kanban-titlebar">
      <div>
        <h2>Kanban de Pedidos — Retirada na Sede</h2>
        <div class="muted">Somente solicitações marcadas como retirada na sede.</div>
      </div>
      <span class="admin-kanban-type-pill">🏢 \${pedidos.length} pedidos de retirada</span>
    </div>
    <div class="kanban pickup-kanban-tabs">
      \${PICKUP_STATUSES_REAL.map(st=>{
        const filtered=pedidos.filter(o=>(o.status||'Solicitado')===st);
        return \`<div class="kcol">
          <h3>\${esc(st)} <span class="badge">\${filtered.length}</span></h3>
          \${filtered.length?filtered.map(kcardPickupReal).join(''):'<div class="empty">Sem pedidos</div>'}
        </div>\`;
      }).join('')}
    </div>\`;
  };

  window.kanbanEntregaPedidos=function(){
    const pedidos=(state.orders||[]).filter(o=>isDeliveryPedido(o));
    return \`<div class="admin-kanban-titlebar">
      <div>
        <h2>Kanban de Pedidos — Entrega na obra com caminhão SEEL</h2>
        <div class="muted">Somente solicitações marcadas como entrega na obra com caminhão SEEL.</div>
      </div>
      <span class="admin-kanban-type-pill">🚚 \${pedidos.length} pedidos de entrega</span>
    </div>
    <div class="kanban delivery-kanban-tabs">
      \${DELIVERY_STATUSES_REAL.map(st=>{
        const filtered=pedidos.filter(o=>ensureDeliveryStatusReal(o)===st);
        return \`<div class="kcol">
          <h3>\${esc(st)} <span class="badge">\${filtered.length}</span></h3>
          \${filtered.length?filtered.map(kcardDeliveryReal).join(''):'<div class="empty">Sem entregas</div>'}
        </div>\`;
      }).join('')}
    </div>\`;
  };

  window.kcardPickupReal=function(o){
    return \`<div class="kcard pickup-card">
      <div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div>
      <div class="muted">\${esc(o.worksite)}<br>🏢 Retirada na Sede<br>\${fmtDate(o.desiredDate)}</div>
      <div class="kactions">
        <select onchange="changeStatus(\${o.id},this.value)">
          \${PICKUP_STATUSES_REAL.map(s=>\`<option \${o.status===s?'selected':''}>\${esc(s)}</option>\`).join('')}
        </select>
        <button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>
        \${o.status!=='Retirado/Entregue'&&o.status!=='Cancelado'?\`<button class="btn-green" onclick="deliver(\${o.id})">Baixa</button>\`:''}
      </div>
    </div>\`;
  };

  window.kcardDeliveryReal=function(o){
    const current=ensureDeliveryStatusReal(o);
    return \`<div class="kcard delivery-card">
      <div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName)}</div>
      <div class="muted">\${esc(o.worksite)}<br>🚚 Entrega com caminhão SEEL<br>\${fmtDate(o.desiredDate)}</div>
      \${typeof truckTrackerHTML==='function'?truckTrackerHTML(o):''}
      <div class="kactions">
        <select onchange="setDeliveryStatusReal(\${o.id},this.value)">
          \${DELIVERY_STATUSES_REAL.map(s=>\`<option \${current===s?'selected':''}>\${esc(s)}</option>\`).join('')}
        </select>
        <button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>
        \${current!=='Entregue'?\`<button class="btn-green" onclick="deliver(\${o.id})">Confirmar entrega</button>\`:''}
      </div>
    </div>\`;
  };

  window.setDeliveryStatusReal=function(id,status){
    const o=getOrder(id);
    if(!o)return toast('Pedido não encontrado.');
    if(!DELIVERY_STATUSES_REAL.includes(status))return toast('Status inválido.');
    o.deliveryStatus=status;
    o.status=status==='Entregue'?'Retirado/Entregue':status;
    if(status==='Coleta'||status==='Em rota')o.confirmedDate=o.confirmedDate||o.desiredDate;
    if(status==='Entregue')o.deliveryCompletedAt=o.deliveryCompletedAt||new Date().toISOString();
    saveState();
    renderApp();
    toast('Status da entrega atualizado.');
  };

  window.setDeliveryStatus=function(id,status){
    return setDeliveryStatusReal(id,status);
  };

  const oldChangeStatus2Kanban = window.changeStatus || changeStatus;
  window.changeStatus=function(id,status){
    const o=getOrder(id);
    if(o && isDeliveryPedido(o))return setDeliveryStatusReal(id,status);
    return oldChangeStatus2Kanban(id,status);
  };

  const oldConfirmSubmitOrder2Kanban = window.confirmSubmitOrder || confirmSubmitOrder;
  window.confirmSubmitOrder=function(){
    const before=(state.orders||[]).length;
    oldConfirmSubmitOrder2Kanban();
    if((state.orders||[]).length>before){
      const novo=state.orders[0];
      if(novo && isDeliveryPedido(novo)){
        novo.deliveryStatus='Solicitado';
        novo.status='Solicitado';
        saveState();
        renderApp();
      }
    }
  };
})();

/* ===== PATCH_VISUAL_DUAS_ABAS_KANBAN_ADMIN ===== */
(function(){
  const PICKUP_STATUSES=['Solicitado','Em análise','Programado','Separado','Retirado/Entregue','Cancelado'];
  const DELIVERY_STATUSES=['Solicitado','Coleta','Em rota','Entregue'];

  function isDelivery(o){return o && o.fulfillmentType==='entrega_obra';}
  function deliveryStatus(o){
    if(!o) return 'Solicitado';
    if(o.deliveryStatus && DELIVERY_STATUSES.includes(o.deliveryStatus)) return o.deliveryStatus;
    if(DELIVERY_STATUSES.includes(o.status)) return o.status;
    if(o.status==='Retirado/Entregue' || o.status==='Entregue') return 'Entregue';
    return 'Solicitado';
  }

  adminTabs = window.adminTabs = function(){
    return [
      ['estoque','Estoque'],
      ['kanbanRetirada','Kanban Retirada'],
      ['kanbanEntrega','Kanban Entrega SEEL'],
      ['agenda','Agenda'],
      ['config','Configurações']
    ].map(([k,l])=>\`<button class="\${activeTab===k?'active':''}" onclick="activeTab='\${k}';renderApp()">\${l}</button>\`).join('');
  };

  function adminHeader(title, subtitle){
    return \`<div class="section-head"><div><h2>\${title}</h2><div class="muted">\${subtitle}</div></div></div>\`;
  }

  function pickupCard(o){
    return \`<div class="kcard">
      <div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName||'-')}</div>
      <div class="muted">🏢 Retirada na Sede • \${esc(o.worksite||'-')}<br>Retirada desejada: \${fmtDate(o.desiredDate)}</div>
      <div class="kactions">
        <select onchange="changeStatus(\${o.id},this.value)">
          \${PICKUP_STATUSES.map(s=>\`<option \${o.status===s?'selected':''}>\${s}</option>\`).join('')}
        </select>
        <button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>
        \${o.status!=='Retirado/Entregue' && o.status!=='Cancelado' ? \`<button class="btn-green" onclick="deliver(\${o.id})">Baixa</button>\` : ''}
      </div>
    </div>\`;
  }

  function deliveryCard(o){
    const st=deliveryStatus(o);
    return \`<div class="kcard">
      <div class="kcard-title">\${esc(o.number)} • \${esc(o.requesterName||'-')}</div>
      <div class="muted">🚚 Entrega com caminhão SEEL • \${esc(o.worksite||'-')}<br>Entrega desejada: \${fmtDate(o.desiredDate)}</div>
      \${typeof truckTrackerHTML==='function' ? truckTrackerHTML(o) : ''}
      <div class="kactions">
        <select onchange="setDeliveryStatusAdmin(\${o.id},this.value)">
          \${DELIVERY_STATUSES.map(s=>\`<option \${st===s?'selected':''}>\${s}</option>\`).join('')}
        </select>
        <button class="btn-light" onclick="openOrder(\${o.id})">Abrir</button>
        \${st!=='Entregue' ? \`<button class="btn-green" onclick="deliver(\${o.id})">Confirmar entrega</button>\` : ''}
      </div>
    </div>\`;
  }

  kanbanRetiradaPedidos = window.kanbanRetiradaPedidos = function(){
    const pedidos=(state.orders||[]).filter(o=>!isDelivery(o));
    return \`\${adminHeader('Kanban de pedidos — Retirada na Sede','Acompanhe solicitações de retirada por status.')}
      <div class="kanban">
      \${PICKUP_STATUSES.map(st=>{
        const filtered=pedidos.filter(o=>(o.status||'Solicitado')===st);
        return \`<div class="kcol"><h3>\${st} <span class="badge">\${filtered.length}</span></h3>\${filtered.length?filtered.map(pickupCard).join(''):'<div class="empty">Sem pedidos</div>'}</div>\`;
      }).join('')}
      </div>\`;
  };

  kanbanEntregaPedidos = window.kanbanEntregaPedidos = function(){
    const pedidos=(state.orders||[]).filter(o=>isDelivery(o));
    return \`\${adminHeader('Kanban de pedidos — Entrega na obra com caminhão SEEL','Acompanhe solicitações de entrega por status.')}
      <div class="kanban">
      \${DELIVERY_STATUSES.map(st=>{
        const filtered=pedidos.filter(o=>deliveryStatus(o)===st);
        return \`<div class="kcol"><h3>\${st} <span class="badge">\${filtered.length}</span></h3>\${filtered.length?filtered.map(deliveryCard).join(''):'<div class="empty">Sem entregas</div>'}</div>\`;
      }).join('')}
      </div>\`;
  };

  setDeliveryStatusAdmin = window.setDeliveryStatusAdmin = function(id,status){
    const o=getOrder(id); if(!o) return toast('Pedido não encontrado.');
    o.fulfillmentType='entrega_obra';
    o.deliveryStatus=status;
    o.status = status==='Entregue' ? 'Retirado/Entregue' : status;
    if(status==='Coleta' || status==='Em rota') o.confirmedDate=o.confirmedDate || o.desiredDate;
    if(status==='Entregue') o.deliveryCompletedAt = new Date().toISOString();
    saveState(); renderApp(); toast('Status de entrega atualizado.');
  };

  const prevChange = changeStatus;
  changeStatus = window.changeStatus = function(id,status){
    const o=getOrder(id);
    if(o && isDelivery(o) && DELIVERY_STATUSES.includes(status)) return setDeliveryStatusAdmin(id,status);
    return prevChange(id,status);
  };

  renderAdmin = window.renderAdmin = function(){
    let content='';
    if(activeTab==='estoque') content=estoque();
    else if(activeTab==='kanbanRetirada') content=kanbanRetiradaPedidos();
    else if(activeTab==='kanbanEntrega') content=kanbanEntregaPedidos();
    else if(activeTab==='kanban') { activeTab='kanbanRetirada'; content=kanbanRetiradaPedidos(); }
    else if(activeTab==='agenda') content=agenda();
    else if(activeTab==='config') content=config();
    else { activeTab='estoque'; content=estoque(); }
    mainArea.innerHTML=\`<main class="admin-main"><div class="tabs">\${adminTabs()}</div>\${content}</main>\`;
  };

  renderTop = window.renderTop = function(){
    const isAdmin=currentUser.role==='admin';
    topArea.innerHTML=\`<div class="topbar"><div class="topbar-inner"><div class="brand">\${COMPANY_LOGO?\`<img src="\${COMPANY_LOGO}" alt="SEEL">\`:''}<span>ObraStock<small>\${isAdmin?'Admin':'Marketplace interno'}</small></span></div><div class="search"><input id="globalSearch" placeholder="\${isAdmin?'Buscar pedidos ou materiais':'Buscar materiais, EPIs, limpeza...'}" oninput="\${isAdmin?'adminSearch=this.value;renderAdmin()':'renderRequester()'}"><button onclick="document.getElementById('globalSearch')?.focus()">⌕</button></div><div class="top-actions">\${!isAdmin?\`<button class="btn-light" onclick="activeTab='meusPedidos';renderApp()">Meus pedidos</button><button class="btn-primary" onclick="toggleCart(true)">Carrinho <span class="badge">\${cart.length}</span></button>\`:''}<button class="btn-light" onclick="logout()">Sair</button></div></div></div>\${topCategoryStrip()}<div class="nav"><div class="nav-inner">\${isAdmin?adminTabs():requesterTabs()}</div></div>\`;
  };

  renderApp = window.renderApp = function(){
    try{
      if(!currentUser) return;
      loadCart();
      const adminAllowed=['estoque','kanbanRetirada','kanbanEntrega','kanban','agenda','config'];
      const requesterAllowed=['catalogo','meusPedidos','contato'];
      const allowed=currentUser.role==='admin'?adminAllowed:requesterAllowed;
      if(!allowed.includes(activeTab)) activeTab=currentUser.role==='admin'?'estoque':'catalogo';
      if(activeTab==='kanban') activeTab='kanbanRetirada';
      renderTop();
      if(currentUser.role==='admin') renderAdmin(); else renderRequester();
    }catch(err){ console.error(err); toast('Erro tratado automaticamente.'); }
  };
})();



/* === Patch: Kanban do almoxarife com 2 abas dentro da aba Kanban === */
window.adminKanbanTab = window.adminKanbanTab || 'retirada';

window.adminTabs = function(){
  const tabs=[
    ['estoque','Estoque'],
    ['kanban','Kanban'],
    ['agenda','Agenda'],
    ['config','Configurações']
  ];
  return tabs.map(([k,l])=>\`<button class="\${activeTab===k?'active':''}" onclick="activeTab='\${k}';renderApp()">\${l}</button>\`).join('');
};

window.kanbanPedidosComAbas = function(){
  const retiradaCount = (state.orders||[]).filter(o=>!isDeliveryPedido(o)).length;
  const entregaCount = (state.orders||[]).filter(o=>isDeliveryPedido(o)).length;
  const current = window.adminKanbanTab || 'retirada';
  const content = current==='entrega' ? kanbanEntregaPedidos() : kanbanRetiradaPedidos();
  return \`
    <div class="section-head" style="margin-bottom:10px">
      <div>
        <h2>Kanban de pedidos</h2>
        <div class="muted">Acompanhe solicitações por status, separadas por tipo de atendimento.</div>
      </div>
    </div>
    <div class="tabs admin-subtabs" style="margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <button class="\${current==='retirada'?'active':''}" onclick="adminKanbanTab='retirada';renderApp()">Kanban Retirada <span class='badge' style='margin-left:8px'>\${retiradaCount}</span></button>
      <button class="\${current==='entrega'?'active':''}" onclick="adminKanbanTab='entrega';renderApp()">Kanban Entrega SEEL <span class='badge' style='margin-left:8px'>\${entregaCount}</span></button>
    </div>
    \${content}
  \`;
};

window.renderAdmin = function(){
  if(activeTab==='kanbanRetirada'){
    activeTab='kanban';
    window.adminKanbanTab='retirada';
  }
  if(activeTab==='kanbanEntrega'){
    activeTab='kanban';
    window.adminKanbanTab='entrega';
  }

  let content='';
  if(activeTab==='estoque') content=estoque();
  else if(activeTab==='kanban') content=kanbanPedidosComAbas();
  else if(activeTab==='agenda') content=agenda();
  else if(activeTab==='config') content=config();
  else {
    activeTab='estoque';
    content=estoque();
  }
  mainArea.innerHTML = \`<main class="admin-main"><div class="tabs">\${adminTabs()}</div>\${content}</main>\`;
};

window.renderApp = function(){
  try{
    if(!currentUser) return;
    loadCart();
    const adminAllowed=['estoque','kanban','kanbanRetirada','kanbanEntrega','agenda','config'];
    const requesterAllowed=['catalogo','meusPedidos','contato'];
    const allowed = currentUser.role==='admin' ? adminAllowed : requesterAllowed;
    if(!allowed.includes(activeTab)) activeTab = currentUser.role==='admin' ? 'estoque' : 'catalogo';
    renderTop();
    if(currentUser.role==='admin') renderAdmin(); else renderRequester();
  }catch(e){
    console.error(e);
    toast('Erro tratado automaticamente.');
  }
};

/* === Supply Flow: frete automatico e cadastro de tamanhos === */
const SUPPLY_FREIGHT_STORAGE_KEY='gestao_fretes_solicitacoes_v1';
const DEFAULT_UNIFORM_SIZES=['PP','P','M','G','GG','XG','XXG'];

function jsString(value){
  return String(value??'').replace(/\\\\/g,'\\\\\\\\').replace(/'/g,"\\\\'");
}

function normalizePlainText(value){
  return String(value??'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().trim();
}

function parseItemSizes(value){
  const raw=Array.isArray(value)?value:String(value??'').split(',');
  return raw.map(v=>String(v??'').trim()).filter(Boolean);
}

function itemSizesArray(item){
  return parseItemSizes(item?.sizes || item?.tamanhos || item?.uniformSizes || '');
}

function itemSizesText(item){
  return itemSizesArray(item).join(', ');
}

function isUniformItem(item){
  const text=normalizePlainText(\`\${item?.category||''} \${item?.name||''}\`);
  return text.includes('uniforme') || text.includes('uniformes') || text.includes('camisa') || text.includes('calca');
}

function ensureUniformSizes(){
  let changed=false;
  (state.items||[]).forEach(item=>{
    if(!isUniformItem(item) || itemSizesArray(item).length) return;
    item.sizes=[...DEFAULT_UNIFORM_SIZES];
    item.tamanhos=[...DEFAULT_UNIFORM_SIZES];
    changed=true;
  });
  if(changed) saveState();
}

fulfillmentLabel = window.fulfillmentLabel = function(type){
  return type==='entrega_obra'?'Frete para obra':'Retirada na sede';
};

toggleDeliveryFields = window.toggleDeliveryFields = function(){
  const type=document.querySelector('input[name="fulfillmentType"]:checked')?.value||'retirada_sede';
  document.getElementById('deliveryBox')?.classList.toggle('active',type==='entrega_obra');
  const label=document.getElementById('rqDateLabel');
  if(label) label.textContent=type==='entrega_obra'?'Data desejada para o frete':'Data desejada para retirada';
  if(type==='entrega_obra') setTimeout(()=>{ensureRequestMap();updateMap();},120);
};

openRequest = window.openRequest = function(id){
  const item=getItem(id);
  if(!item||item.qty<=0) return toast('Item indisponivel.');
  const today=nowDate();
  const sizes=itemSizesText(item);
  openModal(\`<div class="modal-head"><div><h2>Solicitar material</h2><div class="muted">\${esc(item.name)} • Disponivel: \${item.qty} \${esc(item.unit)}\${sizes?\` • Tamanhos: \${esc(sizes)}\`:''}</div></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Quantidade</label><input id="rqQty" type="number" min="1" max="\${item.qty}" value="1"></div><div class="field"><label id="rqDateLabel">Data desejada para retirada</label><input id="rqDate" type="date" min="\${today}" value="\${today}"></div></div><div class="field"><label>Forma de atendimento</label><div class="fulfillment-options"><label class="fulfillment-card"><input type="radio" name="fulfillmentType" value="retirada_sede" checked onchange="toggleDeliveryFields()"><div class="fulfillment-title">Retirar</div><div class="fulfillment-desc">Solicitante retira os materiais na sede.</div></label><label class="fulfillment-card"><input type="radio" name="fulfillmentType" value="entrega_obra" onchange="toggleDeliveryFields()"><div class="fulfillment-title">Frete</div><div class="fulfillment-desc">Criar solicitacao ativa no Kanban de fretes.</div></label></div></div><div id="deliveryBox" class="delivery-box"><div class="route-point"><b>Origem fixa - Sede SEEL</b><span>\${SEEL_SEDE_ADDRESS}</span></div><div class="field"><label>Endereco de entrega do frete</label><textarea id="rqDeliveryAddress" oninput="updateMap()" placeholder="Rua, numero, bairro, cidade, CEP e referencia"></textarea></div><div class="map-box"><div id="mapInfo" class="map-info">Informe o endereco de entrega para carregar a rota.</div><div class="google-map-fluid-wrap"><iframe id="mapFrame" class="google-map-fluid" src="\${gmapsEmbed(SEEL_SEDE_ADDRESS,'')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><div class="map-hint">Use o mapa apenas como apoio de rota.</div><div class="map-actions-row"><a class="gmaps-link" target="_blank" href="\${gmapsRoute(SEEL_SEDE_ADDRESS,'')}">Abrir Google Maps</a></div></div></div><div class="field"><label>Observacao</label><textarea id="rqNote" placeholder="Horario, responsavel, ponto de referencia ou urgencia"></textarea></div><button class="btn-primary" style="width:100%" onclick="addCart(\${Number(id) || \`'\${jsString(id)}'\`})">Adicionar ao carrinho</button>\`);
};

card = window.card = function(item){
  const unavailable=item.qty<=0||item.active===false;
  const low=item.qty<=item.min&&item.qty>0;
  const cls=unavailable?'unavailable':low?'low':'available';
  const sizes=itemSizesText(item);
  return \`<div class="card"><div class="card-img">\${item.image?\`<img src="\${esc(item.image)}">\`:\`<div class="placeholder">\${item.emoji||'📦'}</div>\`}</div><div class="card-body"><div class="card-top"><span class="status \${cls}">\${unavailable?'Indisponivel':low?'Estoque baixo':'Disponivel'}</span><div class="qty"><strong>\${item.qty}</strong><span>\${esc(item.unit)}</span></div></div><div class="name">\${esc(item.name)}</div><div class="code">Codigo \${esc(item.code)} • \${esc(item.location||'Sede')}</div><div class="chips"><span class="chip">\${esc(item.category)}</span><span class="chip">\${unavailable?'Consultar':'Retirada/frete'}</span>\${sizes?\`<span class="chip">Tam.: \${esc(sizes)}</span>\`:''}</div><div class="avail"><span class="dot"></span><div><b>\${unavailable?'Sem saldo':'Pronto para solicitacao'}</b><br>\${unavailable?'Este item esta indisponivel.':\`Ha \${item.qty} \${esc(item.unit)} disponiveis.\`}</div></div><div class="card-footer"><button class="btn-primary" \${unavailable?'disabled':''} onclick="openRequest(\${Number(item.id) || \`'\${jsString(item.id)}'\`})">\${unavailable?'Item indisponivel':'Solicitar material'}</button><div class="muted">Escolha retirada ou frete.</div></div></div></div>\`;
};

estoque = window.estoque = function(){
  ensureUniformSizes();
  const q=(adminSearch||'').toLowerCase();
  const items=state.items.filter(item=>!q||item.name.toLowerCase().includes(q)||item.code.toLowerCase().includes(q)||item.category.toLowerCase().includes(q));
  return \`<div class="section-head"><div><h2>Controle de estoque</h2><div class="muted">Cadastre imagens, quantidades, disponibilidade e tamanhos de uniformes.</div></div><button class="btn-primary" onclick="openItem()">Cadastrar item</button></div><div class="table-wrap"><table><thead><tr><th>Imagem</th><th>Item</th><th>Codigo</th><th>Categoria</th><th>Tamanhos</th><th>Qtd.</th><th>Min.</th><th>Local</th><th>Status</th><th>Acoes</th></tr></thead><tbody>\${items.map(item=>\`<tr><td>\${item.image?\`<img class="thumb" src="\${esc(item.image)}">\`:\`<div class="thumb">\${item.emoji||'📦'}</div>\`}</td><td><b>\${esc(item.name)}</b></td><td>\${esc(item.code)}</td><td>\${esc(item.category)}</td><td>\${esc(itemSizesText(item)||'-')}</td><td class="\${item.qty<=item.min?'danger':''}">\${item.qty} \${esc(item.unit)}</td><td>\${item.min}</td><td>\${esc(item.location||'-')}</td><td>\${item.active!==false?'Ativo':'Inativo'}</td><td><button class="btn-light" onclick="openItem(\${Number(item.id) || \`'\${jsString(item.id)}'\`})">Editar</button> <button class="btn-light" onclick="quickQty(\${Number(item.id) || \`'\${jsString(item.id)}'\`})">Qtd.</button></td></tr>\`).join('')}</tbody></table></div>\`;
};

openItem = window.openItem = function(id=null){
  const item=id?getItem(id):{id:null,name:'',code:'',category:'',unit:'unidade',qty:0,min:0,location:'Sede',emoji:'📦',image:'',active:true,sizes:[]};
  const saveArg=id?\`'\${jsString(id)}'\`:'null';
  openModal(\`<div class="modal-head"><div><h2>\${id?'Editar item':'Cadastrar item'}</h2></div><button class="btn-light" onclick="closeModal()">Fechar</button></div><div class="row-2"><div class="field"><label>Nome</label><input id="itName" value="\${esc(item.name)}"></div><div class="field"><label>Codigo</label><input id="itCode" value="\${esc(item.code)}"></div></div><div class="row-3"><div class="field"><label>Categoria</label><input id="itCat" value="\${esc(item.category)}"></div><div class="field"><label>Unidade</label><input id="itUnit" value="\${esc(item.unit)}"></div><div class="field"><label>Emoji</label><input id="itEmoji" value="\${esc(item.emoji)}"></div></div><div class="row-3"><div class="field"><label>Qtd.</label><input id="itQty" type="number" value="\${item.qty}"></div><div class="field"><label>Minimo</label><input id="itMin" type="number" value="\${item.min}"></div><div class="field"><label>Local</label><input id="itLoc" value="\${esc(item.location||'')}"></div></div><div class="field"><label>Tamanhos de uniforme</label><input id="itSizes" value="\${esc(itemSizesText(item))}" placeholder="PP, P, M, G, GG, XG"><div class="muted">Opcional. Use para uniformes e separe por virgula.</div></div><div class="field"><label>URL da imagem</label><input id="itImage" value="\${esc(item.image||'')}"></div><div class="field"><label>Status</label><select id="itActive"><option value="true" \${item.active!==false?'selected':''}>Ativo</option><option value="false" \${item.active===false?'selected':''}>Inativo</option></select></div><button class="btn-primary" style="width:100%" onclick="saveItem(\${saveArg})">Salvar cadastro</button>\`);
};

saveItem = window.saveItem = function(id){
  const sizes=parseItemSizes(document.getElementById('itSizes')?.value||'');
  const obj={id:id||Date.now(),name:itName.value.trim(),code:itCode.value.trim(),category:itCat.value.trim(),unit:itUnit.value.trim()||'unidade',qty:Number(itQty.value||0),min:Number(itMin.value||0),location:itLoc.value.trim(),emoji:itEmoji.value.trim()||'📦',image:itImage.value.trim(),active:itActive.value==='true',sizes,tamanhos:sizes};
  if(!obj.name||!obj.code||!obj.category) return toast('Preencha nome, codigo e categoria.');
  const idx=state.items.findIndex(item=>String(item.id)===String(obj.id));
  if(idx>=0) state.items[idx]=obj; else state.items.unshift(obj);
  saveState();
  closeModal();
  renderApp();
  toast('Item salvo.');
};

const SUPPLY_FREIGHT_STATUSES=['Solicitado','Coleta','Em rota','Entregue'];

function supplyAdminHeader(title,subtitle){
  return \`<div class="section-head"><div><h2>\${title}</h2><div class="muted">\${subtitle}</div></div></div>\`;
}

function supplyIsFreightOrder(order){
  return order && order.fulfillmentType==='entrega_obra';
}

function supplyFreightOrderStatus(order){
  if(!order) return 'Solicitado';
  if(order.deliveryStatus && SUPPLY_FREIGHT_STATUSES.includes(order.deliveryStatus)) return order.deliveryStatus;
  if(SUPPLY_FREIGHT_STATUSES.includes(order.status)) return order.status;
  if(order.status==='Retirado/Entregue' || order.status==='Entregue') return 'Entregue';
  return 'Solicitado';
}

function supplyFreightOrderCard(order){
  const status=supplyFreightOrderStatus(order);
  const idArg=Number(order.id)||\`'\${jsString(order.id)}'\`;
  return \`<div class="kcard">
    <div class="kcard-title">\${esc(order.number)} • \${esc(order.requesterName||'-')}</div>
    <div class="muted">Frete • \${esc(order.worksite||'-')}<br>Data desejada: \${fmtDate(order.desiredDate)}\${order.freightRequestId?\`<br>Chamado frete: \${esc(order.freightRequestId)}\`:''}</div>
    \${typeof truckTrackerHTML==='function'?truckTrackerHTML(order):''}
    <div class="kactions">
      <select onchange="setDeliveryStatusAdmin(\${idArg},this.value)">
        \${SUPPLY_FREIGHT_STATUSES.map(item=>\`<option \${status===item?'selected':''}>\${item}</option>\`).join('')}
      </select>
      <button class="btn-light" onclick="openOrder(\${idArg})">Abrir</button>
      \${status!=='Entregue'?\`<button class="btn-green" onclick="deliver(\${idArg})">Confirmar entrega</button>\`:''}
    </div>
  </div>\`;
}

kanbanEntregaPedidos = window.kanbanEntregaPedidos = function(){
  const pedidos=(state.orders||[]).filter(order=>supplyIsFreightOrder(order));
  return \`\${supplyAdminHeader('Kanban de pedidos - Frete','Acompanhe solicitacoes de material com frete por status.')}
    <div class="kanban">
      \${SUPPLY_FREIGHT_STATUSES.map(status=>{
        const filtered=pedidos.filter(order=>supplyFreightOrderStatus(order)===status);
        return \`<div class="kcol"><h3>\${status} <span class="badge">\${filtered.length}</span></h3>\${filtered.length?filtered.map(supplyFreightOrderCard).join(''):'<div class="empty">Sem fretes</div>'}</div>\`;
      }).join('')}
    </div>\`;
};

kanbanPedidosComAbas = window.kanbanPedidosComAbas = function(){
  const retiradaCount=(state.orders||[]).filter(order=>!supplyIsFreightOrder(order)).length;
  const freteCount=(state.orders||[]).filter(order=>supplyIsFreightOrder(order)).length;
  const current=window.adminKanbanTab||'retirada';
  const content=current==='entrega'?kanbanEntregaPedidos():kanbanRetiradaPedidos();
  return \`
    <div class="section-head" style="margin-bottom:10px">
      <div>
        <h2>Kanban de pedidos</h2>
        <div class="muted">Acompanhe solicitacoes por status, separadas por retirada ou frete.</div>
      </div>
    </div>
    <div class="tabs admin-subtabs" style="margin-bottom:16px;gap:12px;flex-wrap:wrap">
      <button class="\${current==='retirada'?'active':''}" onclick="adminKanbanTab='retirada';renderApp()">Retirada <span class='badge' style='margin-left:8px'>\${retiradaCount}</span></button>
      <button class="\${current==='entrega'?'active':''}" onclick="adminKanbanTab='entrega';renderApp()">Frete <span class='badge' style='margin-left:8px'>\${freteCount}</span></button>
    </div>
    \${content}
  \`;
};

function safeArrayFromStorage(key){
  try{
    const parsed=JSON.parse(localStorage.getItem(key)||'[]');
    return Array.isArray(parsed)?parsed:[];
  }catch(e){
    return [];
  }
}

function stockOrderItemsSummary(order){
  return (order.items||[]).map(entry=>{
    const item=getItem(entry.itemId)||{};
    const sizes=itemSizesText(item);
    return \`\${entry.qty||0} \${item.unit||'un'} - \${item.name||'Item'}\${sizes?\` (Tam.: \${sizes})\`:''}\`;
  }).join('; ');
}

function stockFreightId(order){
  const raw=String(order.number||order.id||Date.now()).normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-zA-Z0-9-]+/g,'-').replace(/^-+|-+$/g,'').toUpperCase();
  return \`FRT-ESTOQUE-\${raw}\`;
}

function upsertFreightFromStockOrder(order){
  if(!order || order.fulfillmentType!=='entrega_obra' || !order.deliveryAddress) return '';
  const now=new Date().toISOString();
  const createdAt=order.createdAt||now;
  const id=stockFreightId(order);
  const materials=stockOrderItemsSummary(order);
  const current=safeArrayFromStorage(SUPPLY_FREIGHT_STORAGE_KEY);
  const existingIndex=current.findIndex(item=>String(item.id)===id || String(item.estoqueOrderId||'')===String(order.id));
  const existing=existingIndex>=0?current[existingIndex]:{};
  const freight={
    ...existing,
    id,
    sourceModule:'estoque_obras',
    origemSolicitacao:'Estoque de obras',
    estoqueOrderId:String(order.id),
    estoqueOrderNumber:order.number||'',
    createdAt:existing.createdAt||createdAt,
    updatedAt:now,
    dataSolicitacao:String(createdAt).slice(0,10),
    numeroRM:order.number||'',
    numeroOC:existing.numeroOC||'',
    numeroObra:order.worksite||'',
    obra:order.worksite||'',
    centroCusto:order.worksite||'',
    solicitante:order.requesterName||order.requester||'',
    emailSolicitante:order.requesterEmail||order.requester||'',
    telefoneSolicitante:order.requesterPhone||'',
    urgencia:existing.urgencia||'NORMAL',
    prioridade:existing.prioridade||existing.urgencia||'NORMAL',
    tipoMovimentacao:'Material de estoque',
    tipoFrete:'Frete de material solicitado na loja',
    tipoMaterial:'Materiais de estoque',
    materiais:materials,
    observacoes:[order.adminNote, order.items?.map(i=>i.note).filter(Boolean).join('; ')].filter(Boolean).join(' | ').slice(0,240),
    origem:order.deliveryOrigin||SEEL_SEDE_ADDRESS,
    destino:order.deliveryAddress,
    enderecoColeta:order.deliveryOrigin||SEEL_SEDE_ADDRESS,
    enderecoEntrega:order.deliveryAddress,
    dataColetaMaterial:order.desiredDate||'',
    dataColetaDesejada:order.desiredDate?\`\${order.desiredDate}T08:00\`:'',
    dataLimiteEntrega:order.desiredDate||'',
    responsavelRecebimento:\`\${order.requesterName||''} \${order.requesterPhone||''}\`.trim(),
    linkGoogleMaps:order.deliveryRouteUrl||gmapsRoute(order.deliveryOrigin||SEEL_SEDE_ADDRESS,order.deliveryAddress),
    status:existing.status||'Não iniciado',
    history:Array.isArray(existing.history)&&existing.history.length?existing.history:[{phase:'Não iniciado',enteredAt:createdAt,exitedAt:null}]
  };
  if(existingIndex>=0) current[existingIndex]=freight; else current.unshift(freight);
  localStorage.setItem(SUPPLY_FREIGHT_STORAGE_KEY,JSON.stringify(current));
  return id;
}

const previousConfirmSubmitOrderSupplyFlow=window.confirmSubmitOrder||confirmSubmitOrder;
confirmSubmitOrder = window.confirmSubmitOrder = function(){
  const before=new Set((state.orders||[]).map(order=>String(order.id)));
  previousConfirmSubmitOrderSupplyFlow();
  const created=(state.orders||[]).find(order=>!before.has(String(order.id)));
  if(!created || created.fulfillmentType!=='entrega_obra') return;
  const freightId=upsertFreightFromStockOrder(created);
  if(!freightId) return;
  created.freightRequestId=freightId;
  created.freightIntegratedAt=created.freightIntegratedAt||new Date().toISOString();
  created.deliveryStatus=created.deliveryStatus||'Solicitado';
  saveState();
  renderApp();
  toast(\`Solicitacao enviada ao almoxarife e ao Kanban de fretes (\${freightId}).\`);
};

ensureUniformSizes();
/* === fim patch === */
<\/script>
</body>
</html>
`;export{e as default};