var e=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEEL | Supply Flow - Gestão de Fretes</title>
  <style>
    :root {
      --bg: #eef6fb;
      --bg-2: #f8fbfd;
      --card: rgba(255, 255, 255, 0.92);
      --card-solid: #ffffff;
      --text: #07324d;
      --muted: #4d7088;
      --border: rgba(21, 90, 130, 0.22);
      --primary: #155a82;
      --primary-dark: #0e4a6e;
      --primary-soft: #dff0f8;
      --cyan: #1f7da8;
      --red: #ef4444;
      --yellow: #ffe119;
      --green: #22c55e;
      --gray: #64748b;
      --purple: #155a82;
      --seel-blue: #155a82;
      --seel-blue-dark: #0e4a6e;
      --seel-yellow: #ffe119;
      --seel-yellow-dark: #e2c600;
      --shadow: 0 18px 45px rgba(7, 50, 77, 0.14);
      --shadow-soft: 0 10px 24px rgba(7, 50, 77, 0.10);
      --radius: 20px;
      --radius-sm: 14px;
    }

    * { box-sizing: border-box; }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family: Inter, "Segoe UI", Arial, Helvetica, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(255, 225, 25, 0.18), transparent 26%),
        radial-gradient(circle at 85% 12%, rgba(21, 90, 130, 0.16), transparent 30%),
        linear-gradient(135deg, #eef6fb 0%, #ffffff 52%, #e7f2f8 100%);
      color: var(--text);
      min-height: 100vh;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
      background-size: 34px 34px;
      mask-image: linear-gradient(to bottom, black, transparent 85%);
    }

    header {
      position: sticky;
      top: 0;
      z-index: 20;
      color: white;
      padding: 18px 28px;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
      flex-wrap: wrap;
      background:
        linear-gradient(135deg, rgba(14, 74, 110, 0.98), rgba(21, 90, 130, 0.96)),
        radial-gradient(circle at 78% 8%, rgba(255, 225, 25, 0.34), transparent 28%);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.24);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: -0.03em;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    header h1::before {
      content: "SEEL";
      width: 58px;
      height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--seel-yellow);
      color: var(--seel-blue-dark);
      font-size: 14px;
      font-weight: 950;
      letter-spacing: 0.08em;
      box-shadow: inset 0 0 0 3px rgba(14,74,110,0.18), 0 10px 20px rgba(0,0,0,0.16);
    }

    header p {
      margin: 6px 0 0 52px;
      color: #cbd5e1;
      font-size: 13px;
    }

    .header-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      border: none;
      border-radius: 12px;
      padding: 10px 14px;
      cursor: pointer;
      font-weight: 800;
      transition: transform .18s ease, box-shadow .18s ease, background .18s ease, opacity .18s ease;
      letter-spacing: -0.01em;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-soft);
    }

    button:active {
      transform: translateY(0);
      box-shadow: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--seel-yellow), #fff06a);
      color: var(--seel-blue-dark);
      box-shadow: 0 12px 22px rgba(255, 225, 25, 0.26);
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #fff06a, var(--seel-yellow));
    }

    .btn-secondary {
      background: rgba(255,255,255,0.86);
      color: #0f172a;
      border: 1px solid rgba(148, 163, 184, 0.28);
    }

    header .btn-secondary {
      background: rgba(255,255,255,0.12);
      color: white;
      border: 1px solid rgba(255,255,255,0.14);
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      color: white;
    }

    .btn-small {
      padding: 7px 10px;
      font-size: 12px;
      border-radius: 10px;
    }

    main {
      padding: 22px;
      max-width: 1880px;
      margin: 0 auto;
    }

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 18px;
      flex-wrap: wrap;
      position: sticky;
      top: 84px;
      z-index: 12;
      padding: 10px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.70);
      backdrop-filter: blur(18px);
      border-radius: 18px;
      box-shadow: var(--shadow-soft);
    }

    .tab {
      background: transparent;
      color: #334155;
      border: 1px solid transparent;
      padding: 10px 14px;
    }

    .tab.active {
      background: linear-gradient(135deg, var(--seel-blue-dark), var(--seel-blue));
      color: white;
      box-shadow: 0 10px 18px rgba(37, 99, 235, 0.22);
    }

    .section {
      display: none;
      animation: fadeUp .28s ease both;
    }

    .section.active {
      display: block;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .panel {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 22px;
      margin-bottom: 20px;
      backdrop-filter: blur(18px);
    }

    .panel h2 {
      margin: 0 0 6px;
      font-size: 22px;
      letter-spacing: -0.03em;
    }

    .panel > .muted {
      margin-bottom: 18px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(190px, 1fr));
      gap: 14px;
    }

    .form-grid > div {
      position: relative;
    }

    label {
      display: block;
      font-size: 11px;
      color: #475569;
      font-weight: 900;
      margin-bottom: 7px;
      text-transform: uppercase;
      letter-spacing: 0.035em;
    }

    input,
    select,
    textarea {
      width: 100%;
      border: 1px solid rgba(148, 163, 184, 0.45);
      border-radius: 13px;
      padding: 11px 12px;
      font-size: 14px;
      background: rgba(255,255,255,0.94);
      color: var(--text);
      outline: none;
      transition: border .18s ease, box-shadow .18s ease, background .18s ease;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: rgba(37, 99, 235, 0.72);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
      background: white;
    }

    textarea {
      min-height: 90px;
      resize: vertical;
      line-height: 1.45;
    }

    .full { grid-column: 1 / -1; }

    .kanban-toolbar {
      display: grid;
      grid-template-columns: 1fr 180px 220px 200px;
      gap: 12px;
      margin-bottom: 16px;
      padding: 14px;
      background: rgba(248,250,252,0.75);
      border: 1px solid var(--border);
      border-radius: 16px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(150px, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }

    .metric {
      position: relative;
      overflow: hidden;
      background: rgba(255,255,255,0.90);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow-soft);
      padding: 18px;
    }

    .metric::after {
      content: "";
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      right: -48px;
      top: -58px;
      background: linear-gradient(135deg, rgba(37,99,235,.18), rgba(6,182,212,.10));
    }

    .metric strong {
      display: block;
      font-size: 29px;
      margin-top: 8px;
      letter-spacing: -0.05em;
    }

    .metric span {
      color: #64748b;
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.035em;
    }

    .kanban {
      display: grid;
      grid-template-columns: repeat(7, minmax(300px, 1fr));
      gap: 15px;
      overflow-x: auto;
      padding: 6px 4px 14px;
      scroll-snap-type: x proximity;
    }

    .kanban::-webkit-scrollbar,
    .freight-list::-webkit-scrollbar,
    .modal::-webkit-scrollbar {
      height: 10px;
      width: 10px;
    }

    .kanban::-webkit-scrollbar-thumb,
    .freight-list::-webkit-scrollbar-thumb,
    .modal::-webkit-scrollbar-thumb {
      background: rgba(100, 116, 139, 0.35);
      border-radius: 999px;
    }

    .column {
      position: relative;
      background: rgba(241, 245, 249, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.25);
      border-radius: 20px;
      min-height: 560px;
      padding: 12px;
      scroll-snap-align: start;
    }

    .column::before {
      content: "";
      position: absolute;
      left: 14px;
      right: 14px;
      top: 54px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(100,116,139,.35), transparent);
    }

    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
      position: sticky;
      top: 150px;
      background: rgba(241, 245, 249, 0.92);
      backdrop-filter: blur(10px);
      z-index: 1;
      padding: 4px 2px 10px;
      border-radius: 14px;
    }

    .column-header h3 {
      font-size: 14px;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .count {
      background: #0f172a;
      color: white;
      font-size: 12px;
      padding: 5px 9px;
      border-radius: 999px;
      box-shadow: 0 8px 18px rgba(15,23,42,.18);
    }

    .freight-card {
      position: relative;
      background: rgba(255,255,255,0.94);
      border-radius: 18px;
      box-shadow: 0 10px 26px rgba(15, 23, 42, 0.10);
      padding: 14px;
      margin-bottom: 12px;
      border: 1px solid rgba(148, 163, 184, 0.23);
      overflow: hidden;
      transition: transform .18s ease, box-shadow .18s ease;
    }

    .freight-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 34px rgba(15, 23, 42, 0.16);
    }

    .freight-card::before {
      content: "";
      position: absolute;
      inset: 0 auto 0 0;
      width: 7px;
      background: var(--gray);
    }

    .freight-card.red::before { background: linear-gradient(var(--red), #b91c1c); }
    .freight-card.yellow::before { background: linear-gradient(var(--yellow), #d97706); }
    .freight-card.green::before { background: linear-gradient(var(--green), #15803d); }
    .freight-card.cancelled { opacity: 0.76; }

    .card-title {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-weight: 900;
      margin-bottom: 10px;
      padding-left: 4px;
      letter-spacing: -0.03em;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      border-radius: 999px;
      padding: 6px 9px;
      color: white;
      font-size: 10px;
      white-space: nowrap;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .02em;
    }

    .badge.red { background: linear-gradient(135deg, var(--red), #b91c1c); }
    .badge.yellow { background: linear-gradient(135deg, #fbbf24, var(--yellow)); color: #111827; }
    .badge.green { background: linear-gradient(135deg, var(--green), #15803d); }
    .badge.gray { background: linear-gradient(135deg, var(--gray), #334155); }

    .card-info {
      font-size: 12px;
      line-height: 1.55;
      color: #475569;
      display: grid;
      gap: 4px;
    }

    .card-info b {
      color: #0f172a;
    }

    .card-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 11px;
    }

    .phase-select {
      font-size: 12px;
      padding: 8px 10px;
      margin-top: 10px;
      border-radius: 12px;
      font-weight: 700;
    }

    .table-wrap {
      overflow-x: auto;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-soft);
    }

    table {
      border-collapse: collapse;
      width: 100%;
      background: white;
      overflow: hidden;
    }

    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 13px;
      vertical-align: top;
    }

    th {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .035em;
    }

    tr:hover td {
      background: #f8fafc;
    }

    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.62);
      z-index: 30;
      align-items: center;
      justify-content: center;
      padding: 20px;
      backdrop-filter: blur(8px);
    }

    .modal-backdrop.active { display: flex; }

    .modal {
      background: rgba(255,255,255,0.96);
      border: 1px solid rgba(255,255,255,0.42);
      border-radius: 24px;
      padding: 22px;
      max-width: 980px;
      width: 100%;
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0 30px 80px rgba(15,23,42,.30);
      animation: popIn .22s ease both;
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(.98) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      margin-bottom: 12px;
    }

    .modal-header h2 { margin: 0; }

    .muted {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.5;
    }

    .empty {
      color: var(--muted);
      font-size: 13px;
      padding: 18px;
      border: 1px dashed rgba(100,116,139,.45);
      border-radius: 16px;
      background: rgba(255,255,255,0.65);
      text-align: center;
    }

    .map-layout {
      display: grid;
      grid-template-columns: minmax(520px, 1.35fr) minmax(320px, 0.65fr);
      gap: 16px;
      align-items: stretch;
    }

    .map-stage {
      position: relative;
      min-height: 500px;
      border-radius: 26px;
      overflow: hidden;
      background:
        radial-gradient(circle at 16% 24%, rgba(34, 197, 94, 0.20), transparent 12%),
        radial-gradient(circle at 78% 68%, rgba(245, 158, 11, 0.24), transparent 13%),
        radial-gradient(circle at 50% 42%, rgba(37, 99, 235, 0.10), transparent 18%),
        linear-gradient(135deg, #eaf5ff, #f8fafc 45%, #edf7f3);
      border: 1px solid rgba(148, 163, 184, 0.30);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.75), var(--shadow-soft);
    }

    .map-stage::before {
      content: "";
      position: absolute;
      inset: -35%;
      background:
        linear-gradient(35deg, transparent 44%, rgba(15, 23, 42, 0.07) 45%, rgba(15, 23, 42, 0.07) 47%, transparent 48%),
        linear-gradient(-20deg, transparent 48%, rgba(15, 23, 42, 0.06) 49%, rgba(15, 23, 42, 0.06) 51%, transparent 52%);
      background-size: 220px 170px, 260px 190px;
      animation: mapMove 14s linear infinite;
    }

    .map-stage::after {
      content: "";
      position: absolute;
      left: 9%;
      right: 9%;
      top: 50%;
      height: 16px;
      transform: translateY(-50%);
      border-radius: 999px;
      background:
        repeating-linear-gradient(90deg, #f8fafc 0 36px, transparent 36px 58px),
        linear-gradient(#334155, #334155);
      box-shadow:
        0 86px 0 -3px rgba(51, 65, 85, 0.32),
        0 -102px 0 -3px rgba(51, 65, 85, 0.23);
      opacity: 0.92;
    }

    @keyframes mapMove {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(160px, 80px, 0); }
    }

    .route-line {
      position: absolute;
      left: 13%;
      right: 13%;
      top: 50%;
      height: 5px;
      transform: translateY(-50%);
      background: linear-gradient(90deg, var(--green), var(--yellow), var(--red));
      border-radius: 999px;
      z-index: 2;
      box-shadow: 0 0 24px rgba(37,99,235,.18);
    }

    .route-line::before,
    .route-line::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 24px;
      height: 24px;
      border-radius: 999px;
      transform: translateY(-50%);
      box-shadow: 0 0 0 6px rgba(255,255,255,0.9), 0 8px 18px rgba(15,23,42,0.22);
    }

    .route-line::before { left: -5px; background: var(--green); }
    .route-line::after { right: -5px; background: var(--red); }

    .city-label {
      position: absolute;
      z-index: 3;
      background: rgba(255,255,255,0.92);
      border: 1px solid rgba(148, 163, 184, 0.34);
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 900;
      color: #0f172a;
      box-shadow: 0 8px 20px rgba(15,23,42,0.14);
      max-width: 260px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      backdrop-filter: blur(12px);
    }

    .city-origin { left: 8%; top: 34%; }
    .city-destination { right: 8%; top: 58%; }

    .moving-truck {
      position: absolute;
      top: calc(50% - 48px);
      left: var(--truck-left, 11%);
      z-index: 4;
      width: 124px;
      height: 66px;
      transform: translateY(var(--truck-y, 0));
      transition: left 900ms cubic-bezier(.2,.8,.2,1), transform 900ms cubic-bezier(.2,.8,.2,1);
      filter: drop-shadow(0 16px 12px rgba(15,23,42,0.26));
    }

    .moving-truck.moving { animation: truckPulse 1.15s ease-in-out infinite; }

    @keyframes truckPulse {
      0%, 100% { transform: translateY(var(--truck-y, 0)); }
      50% { transform: translateY(calc(var(--truck-y, 0) - 7px)); }
    }

    .phase-road {
      position: absolute;
      left: 7%;
      right: 7%;
      top: 22px;
      z-index: 6;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 7px;
      pointer-events: none;
    }

    .phase-stop {
      background: rgba(255,255,255,0.92);
      border: 1px solid rgba(148, 163, 184, 0.34);
      border-radius: 13px;
      padding: 8px 5px;
      font-size: 10px;
      font-weight: 900;
      text-align: center;
      color: #475569;
      box-shadow: 0 7px 15px rgba(15,23,42,0.11);
      backdrop-filter: blur(12px);
    }

    .phase-stop.done {
      background: #dcfce7;
      border-color: #86efac;
      color: #166534;
    }

    .phase-stop.current {
      background: #dbeafe;
      border-color: #60a5fa;
      color: #1d4ed8;
      transform: scale(1.05);
    }

    .phase-stop.cancelled {
      background: #fee2e2;
      border-color: #fca5a5;
      color: #991b1b;
    }

    .truck-body {
      position: absolute;
      left: 0;
      top: 18px;
      width: 80px;
      height: 34px;
      background: linear-gradient(135deg, var(--seel-yellow), #fff06a);
      border-radius: 8px 3px 3px 8px;
      box-shadow: inset 0 -8px 14px rgba(15,23,42,.12);
    }

    .truck-body::before {
      content: "SEEL";
      position: absolute;
      left: 18px;
      top: 9px;
      color: white;
      font-weight: 900;
      font-size: 12px;
      letter-spacing: .06em;
    }

    .truck-cabin {
      position: absolute;
      right: 4px;
      top: 25px;
      width: 40px;
      height: 27px;
      background: linear-gradient(135deg, #0f172a, #334155);
      border-radius: 5px 11px 4px 2px;
    }

    .truck-cabin::before {
      content: "";
      position: absolute;
      right: 6px;
      top: 4px;
      width: 16px;
      height: 10px;
      background: #bfdbfe;
      border-radius: 3px;
    }

    .truck-light {
      position: absolute;
      right: 0;
      top: 42px;
      width: 6px;
      height: 6px;
      background: #fde68a;
      border-radius: 50%;
      box-shadow: 0 0 14px #fde68a;
    }

    .wheel {
      position: absolute;
      bottom: 5px;
      width: 19px;
      height: 19px;
      border-radius: 999px;
      background: #111827;
      border: 4px solid #94a3b8;
      animation: wheelSpin 0.6s linear infinite;
    }

    .wheel-left { left: 18px; }
    .wheel-right { right: 17px; }

    @keyframes wheelSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .truck-status-card {
      position: absolute;
      left: 18px;
      bottom: 18px;
      right: 18px;
      z-index: 5;
      background: rgba(255,255,255,0.92);
      border: 1px solid rgba(148, 163, 184, 0.30);
      border-radius: 18px;
      box-shadow: 0 16px 36px rgba(15,23,42,0.17);
      padding: 15px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      backdrop-filter: blur(14px);
    }

    .truck-status-card div {
      font-size: 11px;
      color: var(--muted);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .035em;
    }

    .truck-status-card strong {
      display: block;
      color: var(--text);
      font-size: 14px;
      margin-top: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: none;
      letter-spacing: 0;
    }

    .freight-list {
      display: grid;
      gap: 10px;
      max-height: 500px;
      overflow: auto;
      padding-right: 4px;
    }

    .freight-map-item {
      background: rgba(255,255,255,0.90);
      border: 1px solid var(--border);
      border-left: 7px solid var(--gray);
      border-radius: 16px;
      padding: 13px;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(15,23,42,0.08);
      transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    }

    .freight-map-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(15,23,42,0.13);
      border-color: #93c5fd;
    }

    .freight-map-item.active {
      outline: 4px solid rgba(37,99,235,0.18);
      background: white;
    }

    .freight-map-item.red { border-left-color: var(--red); }
    .freight-map-item.yellow { border-left-color: var(--yellow); }
    .freight-map-item.green { border-left-color: var(--green); }
    .freight-map-item.gray { border-left-color: var(--gray); }

    .freight-map-item strong {
      display: block;
      font-size: 13px;
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }

    .freight-map-item span {
      display: block;
      font-size: 12px;
      color: var(--muted);
      line-height: 1.45;
    }


    .executive-strip {
      margin-bottom: 18px;
    }

    .form-section-title {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 8px 0 0;
      padding: 12px 14px;
      border-radius: 14px;
      color: #0f172a;
      background: linear-gradient(135deg, rgba(255,225,25,.26), rgba(255,255,255,.78));
      border: 1px solid rgba(148, 163, 184, 0.24);
      font-size: 13px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
    }


    .freight-card {
      padding: 0;
      border-radius: 20px;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255,255,255,.98), rgba(248,250,252,.96));
    }

    .freight-card::before {
      width: 0;
    }

    .card-top {
      position: relative;
      padding: 13px 14px 12px;
      color: white;
      background: linear-gradient(135deg, #334155, #0f172a);
      overflow: hidden;
    }

    .freight-card.red .card-top {
      background: linear-gradient(135deg, #ef4444, #991b1b);
    }

    .freight-card.yellow .card-top {
      background: linear-gradient(135deg, #f59e0b, #92400e);
    }

    .freight-card.green .card-top {
      background: linear-gradient(135deg, #22c55e, #166534);
    }

    .freight-card.cancelled .card-top {
      background: linear-gradient(135deg, #64748b, #334155);
    }

    .card-top::after {
      content: "";
      position: absolute;
      width: 130px;
      height: 130px;
      right: -54px;
      top: -70px;
      border-radius: 50%;
      background: rgba(255,255,255,.18);
    }

    .card-kicker {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .035em;
      text-transform: uppercase;
      opacity: .92;
    }

    .card-id {
      position: relative;
      z-index: 1;
      font-size: 18px;
      font-weight: 950;
      letter-spacing: -0.04em;
      margin-bottom: 7px;
    }

    .card-rm-row {
      position: relative;
      z-index: 1;
      display: flex;
      gap: 7px;
      flex-wrap: wrap;
    }

    .mini-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 900;
      color: white;
      background: rgba(255,255,255,.18);
      border: 1px solid rgba(255,255,255,.22);
      backdrop-filter: blur(8px);
      max-width: 100%;
    }

    .card-body {
      padding: 13px 14px 14px;
    }

    .route-box {
      display: grid;
      gap: 8px;
      margin-bottom: 11px;
    }

    .route-point {
      display: grid;
      grid-template-columns: 26px 1fr;
      gap: 8px;
      align-items: start;
      padding: 9px;
      border-radius: 14px;
      background: rgba(241,245,249,.78);
      border: 1px solid rgba(148,163,184,.24);
    }

    .route-icon {
      width: 26px;
      height: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-size: 13px;
      background: white;
      box-shadow: 0 5px 12px rgba(15,23,42,.08);
    }

    .route-label {
      display: block;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
      color: #64748b;
      margin-bottom: 2px;
    }

    .route-text {
      font-size: 12px;
      line-height: 1.35;
      color: #0f172a;
      font-weight: 750;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-data-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 11px;
    }

    .data-pill {
      padding: 9px;
      border-radius: 14px;
      background: white;
      border: 1px solid rgba(148,163,184,.24);
      box-shadow: 0 4px 12px rgba(15,23,42,.05);
      min-width: 0;
    }

    .data-pill span {
      display: block;
      font-size: 10px;
      color: #64748b;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
      margin-bottom: 3px;
    }

    .data-pill strong {
      display: block;
      font-size: 12px;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .deadline-strip {
      position: relative;
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 9px;
      align-items: center;
      padding: 10px;
      border-radius: 15px;
      background: linear-gradient(135deg, #eff6ff, #f8fafc);
      border: 1px solid rgba(37,99,235,.18);
      margin-bottom: 10px;
    }

    .deadline-icon {
      width: 34px;
      height: 34px;
      border-radius: 13px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #2563eb, #06b6d4);
      color: white;
      box-shadow: 0 8px 16px rgba(37,99,235,.22);
    }

    .deadline-strip span {
      display: block;
      font-size: 10px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: .04em;
      font-weight: 950;
    }

    .deadline-strip strong {
      display: block;
      font-size: 12px;
      color: #0f172a;
      margin-top: 2px;
    }

    .card-progress {
      margin: 10px 0 8px;
      height: 8px;
      border-radius: 999px;
      background: #e2e8f0;
      overflow: hidden;
    }

    .card-progress-bar {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #2563eb, #06b6d4);
      width: var(--phase-progress, 8%);
    }

    .phase-caption {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 11px;
      color: #64748b;
      margin-bottom: 9px;
      font-weight: 800;
    }

    .card-footer {
      padding: 0 14px 14px;
    }

    .card-actions {
      justify-content: space-between;
      gap: 8px;
    }

    .card-actions .btn-small {
      flex: 1;
      min-width: 72px;
      background: #f8fafc;
      border: 1px solid rgba(148,163,184,.30);
    }

    .card-actions .btn-danger {
      background: linear-gradient(135deg, #fee2e2, #fecaca);
      color: #991b1b;
    }

    .phase-select {
      margin-top: 0;
      margin-bottom: 10px;
      background: white;
      border: 1px solid rgba(37,99,235,.25);
      box-shadow: 0 6px 14px rgba(15,23,42,.06);
    }

    .card-info {
      display: none;
    }


    /* Identidade visual SEEL */
    header {
      border-bottom: 5px solid var(--seel-yellow);
    }

    header p {
      color: #fff6a8;
    }

    .btn-primary {
      color: var(--seel-blue-dark) !important;
      border: 1px solid rgba(14, 74, 110, 0.18);
    }

    .tab.active {
      border: 1px solid rgba(255, 225, 25, 0.38);
      box-shadow: 0 10px 20px rgba(21, 90, 130, 0.24);
    }

    .panel h2 {
      color: var(--seel-blue-dark);
    }

    .panel h2::after {
      content: "";
      display: block;
      width: 72px;
      height: 5px;
      margin-top: 8px;
      border-radius: 999px;
      background: var(--seel-yellow);
      box-shadow: 0 5px 14px rgba(255, 225, 25, 0.36);
    }

    .metric {
      border-left: 6px solid var(--seel-yellow);
    }

    .metric::after {
      background: linear-gradient(135deg, rgba(255,225,25,.26), rgba(21,90,130,.08));
    }

    .metric strong {
      color: var(--seel-blue-dark);
    }

    .count {
      background: var(--seel-blue-dark);
      color: var(--seel-yellow);
    }

    th {
      background: linear-gradient(135deg, var(--seel-blue-dark), var(--seel-blue));
      color: var(--seel-yellow);
    }

    .column {
      background: rgba(223, 240, 248, 0.74);
    }

    .column-header {
      background: rgba(223, 240, 248, 0.94);
    }

    .column-header h3 {
      color: var(--seel-blue-dark);
    }

    .freight-card {
      border: 1px solid rgba(21, 90, 130, 0.20);
    }

    .card-top {
      background: linear-gradient(135deg, var(--seel-blue-dark), var(--seel-blue));
      border-bottom: 4px solid var(--seel-yellow);
    }

    .freight-card.red .card-top {
      background: linear-gradient(135deg, #b91c1c, var(--seel-blue-dark));
    }

    .freight-card.yellow .card-top {
      background: linear-gradient(135deg, var(--seel-yellow), #e2c600);
      color: var(--seel-blue-dark);
    }

    .freight-card.yellow .mini-chip {
      background: rgba(21, 90, 130, 0.12);
      border-color: rgba(21, 90, 130, 0.20);
      color: var(--seel-blue-dark);
    }

    .freight-card.green .card-top {
      background: linear-gradient(135deg, #15803d, var(--seel-blue));
    }

    .mini-chip {
      color: var(--seel-yellow);
      background: rgba(255, 225, 25, 0.12);
      border-color: rgba(255, 225, 25, 0.28);
    }

    .route-icon,
    .deadline-icon {
      background: var(--seel-yellow);
      color: var(--seel-blue-dark);
    }

    .deadline-strip {
      background: linear-gradient(135deg, rgba(255,225,25,.18), #ffffff);
      border-color: rgba(21,90,130,.18);
    }

    .card-progress-bar {
      background: linear-gradient(90deg, var(--seel-blue), var(--seel-yellow));
    }

    .phase-select {
      border-color: rgba(21,90,130,.28);
    }

    .map-stage {
      background:
        radial-gradient(circle at 16% 24%, rgba(255, 225, 25, 0.24), transparent 12%),
        radial-gradient(circle at 78% 68%, rgba(21, 90, 130, 0.18), transparent 13%),
        radial-gradient(circle at 50% 42%, rgba(255, 225, 25, 0.10), transparent 18%),
        linear-gradient(135deg, #e8f4fa, #ffffff 45%, #fdf8c8);
      border: 2px solid rgba(21, 90, 130, 0.28);
    }

    .route-line {
      background: linear-gradient(90deg, var(--seel-blue), var(--seel-yellow), var(--seel-blue-dark));
    }

    .truck-body {
      background: linear-gradient(135deg, var(--seel-blue), var(--seel-blue-dark));
      border: 3px solid var(--seel-yellow);
    }

    .truck-body::before {
      color: var(--seel-yellow);
    }

    .truck-cabin {
      background: linear-gradient(135deg, var(--seel-blue-dark), #08334e);
      border: 2px solid var(--seel-yellow);
    }

    .phase-stop.current {
      background: var(--seel-yellow);
      border-color: #e2c600;
      color: var(--seel-blue-dark);
    }

    .phase-stop.done {
      background: var(--seel-blue);
      border-color: var(--seel-blue-dark);
      color: var(--seel-yellow);
    }

    .freight-map-item.active {
      outline: 4px solid rgba(255,225,25,0.45);
    }

    .form-section-title {
      color: var(--seel-blue-dark);
      border-left: 6px solid var(--seel-yellow);
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: rgba(21, 90, 130, 0.72);
      box-shadow: 0 0 0 4px rgba(255, 225, 25, 0.20);
    }


    .brand-title {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .seel-logo {
      width: 180px;
      max-width: 36vw;
      height: auto;
      display: block;
      background: var(--seel-blue);
      border: 3px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(0,0,0,0.22);
    }

    header h1::before {
      content: none !important;
      display: none !important;
    }

    header p {
      margin-left: 0 !important;
    }

    @media (max-width: 760px) {
      .brand-title {
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
      }

      .seel-logo {
        width: 155px;
        max-width: 80vw;
      }
    }


    /* Visual corporativo neutro: sem emojis ou figuras com aparência gerada por IA */
    body {
      background:
        linear-gradient(135deg, #f4f7f9 0%, #ffffff 48%, #eef4f7 100%) !important;
    }

    body::before {
      opacity: .45;
    }

    .form-section-title {
      gap: 8px;
      background: #f8fafc !important;
      border-left: 5px solid var(--seel-blue);
      border-top: 1px solid rgba(21, 90, 130, 0.14);
      border-right: 1px solid rgba(21, 90, 130, 0.14);
      border-bottom: 1px solid rgba(21, 90, 130, 0.14);
      box-shadow: none;
    }

    .route-icon,
    .deadline-icon {
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .04em;
      background: #f1f5f9 !important;
      color: var(--seel-blue-dark) !important;
      border: 1px solid rgba(21, 90, 130, 0.22);
      box-shadow: none;
    }

    .deadline-icon {
      font-size: 9px;
    }

    .map-stage {
      background:
        linear-gradient(90deg, rgba(21,90,130,0.035) 1px, transparent 1px),
        linear-gradient(rgba(21,90,130,0.035) 1px, transparent 1px),
        linear-gradient(135deg, #edf3f6, #ffffff 48%, #f4f6f7) !important;
      background-size: 38px 38px, 38px 38px, auto !important;
    }

    .map-stage::before {
      background:
        linear-gradient(35deg, transparent 44%, rgba(71, 85, 105, 0.08) 45%, rgba(71, 85, 105, 0.08) 47%, transparent 48%),
        linear-gradient(-20deg, transparent 48%, rgba(71, 85, 105, 0.06) 49%, rgba(71, 85, 105, 0.06) 51%, transparent 52%) !important;
      opacity: .65;
    }

    .route-line {
      background: linear-gradient(90deg, #64748b, #94a3b8, #334155) !important;
      box-shadow: none;
    }

    .route-line::before,
    .route-line::after {
      box-shadow: 0 0 0 5px rgba(255,255,255,0.92), 0 5px 14px rgba(15,23,42,0.15);
    }

    .route-line::before {
      background: #475569 !important;
    }

    .route-line::after {
      background: #0f172a !important;
    }

    .city-label {
      background: rgba(255,255,255,0.96);
      border-color: rgba(100,116,139,0.28);
      box-shadow: 0 6px 16px rgba(15,23,42,0.10);
    }

    .truck-body {
      background: linear-gradient(135deg, #64748b, #334155) !important;
      border: 2px solid #cbd5e1 !important;
    }

    .truck-body::before {
      content: "";
      left: 16px;
      top: 10px;
      width: 42px;
      height: 8px;
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
    }

    .truck-cabin {
      background: linear-gradient(135deg, #475569, #1e293b) !important;
      border: 2px solid #cbd5e1 !important;
    }

    .truck-cabin::before {
      background: #e2e8f0 !important;
    }

    .truck-light {
      background: #e5e7eb !important;
      box-shadow: none !important;
    }

    .wheel {
      background: #111827 !important;
      border-color: #94a3b8 !important;
    }

    .phase-stop.current {
      background: #e2e8f0 !important;
      border-color: #94a3b8 !important;
      color: #0f172a !important;
    }

    .phase-stop.done {
      background: #475569 !important;
      border-color: #334155 !important;
      color: #ffffff !important;
    }

    .phase-stop.cancelled {
      background: #f1f5f9 !important;
      border-color: #94a3b8 !important;
      color: #334155 !important;
    }

    .card-top::after,
    .metric::after {
      opacity: .45;
    }

    .deadline-strip {
      background: #f8fafc !important;
      border-color: rgba(100,116,139,.22) !important;
    }

    .card-progress-bar {
      background: linear-gradient(90deg, #334155, #94a3b8) !important;
    }

    .freight-map-item {
      border-left-color: #64748b;
    }

    .freight-map-item.red {
      border-left-color: #b91c1c;
    }

    .freight-map-item.yellow {
      border-left-color: #a16207;
    }

    .freight-map-item.green {
      border-left-color: #166534;
    }

    .badge.yellow {
      background: #e2e8f0 !important;
      color: #0f172a !important;
    }

    .freight-card.yellow .card-top {
      background: linear-gradient(135deg, #64748b, #334155) !important;
      color: #ffffff !important;
    }

    .freight-card.yellow .mini-chip {
      color: #ffffff !important;
      background: rgba(255,255,255,.14) !important;
      border-color: rgba(255,255,255,.22) !important;
    }


    .maps-api-box {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 12px;
      align-items: end;
      padding: 14px;
      margin-bottom: 16px;
      border-radius: 16px;
      border: 1px solid rgba(21,90,130,.18);
      background: rgba(255,255,255,.72);
    }

    .map-shell {
      position: relative;
      min-height: 540px;
    }

    .google-map {
      display: none;
      width: 100%;
      height: 540px;
      min-height: 540px;
      border-radius: 26px;
      overflow: hidden;
      border: 2px solid rgba(21, 90, 130, 0.28);
      box-shadow: var(--shadow-soft);
      background: #eef2f7;
    }

    .google-map.active {
      display: block;
    }

    .map-stage.hidden {
      display: none;
    }

    .map-legend {
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: 16px;
      z-index: 8;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(255,255,255,.92);
      border: 1px solid rgba(100,116,139,.22);
      box-shadow: 0 10px 22px rgba(15,23,42,.10);
      backdrop-filter: blur(12px);
      font-size: 11px;
      color: #334155;
      font-weight: 850;
    }

    .map-legend span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }

    .legend-dot.origin {
      background: #334155;
    }

    .legend-dot.destination {
      background: #0f172a;
    }

    .legend-line {
      width: 22px;
      height: 3px;
      border-radius: 999px;
      background: #64748b;
      display: inline-block;
    }

    .legend-truck {
      width: 18px;
      height: 10px;
      border-radius: 3px;
      background: #475569;
      border: 1px solid #cbd5e1;
      display: inline-block;
    }

    .gm-truck {
      width: 34px;
      height: 20px;
      position: relative;
      transform: translate(-17px, -10px);
      filter: drop-shadow(0 5px 8px rgba(15,23,42,.22));
    }

    .gm-truck .box {
      position: absolute;
      left: 0;
      top: 4px;
      width: 22px;
      height: 13px;
      border-radius: 3px;
      background: #475569;
      border: 2px solid #cbd5e1;
    }

    .gm-truck .cab {
      position: absolute;
      right: 0;
      top: 7px;
      width: 12px;
      height: 10px;
      border-radius: 2px 5px 2px 1px;
      background: #1e293b;
      border: 1px solid #cbd5e1;
    }

    .gm-truck .wheel-a,
    .gm-truck .wheel-b {
      position: absolute;
      bottom: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #111827;
    }

    .gm-truck .wheel-a {
      left: 5px;
    }

    .gm-truck .wheel-b {
      right: 5px;
    }

    .gm-label {
      padding: 6px 9px;
      border-radius: 999px;
      background: rgba(255,255,255,.95);
      border: 1px solid rgba(100,116,139,.28);
      color: #0f172a;
      font-weight: 800;
      font-size: 11px;
      box-shadow: 0 5px 12px rgba(15,23,42,.12);
      white-space: nowrap;
      transform: translate(-50%, -130%);
    }

    @media (max-width: 900px) {
      .maps-api-box {
        grid-template-columns: 1fr;
      }

      .google-map,
      .map-shell {
        min-height: 580px;
      }
    }


    .brazil-map-stage {
      position: relative;
      min-height: 560px;
      border-radius: 26px;
      overflow: hidden;
      border: 2px solid rgba(21, 90, 130, 0.24);
      background:
        linear-gradient(90deg, rgba(21,90,130,0.035) 1px, transparent 1px),
        linear-gradient(rgba(21,90,130,0.035) 1px, transparent 1px),
        linear-gradient(135deg, #edf3f6, #ffffff 48%, #f4f6f7);
      background-size: 38px 38px, 38px 38px, auto;
      box-shadow: var(--shadow-soft);
    }

    #brazilMapSvg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .brazil-shape {
      fill: rgba(255,255,255,0.86);
      stroke: rgba(21,90,130,0.38);
      stroke-width: 4;
      filter: url(#softShadow);
    }

    .brazil-inner-line {
      fill: none;
      stroke: rgba(100,116,139,0.20);
      stroke-width: 2;
      stroke-dasharray: 8 10;
    }

    .brazil-route {
      fill: none;
      stroke: url(#routeGradient);
      stroke-width: 6;
      stroke-linecap: round;
      stroke-dasharray: 14 12;
      animation: routeFlow 1.6s linear infinite;
      opacity: .92;
    }

    @keyframes routeFlow {
      to { stroke-dashoffset: -52; }
    }

    .brazil-route-shadow {
      fill: none;
      stroke: rgba(15,23,42,0.12);
      stroke-width: 12;
      stroke-linecap: round;
    }

    .brazil-point {
      stroke: #ffffff;
      stroke-width: 5;
      filter: drop-shadow(0 8px 8px rgba(15,23,42,.22));
    }

    .brazil-point.origin {
      fill: #475569;
    }

    .brazil-point.destination {
      fill: #0f172a;
    }

    .brazil-point-label {
      font-size: 18px;
      font-weight: 900;
      fill: #0f172a;
      paint-order: stroke;
      stroke: rgba(255,255,255,.88);
      stroke-width: 5;
      stroke-linejoin: round;
    }

    .brazil-truck {
      transition: transform 900ms cubic-bezier(.2,.8,.2,1);
      filter: drop-shadow(0 10px 9px rgba(15,23,42,.24));
    }

    .brazil-truck-body {
      fill: #475569;
      stroke: #cbd5e1;
      stroke-width: 2;
    }

    .brazil-truck-cab {
      fill: #1e293b;
      stroke: #cbd5e1;
      stroke-width: 2;
    }

    .brazil-truck-wheel {
      fill: #111827;
    }

    .brazil-truck.moving {
      animation: brazilTruckPulse 1.2s ease-in-out infinite;
    }

    @keyframes brazilTruckPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .78; }
    }

    .brazil-map-status {
      position: absolute;
      left: 18px;
      right: 18px;
      bottom: 18px;
      z-index: 5;
      background: rgba(255,255,255,0.93);
      border: 1px solid rgba(100,116,139,.22);
      border-radius: 18px;
      box-shadow: 0 16px 36px rgba(15,23,42,0.14);
      padding: 15px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      backdrop-filter: blur(14px);
    }

    .brazil-map-status div {
      font-size: 11px;
      color: var(--muted);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .035em;
    }

    .brazil-map-status strong {
      display: block;
      color: var(--text);
      font-size: 14px;
      margin-top: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: none;
      letter-spacing: 0;
    }

    .brazil-map-legend {
      position: absolute;
      left: 18px;
      top: 18px;
      z-index: 5;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(255,255,255,.92);
      border: 1px solid rgba(100,116,139,.22);
      box-shadow: 0 10px 22px rgba(15,23,42,.10);
      backdrop-filter: blur(12px);
      font-size: 11px;
      color: #334155;
      font-weight: 850;
    }

    .brazil-map-legend span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    @media (max-width: 900px) {
      .brazil-map-stage {
        min-height: 620px;
      }

      .brazil-map-status {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 620px) {
      .brazil-map-status {
        grid-template-columns: 1fr;
      }
    }


    .google-like-map {
      position: relative;
      min-height: 600px;
      border-radius: 26px;
      overflow: hidden;
      border: 1px solid rgba(148,163,184,.35);
      background:
        linear-gradient(90deg, rgba(203,213,225,.32) 1px, transparent 1px),
        linear-gradient(rgba(203,213,225,.32) 1px, transparent 1px),
        #f8fafc;
      background-size: 46px 46px, 46px 46px, auto;
      box-shadow: var(--shadow-soft);
    }

    .google-like-map::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 25% 28%, rgba(226,232,240,.62), transparent 18%),
        radial-gradient(circle at 68% 62%, rgba(226,232,240,.58), transparent 20%),
        linear-gradient(135deg, transparent 0%, rgba(241,245,249,.75) 100%);
      pointer-events: none;
    }

    .map-water,
    .map-park {
      position: absolute;
      pointer-events: none;
      opacity: .88;
    }

    .map-water {
      background: #dbeafe;
      border: 1px solid rgba(147,197,253,.45);
    }

    .water-1 {
      width: 220px;
      height: 92px;
      right: -42px;
      top: 72px;
      border-radius: 55% 45% 48% 52%;
      transform: rotate(-14deg);
    }

    .water-2 {
      width: 300px;
      height: 84px;
      right: -80px;
      bottom: 106px;
      border-radius: 60% 40% 55% 45%;
      transform: rotate(18deg);
    }

    .map-park {
      background: #dcfce7;
      border: 1px solid rgba(134,239,172,.50);
      border-radius: 35% 65% 52% 48%;
    }

    .park-1 {
      width: 150px;
      height: 92px;
      left: 82px;
      top: 82px;
      transform: rotate(18deg);
    }

    .park-2 {
      width: 130px;
      height: 76px;
      left: 348px;
      top: 248px;
      transform: rotate(-22deg);
    }

    .park-3 {
      width: 190px;
      height: 82px;
      left: 238px;
      bottom: 72px;
      transform: rotate(9deg);
    }

    #brazilMapSvg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    .map-roads-base path {
      fill: none;
      stroke: #ffffff;
      stroke-width: 18;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 1px 1px rgba(100,116,139,.20));
    }

    .map-roads-base path:nth-child(odd) {
      stroke-width: 22;
    }

    .map-roads-secondary path {
      fill: none;
      stroke: #e2e8f0;
      stroke-width: 9;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .city-labels text {
      font-size: 13px;
      font-weight: 800;
      fill: #64748b;
      paint-order: stroke;
      stroke: rgba(255,255,255,.88);
      stroke-width: 4;
      stroke-linejoin: round;
    }

    .brazil-route-shadow {
      fill: none;
      stroke: rgba(37,99,235,0.18);
      stroke-width: 16;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .brazil-route {
      fill: none;
      stroke: url(#mapRouteGradient);
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 18 12;
      animation: routeFlow 1.1s linear infinite;
      opacity: .96;
    }

    .brazil-point {
      stroke: #ffffff;
      stroke-width: 5;
      filter: url(#pinShadow);
    }

    .brazil-point.origin {
      fill: #2563eb;
    }

    .brazil-point.destination {
      fill: #dc2626;
    }

    .map-pin {
      filter: url(#pinShadow);
    }

    .map-pin.origin-pin {
      fill: #2563eb;
    }

    .map-pin.destination-pin {
      fill: #dc2626;
    }

    .pin-center {
      fill: #ffffff;
    }

    .brazil-point-label {
      font-size: 14px;
      font-weight: 900;
      fill: #0f172a;
      paint-order: stroke;
      stroke: rgba(255,255,255,.94);
      stroke-width: 5;
      stroke-linejoin: round;
    }

    .brazil-truck-body {
      fill: #334155;
      stroke: #ffffff;
      stroke-width: 2;
    }

    .brazil-truck-cab {
      fill: #0f172a;
      stroke: #ffffff;
      stroke-width: 2;
    }

    .brazil-truck-wheel {
      fill: #111827;
      stroke: #ffffff;
      stroke-width: 1;
    }

    .map-zoom-ui {
      position: absolute;
      right: 18px;
      top: 18px;
      z-index: 7;
      display: grid;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(100,116,139,.24);
      box-shadow: 0 8px 18px rgba(15,23,42,.12);
    }

    .map-zoom-ui button {
      width: 38px;
      height: 38px;
      border-radius: 0;
      padding: 0;
      background: rgba(255,255,255,.96);
      color: #334155;
      font-size: 20px;
      box-shadow: none;
    }

    .map-zoom-ui button + button {
      border-top: 1px solid rgba(100,116,139,.18);
    }

    .map-scale {
      position: absolute;
      left: 20px;
      bottom: 112px;
      z-index: 7;
      padding: 4px 30px 4px 6px;
      border-left: 3px solid #334155;
      border-bottom: 3px solid #334155;
      color: #334155;
      font-size: 11px;
      font-weight: 850;
      background: rgba(255,255,255,.74);
    }

    .legend-line.route-blue {
      background: #2563eb;
    }

    @media (max-width: 900px) {
      .google-like-map {
        min-height: 660px;
      }
    }


    .google-api-status {
      margin: 0 0 16px;
      padding: 12px 14px;
      border-radius: 14px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.22);
      color: #334155;
      font-size: 13px;
      font-weight: 750;
    }
    .google-api-status.active {
      background: #ecfdf5;
      border-color: rgba(22,163,74,.25);
      color: #166534;
    }
    .google-api-status.error {
      background: #fef2f2;
      border-color: rgba(220,38,38,.25);
      color: #991b1b;
    }
    .real-google-map {
      display: none;
      width: 100%;
      min-height: 600px;
      border-radius: 26px;
      overflow: hidden;
      border: 1px solid rgba(148,163,184,.35);
      box-shadow: var(--shadow-soft);
      background: #eef2f7;
    }
    .real-google-map.active {
      display: block;
    }
    .google-like-map.hidden {
      display: none;
    }
    .gm-truck {
      width: 36px;
      height: 22px;
      position: relative;
      transform: translate(-18px, -11px);
      filter: drop-shadow(0 5px 8px rgba(15,23,42,.22));
    }
    .gm-truck .box {
      position: absolute;
      left: 0;
      top: 5px;
      width: 23px;
      height: 13px;
      border-radius: 3px;
      background: #334155;
      border: 2px solid #ffffff;
    }
    .gm-truck .cab {
      position: absolute;
      right: 0;
      top: 8px;
      width: 13px;
      height: 10px;
      border-radius: 2px 5px 2px 1px;
      background: #0f172a;
      border: 1px solid #ffffff;
    }
    .gm-truck .wheel-a,
    .gm-truck .wheel-b {
      position: absolute;
      bottom: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #111827;
      border: 1px solid #ffffff;
    }
    .gm-truck .wheel-a { left: 6px; }
    .gm-truck .wheel-b { right: 5px; }


    .google-embed-map {
      position: relative;
      min-height: 620px;
      border-radius: 26px;
      overflow: hidden;
      border: 1px solid rgba(148,163,184,.35);
      box-shadow: var(--shadow-soft);
      background: #eef2f7;
    }

    .google-embed-frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
      filter: saturate(.92) contrast(.96) brightness(1.02);
    }

    .operations-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      pointer-events: none;
    }

    .google-embed-badge {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 6;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,.92);
      border: 1px solid rgba(100,116,139,.22);
      color: #334155;
      font-size: 11px;
      font-weight: 850;
      box-shadow: 0 8px 18px rgba(15,23,42,.10);
      backdrop-filter: blur(10px);
    }

    .brazil-route-shadow {
      fill: none;
      stroke: rgba(15,23,42,0.18);
      stroke-width: 16;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .brazil-route {
      fill: none;
      stroke: url(#mapRouteGradient);
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 18 12;
      animation: routeFlow 1.1s linear infinite;
      opacity: .96;
    }

    .map-pin {
      filter: url(#pinShadow);
    }

    .map-pin.origin-pin {
      fill: #2563eb;
    }

    .map-pin.destination-pin {
      fill: #dc2626;
    }

    .pin-center {
      fill: #ffffff;
    }

    .brazil-point-label {
      font-size: 14px;
      font-weight: 900;
      fill: #0f172a;
      paint-order: stroke;
      stroke: rgba(255,255,255,.94);
      stroke-width: 5;
      stroke-linejoin: round;
    }

    .brazil-truck {
      transition: transform 900ms cubic-bezier(.2,.8,.2,1);
      filter: drop-shadow(0 10px 9px rgba(15,23,42,.24));
    }

    .brazil-truck-body {
      fill: #334155;
      stroke: #ffffff;
      stroke-width: 2;
    }

    .brazil-truck-cab {
      fill: #0f172a;
      stroke: #ffffff;
      stroke-width: 2;
    }

    .brazil-truck-wheel {
      fill: #111827;
      stroke: #ffffff;
      stroke-width: 1;
    }

    @media (max-width: 900px) {
      .google-embed-map {
        min-height: 680px;
      }
    }


    .kanban-route-checkpoint {
      fill: #ffffff;
      stroke: #2563eb;
      stroke-width: 4;
      filter: url(#pinShadow);
      opacity: .95;
    }

    .kanban-route-checkpoint.done {
      fill: #2563eb;
      stroke: #ffffff;
    }

    .kanban-route-checkpoint.current {
      fill: #facc15;
      stroke: #0f172a;
      animation: checkpointPulse 1.2s ease-in-out infinite;
    }

    @keyframes checkpointPulse {
      0%, 100% { r: 8; opacity: 1; }
      50% { r: 11; opacity: .82; }
    }

    .route-stage-label {
      font-size: 11px;
      font-weight: 900;
      fill: #0f172a;
      paint-order: stroke;
      stroke: rgba(255,255,255,.92);
      stroke-width: 4;
      stroke-linejoin: round;
    }

    .route-progress-line {
      fill: none;
      stroke: #facc15;
      stroke-width: 8;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: .92;
      filter: drop-shadow(0 4px 8px rgba(15,23,42,.22));
    }

    .truck-position-halo {
      fill: rgba(250,204,21,.28);
      stroke: rgba(15,23,42,.22);
      stroke-width: 2;
      animation: truckHalo 1.35s ease-in-out infinite;
    }

    @keyframes truckHalo {
      0%, 100% { transform: scale(1); opacity: .9; }
      50% { transform: scale(1.22); opacity: .55; }
    }

    .map-alert-note {
      position: absolute;
      left: 18px;
      top: 58px;
      z-index: 6;
      max-width: 430px;
      padding: 9px 11px;
      border-radius: 13px;
      background: rgba(255,255,255,.92);
      border: 1px solid rgba(100,116,139,.22);
      color: #334155;
      font-size: 11px;
      font-weight: 750;
      box-shadow: 0 8px 18px rgba(15,23,42,.10);
      backdrop-filter: blur(10px);
    }

    .route-direction-arrow {
      fill: #2563eb;
      stroke: #ffffff;
      stroke-width: 1.5;
      filter: drop-shadow(0 4px 6px rgba(15,23,42,.20));
    }


    .operations-overlay {
      pointer-events: none;
    }

    .brazil-route-shadow {
      stroke: rgba(15,23,42,0.10) !important;
      stroke-width: 10 !important;
    }

    .brazil-route {
      stroke-width: 4 !important;
      opacity: .66 !important;
      stroke-dasharray: 12 12 !important;
    }

    .route-progress-line {
      stroke-width: 5 !important;
      opacity: .72 !important;
    }

    .route-base-line {
      fill: none;
      stroke: #0e4a6e;
      stroke-width: 5.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: .78;
      stroke-dasharray: 16 10;
    }

    .brazil-truck-vehicle {
      transform-origin: center;
      transform-box: fill-box;
    }

    .brazil-truck-vehicle.moving {
      animation: truckVehicleBob 1.1s ease-in-out infinite;
    }

    @keyframes truckVehicleBob {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }

    .brazil-truck-shadow-shape {
      fill: rgba(15,23,42,.18);
    }

    .brazil-truck-trailer {
      fill: var(--seel-yellow);
    }

    .brazil-truck-stripe {
      fill: rgba(14,74,110,.42);
      opacity: 1;
    }

    .brazil-truck-cab-shell {
      fill: var(--seel-blue);
    }

    .brazil-truck-window {
      fill: rgba(255,255,255,.28);
    }

    .brazil-truck-front-bumper {
      fill: var(--seel-blue-dark);
    }

    .brazil-truck-light {
      fill: #fff3a0;
    }

    .brazil-wheel-group {
      transform-origin: center;
      transform-box: fill-box;
    }

    .brazil-wheel-group.moving {
      animation: truckWheelSpin .75s linear infinite;
    }

    @keyframes truckWheelSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .brazil-truck-wheel {
      fill: #05070a;
      stroke: #05070a;
      stroke-width: 1.2;
    }

    .brazil-truck-wheel-inner {
      fill: #ffffff;
      stroke: #e5e7eb;
      stroke-width: .8;
    }

    .brazil-truck-wheel-hub {
      fill: #05070a;
    }

    .brazil-truck-wheel-spokes {
      stroke: #e2e8f0;
      stroke-width: 1;
      stroke-linecap: round;
      opacity: .95;
    }

    .route-stage-label {
      font-size: 10px !important;
    }

    .google-embed-badge {
      max-width: 280px;
      text-align: right;
    }

    .map-alert-note {
      max-width: 520px;
    }


    .delivery-tracking-panel {
      margin-top: 16px;
      padding: 18px;
      border-radius: 24px;
      background: rgba(255,255,255,.94);
      border: 1px solid rgba(100,116,139,.22);
      box-shadow: var(--shadow-soft);
    }

    .tracking-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 15px;
    }

    .tracking-kicker {
      display: inline-block;
      margin-bottom: 5px;
      font-size: 11px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--seel-blue);
    }

    .tracking-header h3 {
      margin: 0 0 4px;
      font-size: 20px;
      color: #0f172a;
    }

    .tracking-header p {
      margin: 0;
      color: #64748b;
      font-size: 13px;
      font-weight: 700;
    }

    .tracking-status-pill {
      white-space: nowrap;
      padding: 8px 12px;
      border-radius: 999px;
      background: #e2e8f0;
      color: #334155;
      font-size: 11px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .tracking-status-pill.red {
      background: #fee2e2;
      color: #991b1b;
    }

    .tracking-status-pill.yellow {
      background: #fef3c7;
      color: #92400e;
    }

    .tracking-status-pill.green {
      background: #dcfce7;
      color: #166534;
    }

    .tracking-route-summary {
      display: grid;
      grid-template-columns: 1fr 1fr .8fr;
      gap: 10px;
      margin-bottom: 28px;
    }

    .tracking-route-summary div {
      min-width: 0;
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.18);
    }

    .tracking-route-summary span {
      display: block;
      margin-bottom: 5px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .05em;
      text-transform: uppercase;
      color: #64748b;
    }

    .tracking-route-summary strong {
      display: block;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.35;
      max-height: 36px;
      overflow: hidden;
    }

    .ecommerce-tracker {
      position: relative;
      padding: 26px 10px 4px;
    }

    .tracker-rail {
      position: relative;
      height: 10px;
      border-radius: 999px;
      background: #e2e8f0;
      margin: 0 18px 24px;
    }

    .tracker-progress {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #2563eb, #facc15);
      width: 0%;
      transition: width 900ms cubic-bezier(.2,.8,.2,1);
    }

    .tracker-truck {
      position: absolute;
      top: -44px;
      left: 0%;
      width: 92px;
      height: 46px;
      transform: translateX(-50%);
      transition: left 900ms cubic-bezier(.2,.8,.2,1);
      filter: drop-shadow(0 8px 8px rgba(15,23,42,.16));
      z-index: 3;
      pointer-events: none;
    }

    .tracker-truck-shadow {
      position: absolute;
      left: 18px;
      bottom: 3px;
      width: 54px;
      height: 8px;
      border-radius: 999px;
      background: rgba(15,23,42,.16);
      filter: blur(2px);
    }

    .tracker-truck-body {
      position: absolute;
      inset: 0;
      transform-origin: center bottom;
    }

    .tracker-truck-trailer {
      position: absolute;
      left: 7px;
      top: 10px;
      width: 46px;
      height: 24px;
      border-radius: 4px;
      background: linear-gradient(180deg, #ffe84d 0%, var(--seel-yellow) 58%, #e2c600 100%);
      box-shadow: inset 0 2px 0 rgba(255,255,255,.28), 0 0 0 1px rgba(14,74,110,.14);
    }

    .tracker-truck-line,
    .tracker-truck-line.line-2 {
      position: absolute;
      left: 17px;
      height: 3px;
      width: 26px;
      border-radius: 999px;
      background: rgba(14,74,110,.42);
    }

    .tracker-truck-line { top: 18px; }
    .tracker-truck-line.line-2 { top: 24px; }

    .tracker-truck-chassis {
      position: absolute;
      left: 1px;
      top: 33px;
      width: 68px;
      height: 6px;
      border-radius: 1px;
      background: var(--seel-blue-dark);
    }

    .tracker-truck-cab {
      position: absolute;
      left: 52px;
      top: 12px;
      width: 26px;
      height: 22px;
      background: linear-gradient(180deg, #1f7da8 0%, var(--seel-blue) 58%, var(--seel-blue-dark) 100%);
      border-radius: 2px 8px 4px 2px;
      clip-path: polygon(0 0, 70% 0, 100% 42%, 100% 100%, 0 100%);
    }

    .tracker-truck-window {
      position: absolute;
      top: 17px;
      width: 10px;
      height: 8px;
      background: rgba(255,255,255,.28);
      border-radius: 1px;
    }

    .tracker-truck-window.window-a { left: 57px; }
    .tracker-truck-window.window-b { left: 68px; width: 7px; }

    .tracker-truck-light {
      position: absolute;
      left: 77px;
      top: 25px;
      width: 3px;
      height: 6px;
      border-radius: 2px;
      background: #fff3a0;
    }

    .tracker-truck-wheel {
      position: absolute;
      top: 28px;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #05070a;
      border: 1px solid #05070a;
      box-shadow: 0 2px 3px rgba(15,23,42,.20);
    }

    .tracker-truck-wheel::before {
      content: "";
      position: absolute;
      inset: 3.5px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: inset 0 0 0 1px #e5e7eb;
    }

    .tracker-truck-wheel::after {
      content: "";
      position: absolute;
      inset: 7px;
      border-radius: 50%;
      background: #05070a;
    }

    .tracker-truck-wheel.wheel-a { left: 15px; }
    .tracker-truck-wheel.wheel-b { left: 60px; }

    .tracker-truck.moving .tracker-truck-body {
      animation: trackerTruckMove 1.05s ease-in-out infinite;
    }

    @keyframes trackerTruckMove {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }

    .tracker-steps {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }

    .tracker-step {
      position: relative;
      text-align: center;
      min-width: 0;
      color: #64748b;
    }

    .tracker-dot {
      width: 18px;
      height: 18px;
      margin: 0 auto 7px;
      border-radius: 50%;
      background: #ffffff;
      border: 4px solid #cbd5e1;
      box-shadow: 0 4px 10px rgba(15,23,42,.10);
    }

    .tracker-step.done .tracker-dot {
      border-color: #2563eb;
      background: #2563eb;
    }

    .tracker-step.current .tracker-dot {
      border-color: #facc15;
      background: #facc15;
      box-shadow: 0 0 0 7px rgba(250,204,21,.22);
    }

    .tracker-step.cancelled .tracker-dot {
      border-color: #ef4444;
      background: #ef4444;
    }

    .tracker-step strong {
      display: block;
      color: #0f172a;
      font-size: 11px;
      font-weight: 950;
      line-height: 1.2;
    }

    .tracker-step span {
      display: block;
      margin-top: 3px;
      font-size: 10px;
      line-height: 1.2;
      font-weight: 750;
    }

    @media (max-width: 900px) {
      .tracking-header,
      .tracking-route-summary {
        grid-template-columns: 1fr;
      }

      .tracking-header {
        display: grid;
      }

      .tracker-steps {
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 14px;
      }
    }

    @media (max-width: 560px) {
      .tracker-steps {
        grid-template-columns: 1fr 1fr;
      }
    }


    /* Mapa limpo: sem pins/textos de coleta e entrega dentro do mapa */
    .operations-overlay {
      display: none !important;
    }

    .brazil-map-legend {
      display: none !important;
    }

    .map-alert-note {
      display: none !important;
    }

    .google-embed-badge {
      background: rgba(255,255,255,.88);
      color: #334155;
    }

    .map-shell {
      min-height: auto;
    }

    .google-embed-map {
      min-height: 620px;
    }


    /* Kanban cards - visual executivo aprimorado */
    .kanban-board {
      gap: 18px;
      padding-bottom: 12px;
    }

    .column {
      border: 1px solid rgba(21, 90, 130, 0.16);
      background: linear-gradient(180deg, rgba(248,250,252,.92), rgba(241,245,249,.78));
    }

    .column-header {
      border-bottom: 1px solid rgba(21, 90, 130, 0.12);
      box-shadow: 0 8px 18px rgba(15,23,42,.04);
    }

    .column-header h3 {
      font-size: 14px;
      line-height: 1.2;
    }

    .freight-card {
      padding: 0 !important;
      border-radius: 22px !important;
      overflow: hidden;
      background: #ffffff !important;
      border: 1px solid rgba(100,116,139,.18) !important;
      box-shadow: 0 14px 28px rgba(15,23,42,.10) !important;
      transform: translateZ(0);
    }

    .freight-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 22px 38px rgba(15,23,42,.16) !important;
      border-color: rgba(21,90,130,.28) !important;
    }

    .freight-card::before {
      display: none !important;
    }

    .kanban-card-header {
      position: relative;
      padding: 14px 15px 13px;
      color: #ffffff;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      border-bottom: 4px solid var(--seel-yellow);
    }

    .freight-card.red .kanban-card-header {
      background: linear-gradient(135deg, #991b1b, #0e4a6e);
    }

    .freight-card.yellow .kanban-card-header {
      background: linear-gradient(135deg, #334155, #155a82);
    }

    .freight-card.green .kanban-card-header {
      background: linear-gradient(135deg, #166534, #155a82);
    }

    .freight-card.cancelled .kanban-card-header {
      background: linear-gradient(135deg, #475569, #1e293b);
      border-bottom-color: #cbd5e1;
    }

    .kanban-card-header::after {
      content: "";
      position: absolute;
      right: -38px;
      top: -58px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: rgba(255,255,255,.14);
    }

    .kanban-card-topline {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 9px;
    }

    .kanban-id-block {
      min-width: 0;
    }

    .kanban-id-label {
      display: block;
      font-size: 9px;
      font-weight: 950;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
      margin-bottom: 2px;
    }

    .kanban-id {
      display: block;
      font-size: 17px;
      line-height: 1.1;
      font-weight: 950;
      letter-spacing: -.035em;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .priority-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-radius: 999px;
      padding: 7px 9px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .03em;
      text-transform: uppercase;
      background: rgba(255,255,255,.16);
      border: 1px solid rgba(255,255,255,.26);
      color: #ffffff;
      backdrop-filter: blur(10px);
    }

    .priority-pill.red {
      background: rgba(254,226,226,.22);
      color: #fee2e2;
    }

    .priority-pill.yellow {
      background: rgba(250,204,21,.20);
      color: #fef3c7;
    }

    .priority-pill.green {
      background: rgba(220,252,231,.18);
      color: #dcfce7;
    }

    .priority-pill.gray {
      background: rgba(226,232,240,.18);
      color: #e2e8f0;
    }

    .kanban-chip-row {
      position: relative;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .kanban-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      max-width: 100%;
      padding: 5px 8px;
      border-radius: 999px;
      color: #ffffff;
      background: rgba(255,255,255,.14);
      border: 1px solid rgba(255,255,255,.20);
      font-size: 10px;
      font-weight: 850;
    }

    .kanban-card-body {
      padding: 14px 15px 12px;
    }

    .kanban-section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 9px;
      color: #64748b;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .06em;
      text-transform: uppercase;
    }

    .kanban-section-title::after {
      content: "";
      flex: 1;
      height: 1px;
      background: rgba(100,116,139,.18);
    }

    .route-stack {
      display: grid;
      gap: 8px;
      margin-bottom: 12px;
    }

    .route-card {
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: 9px;
      align-items: start;
      padding: 10px;
      border-radius: 16px;
      background: linear-gradient(135deg, #f8fafc, #ffffff);
      border: 1px solid rgba(100,116,139,.16);
    }

    .route-marker {
      width: 30px;
      height: 30px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 950;
      color: #ffffff;
      background: #334155;
      box-shadow: 0 8px 14px rgba(15,23,42,.14);
    }

    .route-marker.dest {
      background: #0e4a6e;
    }

    .route-content span {
      display: block;
      margin-bottom: 3px;
      color: #64748b;
      font-size: 9px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .06em;
    }

    .route-content strong {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 800;
    }

    .kanban-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
    }

    .kanban-info-box {
      min-width: 0;
      padding: 10px;
      border-radius: 15px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 6px 14px rgba(15,23,42,.05);
    }

    .kanban-info-box span {
      display: block;
      margin-bottom: 4px;
      color: #64748b;
      font-size: 9px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .06em;
    }

    .kanban-info-box strong {
      display: block;
      color: #0f172a;
      font-size: 12px;
      font-weight: 850;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sla-card {
      display: grid;
      grid-template-columns: 38px 1fr;
      gap: 10px;
      align-items: center;
      padding: 11px;
      border-radius: 17px;
      background: linear-gradient(135deg, rgba(255,225,25,.16), rgba(255,255,255,.95));
      border: 1px solid rgba(21,90,130,.16);
      margin-bottom: 12px;
    }

    .sla-icon {
      width: 38px;
      height: 38px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .05em;
    }

    .sla-card span {
      display: block;
      margin-bottom: 3px;
      color: #64748b;
      font-size: 9px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .06em;
    }

    .sla-card strong {
      display: block;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.35;
    }

    .phase-meter {
      margin-bottom: 10px;
    }

    .phase-meter-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 7px;
      font-size: 10px;
      font-weight: 850;
      color: #64748b;
    }

    .phase-meter-track {
      height: 8px;
      border-radius: 999px;
      background: #e2e8f0;
      overflow: hidden;
    }

    .phase-meter-fill {
      height: 100%;
      width: var(--phase-progress, 0%);
      border-radius: 999px;
      background: linear-gradient(90deg, #0e4a6e, #facc15);
    }

    .kanban-card-footer {
      padding: 0 15px 15px;
    }

    .phase-select {
      height: 39px;
      margin-bottom: 10px !important;
      border-radius: 14px;
      font-size: 12px;
      font-weight: 800;
      background: #f8fafc;
      border: 1px solid rgba(21,90,130,.22);
    }

    .card-actions {
      display: grid !important;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px !important;
    }

    .card-actions .btn-small {
      min-width: 0 !important;
      height: 34px;
      padding: 0 8px !important;
      border-radius: 12px !important;
      font-size: 11px !important;
      font-weight: 850;
    }

    .empty {
      border-style: dashed;
    }


    /* Ajuste de tamanho dos cards do Kanban */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(285px, 1fr)) !important;
      gap: 14px !important;
    }

    .column {
      padding: 12px !important;
      min-height: 640px;
    }

    .cards {
      gap: 10px !important;
    }

    .freight-card {
      border-radius: 18px !important;
      box-shadow: 0 10px 20px rgba(15,23,42,.08) !important;
    }

    .freight-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 28px rgba(15,23,42,.13) !important;
    }

    .kanban-card-header {
      padding: 11px 12px 10px !important;
      border-bottom-width: 3px !important;
    }

    .kanban-id-label {
      font-size: 8px !important;
      margin-bottom: 1px !important;
    }

    .kanban-id {
      font-size: 15px !important;
    }

    .priority-pill {
      padding: 5px 7px !important;
      font-size: 9px !important;
    }

    .kanban-chip-row {
      gap: 5px !important;
    }

    .kanban-chip {
      padding: 4px 7px !important;
      font-size: 9px !important;
    }

    .kanban-card-body {
      padding: 11px 12px 10px !important;
    }

    .kanban-section-title {
      margin-bottom: 7px !important;
      font-size: 9px !important;
    }

    .route-stack {
      gap: 6px !important;
      margin-bottom: 9px !important;
    }

    .route-card {
      grid-template-columns: 26px 1fr !important;
      gap: 7px !important;
      padding: 8px !important;
      border-radius: 13px !important;
    }

    .route-marker {
      width: 26px !important;
      height: 26px !important;
      border-radius: 10px !important;
      font-size: 10px !important;
    }

    .route-content span {
      font-size: 8px !important;
      margin-bottom: 2px !important;
    }

    .route-content strong {
      font-size: 11px !important;
      line-height: 1.25 !important;
      -webkit-line-clamp: 1 !important;
    }

    .kanban-info-grid {
      gap: 6px !important;
      margin-bottom: 9px !important;
    }

    .kanban-info-box {
      padding: 8px !important;
      border-radius: 12px !important;
    }

    .kanban-info-box span {
      font-size: 8px !important;
      margin-bottom: 3px !important;
    }

    .kanban-info-box strong {
      font-size: 11px !important;
    }

    .sla-card {
      grid-template-columns: 31px 1fr !important;
      gap: 8px !important;
      padding: 8px !important;
      border-radius: 13px !important;
      margin-bottom: 9px !important;
    }

    .sla-icon {
      width: 31px !important;
      height: 31px !important;
      border-radius: 11px !important;
      font-size: 8px !important;
    }

    .sla-card span {
      font-size: 8px !important;
      margin-bottom: 2px !important;
    }

    .sla-card strong {
      font-size: 11px !important;
      line-height: 1.25 !important;
    }

    .phase-meter {
      margin-bottom: 8px !important;
    }

    .phase-meter-label {
      margin-bottom: 5px !important;
      font-size: 9px !important;
    }

    .phase-meter-track {
      height: 6px !important;
    }

    .kanban-card-footer {
      padding: 0 12px 12px !important;
    }

    .phase-select {
      height: 34px !important;
      margin-bottom: 8px !important;
      border-radius: 12px !important;
      font-size: 11px !important;
    }

    .card-actions {
      gap: 6px !important;
    }

    .card-actions .btn-small {
      height: 30px !important;
      border-radius: 10px !important;
      font-size: 10px !important;
      padding: 0 5px !important;
    }

    .column-header {
      padding: 10px !important;
      margin-bottom: 10px !important;
    }

    .column-header h3 {
      font-size: 12px !important;
    }

    .count {
      min-width: 26px !important;
      height: 24px !important;
      padding: 0 7px !important;
      font-size: 11px !important;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(260px, 1fr)) !important;
      }
    }


    .kanban-card-body > .kanban-info-box:last-child strong {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }


    /* Kanban mais compacto com cabeçalho superior destacado */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(232px, 1fr)) !important;
      gap: 12px !important;
      align-items: start !important;
    }

    .column {
      padding: 0 9px 10px !important;
      min-height: 620px !important;
      max-height: 78vh;
      overflow-y: auto;
      border-radius: 18px !important;
      background: rgba(248,250,252,.86) !important;
      scrollbar-width: thin;
    }

    .column-header {
      position: sticky !important;
      top: 0;
      z-index: 5;
      margin: 0 -9px 10px !important;
      padding: 10px 10px 9px !important;
      border-radius: 18px 18px 12px 12px !important;
      background: linear-gradient(135deg, #0e4a6e, #155a82) !important;
      border-bottom: 3px solid var(--seel-yellow) !important;
      box-shadow: 0 12px 20px rgba(15,23,42,.12) !important;
    }

    .column-header h3 {
      color: #ffffff !important;
      font-size: 11px !important;
      font-weight: 950 !important;
      line-height: 1.15 !important;
      letter-spacing: -.01em;
      max-width: 168px;
    }

    .column-header h3::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 6px;
      border-radius: 50%;
      background: var(--seel-yellow);
      vertical-align: 1px;
    }

    .column-header .count {
      min-width: 24px !important;
      height: 23px !important;
      padding: 0 7px !important;
      color: #0e4a6e !important;
      background: var(--seel-yellow) !important;
      font-size: 10px !important;
      box-shadow: none !important;
    }

    .cards {
      gap: 8px !important;
    }

    .freight-card {
      border-radius: 15px !important;
      box-shadow: 0 8px 16px rgba(15,23,42,.075) !important;
    }

    .freight-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 14px 22px rgba(15,23,42,.12) !important;
    }

    .kanban-card-header {
      padding: 9px 10px 8px !important;
      border-bottom-width: 2px !important;
    }

    .kanban-card-header::after {
      width: 82px !important;
      height: 82px !important;
      right: -35px !important;
      top: -43px !important;
    }

    .kanban-card-topline {
      margin-bottom: 6px !important;
      align-items: flex-start !important;
    }

    .kanban-id-label {
      display: none !important;
    }

    .kanban-id {
      font-size: 13px !important;
      letter-spacing: -.02em !important;
      max-width: 120px;
    }

    .priority-pill {
      padding: 4px 6px !important;
      font-size: 8px !important;
      max-width: 78px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kanban-chip-row {
      gap: 4px !important;
    }

    .kanban-chip {
      padding: 3px 6px !important;
      font-size: 8px !important;
      max-width: 88px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kanban-card-body {
      padding: 9px 10px 8px !important;
    }

    .kanban-section-title {
      display: none !important;
    }

    .route-stack {
      gap: 5px !important;
      margin-bottom: 7px !important;
    }

    .route-card {
      grid-template-columns: 22px 1fr !important;
      gap: 6px !important;
      padding: 6px !important;
      border-radius: 11px !important;
    }

    .route-marker {
      width: 22px !important;
      height: 22px !important;
      border-radius: 8px !important;
      font-size: 9px !important;
    }

    .route-content span {
      font-size: 7.5px !important;
      margin-bottom: 1px !important;
    }

    .route-content strong {
      font-size: 10px !important;
      line-height: 1.18 !important;
      -webkit-line-clamp: 1 !important;
    }

    .kanban-info-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 5px !important;
      margin-bottom: 7px !important;
    }

    .kanban-info-box {
      padding: 6px !important;
      border-radius: 10px !important;
      box-shadow: none !important;
    }

    .kanban-info-box span {
      font-size: 7.5px !important;
      margin-bottom: 2px !important;
    }

    .kanban-info-box strong {
      font-size: 10px !important;
      line-height: 1.15 !important;
    }

    .sla-card {
      grid-template-columns: 27px 1fr !important;
      gap: 6px !important;
      padding: 7px !important;
      border-radius: 11px !important;
      margin-bottom: 7px !important;
    }

    .sla-icon {
      width: 27px !important;
      height: 27px !important;
      border-radius: 9px !important;
      font-size: 7px !important;
    }

    .sla-card span {
      font-size: 7.5px !important;
      margin-bottom: 1px !important;
    }

    .sla-card strong {
      font-size: 10px !important;
      line-height: 1.18 !important;
    }

    .phase-meter {
      margin-bottom: 6px !important;
    }

    .phase-meter-label {
      font-size: 8.5px !important;
      margin-bottom: 4px !important;
    }

    .phase-meter-label span:first-child {
      max-width: 116px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .phase-meter-track {
      height: 5px !important;
    }

    .kanban-card-body > .kanban-info-box:last-child {
      display: none !important;
    }

    .kanban-card-footer {
      padding: 0 10px 10px !important;
    }

    .phase-select {
      height: 31px !important;
      margin-bottom: 7px !important;
      border-radius: 10px !important;
      font-size: 10px !important;
      padding: 0 8px !important;
    }

    .card-actions {
      grid-template-columns: 1fr 1fr !important;
      gap: 5px !important;
    }

    .card-actions .btn-small {
      height: 28px !important;
      border-radius: 9px !important;
      font-size: 9px !important;
      padding: 0 4px !important;
    }

    .card-actions .btn-danger {
      grid-column: span 2;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(220px, 1fr)) !important;
      }
    }


    /* Refinamento de tamanhos, dimensões e tipografia dos cards do Kanban */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(250px, 1fr)) !important;
      gap: 14px !important;
    }

    .column {
      padding: 0 10px 12px !important;
      border-radius: 20px !important;
    }

    .column-header {
      padding: 12px 11px 10px !important;
      margin: 0 -10px 12px !important;
    }

    .column-header h3 {
      font-size: 12.5px !important;
      line-height: 1.22 !important;
      max-width: 178px !important;
      letter-spacing: 0 !important;
    }

    .column-header .count {
      min-width: 27px !important;
      height: 25px !important;
      font-size: 11px !important;
    }

    .freight-card {
      border-radius: 17px !important;
    }

    .kanban-card-header {
      padding: 11px 12px 10px !important;
    }

    .kanban-card-topline {
      margin-bottom: 7px !important;
      align-items: center !important;
    }

    .kanban-id {
      font-size: 15px !important;
      line-height: 1.12 !important;
      max-width: 138px !important;
      letter-spacing: -.025em !important;
    }

    .priority-pill {
      max-width: 94px !important;
      padding: 5px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
    }

    .kanban-chip {
      padding: 4px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      max-width: 105px !important;
    }

    .kanban-card-body {
      padding: 10px 12px 9px !important;
    }

    .route-card {
      grid-template-columns: 25px 1fr !important;
      gap: 7px !important;
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .route-marker {
      width: 25px !important;
      height: 25px !important;
      font-size: 9.5px !important;
    }

    .route-content span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 2px !important;
    }

    .route-content strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      -webkit-line-clamp: 2 !important;
      min-height: 28px;
    }

    .kanban-info-grid {
      gap: 6px !important;
      margin-bottom: 8px !important;
    }

    .kanban-info-box {
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .kanban-info-box span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .kanban-info-box strong {
      font-size: 11px !important;
      line-height: 1.22 !important;
      letter-spacing: -.01em;
    }

    .sla-card {
      grid-template-columns: 31px 1fr !important;
      gap: 8px !important;
      padding: 8px !important;
      border-radius: 13px !important;
      margin-bottom: 8px !important;
    }

    .sla-icon {
      width: 31px !important;
      height: 31px !important;
      font-size: 8px !important;
      border-radius: 10px !important;
    }

    .sla-card span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .sla-card strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      letter-spacing: -.01em;
    }

    .phase-meter-label {
      font-size: 9.5px !important;
      line-height: 1.15 !important;
      margin-bottom: 5px !important;
    }

    .phase-meter-label span:first-child {
      max-width: 140px !important;
    }

    .phase-select {
      height: 34px !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
      padding: 0 9px !important;
    }

    .card-actions .btn-small {
      height: 30px !important;
      font-size: 10px !important;
      letter-spacing: 0 !important;
    }

    .kanban-card-footer {
      padding: 0 12px 12px !important;
    }

    .cards {
      gap: 10px !important;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(238px, 1fr)) !important;
      }

      .kanban-id {
        max-width: 126px !important;
      }

      .column-header h3 {
        max-width: 156px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }


    /* Estabilização das abas */
    .section { display: none; }
    .section.active { display: block; }
    .tabs { overflow-x: auto; scrollbar-width: thin; }
    .tab { white-space: nowrap; }
    #cotacao .quote-layout,
    #dashboard .powerbi-grid,
    #mapa .map-layout { min-width: 0; }


    /* Mapa de Cotações - Saving automático */
    .quotation-map-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }
    .quotation-hero { display:grid; grid-template-columns:1fr 520px; gap:18px; align-items:stretch; margin-bottom:16px; }
    .quotation-kicker { display:inline-block; margin-bottom:6px; color:#155a82; font-size:11px; font-weight:950; letter-spacing:.08em; text-transform:uppercase; }
    .quotation-hero h2 { margin-bottom:6px; }
    .quotation-hero-kpis { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
    .quotation-hero-kpis div { padding:14px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:5px solid #155a82; }
    .quotation-hero-kpis div:first-child { border-left-color:#22c55e; background:linear-gradient(135deg,#ecfdf5,#fff); }
    .quotation-hero-kpis span,.quotation-flow-card span,.quotation-selected-card span,.quotation-saving-summary span,.quotation-form-title span,.quotation-comparison-header span { display:block; margin-bottom:6px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .quotation-hero-kpis strong { display:block; color:#0f172a; font-size:24px; line-height:1; font-weight:950; letter-spacing:-.05em; }
    .quotation-flow { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
    .quotation-flow-card { padding:14px; border-radius:18px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 10px 22px rgba(15,23,42,.07); }
    .quotation-flow-card span { width:30px; height:30px; border-radius:11px; display:inline-flex; align-items:center; justify-content:center; background:#0e4a6e; color:#fff; font-size:11px; margin-bottom:10px; }
    .quotation-flow-card strong { display:block; color:#0f172a; font-size:14px; margin-bottom:5px; }
    .quotation-flow-card p { margin:0; color:#64748b; font-size:11px; line-height:1.35; font-weight:700; }
    .quotation-grid { display:grid; grid-template-columns:350px 1fr; gap:16px; align-items:start; }
    .quotation-freights,.quotation-work-area { border-radius:24px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .quotation-freights { padding:15px; max-height:780px; overflow-y:auto; }
    .quotation-side-header h3 { margin:0 0 5px; color:#0f172a; font-size:17px; }
    .quotation-side-header p { margin:0 0 12px; color:#64748b; font-size:12px; font-weight:700; }
    .quotation-search { margin-bottom:12px; }
    .quotation-search input { height:40px; border-radius:14px; font-size:12px; }
    .quotation-freight-list { display:grid; gap:9px; }
    .quotation-freight-item { padding:12px; border-radius:17px; background:#f8fafc; border:1px solid rgba(100,116,139,.16); cursor:pointer; transition:.18s ease; }
    .quotation-freight-item:hover { transform:translateY(-2px); border-color:rgba(21,90,130,.32); box-shadow:0 10px 18px rgba(15,23,42,.08); }
    .quotation-freight-item.active { background:#e7f2f8; border-color:#155a82; box-shadow:inset 5px 0 0 #155a82; }
    .quotation-freight-item strong { display:block; margin-bottom:5px; color:#0f172a; font-size:13px; font-weight:950; }
    .quotation-freight-item span { display:block; color:#64748b; font-size:11px; line-height:1.35; font-weight:750; }
    .quotation-mini-row { display:flex !important; flex-wrap:wrap; gap:6px; margin-top:8px; }
    .quotation-mini-badge { display:inline-flex !important; width:fit-content; padding:5px 8px; border-radius:999px; background:#e2e8f0; color:#334155 !important; font-size:10px !important; font-weight:950 !important; }
    .quotation-mini-badge.green { background:#dcfce7; color:#166534 !important; }
    .quotation-work-area { padding:16px; min-height:620px; }
    .quotation-empty-state { min-height:560px; border-radius:22px; border:2px dashed rgba(100,116,139,.25); background:radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 26%),#f8fafc; display:grid; place-content:center; gap:8px; text-align:center; color:#64748b; }
    .quotation-empty-state strong { color:#0f172a; font-size:21px; }
    .quotation-empty-state span { max-width:480px; line-height:1.45; font-weight:700; }
    .quotation-selected-card { display:grid; grid-template-columns:1fr 230px; gap:14px; margin-bottom:14px; }
    .quotation-selected-card > div,.quotation-saving-summary { padding:15px; border-radius:20px; background:#f8fafc; border:1px solid rgba(100,116,139,.16); }
    .quotation-selected-card h3 { margin:0 0 5px; color:#0f172a; font-size:18px; }
    .quotation-selected-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:750; }
    .quotation-saving-summary { background:linear-gradient(135deg,#ecfdf5,#fff); border-left:6px solid #22c55e; }
    .quotation-saving-summary strong { display:block; color:#166534; font-size:25px; line-height:1; font-weight:950; letter-spacing:-.05em; margin-bottom:6px; }
    .quotation-saving-summary small { color:#166534; font-size:12px; font-weight:950; }
    .quotation-form-card,.quotation-comparison-card { padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 10px 22px rgba(15,23,42,.06); margin-bottom:14px; }
    .quotation-form-title,.quotation-comparison-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:13px; }
    .quotation-form-title strong { display:block; color:#0f172a; font-size:17px; }
    .quotation-form-grid { display:grid; grid-template-columns:1.2fr .75fr .8fr 1fr .75fr 1.2fr; gap:10px; margin-bottom:12px; }
    .quotation-add-button { width:100%; justify-content:center; }
    .quotation-comparison-header h3 { margin:0; color:#0f172a; font-size:18px; }
    .quotation-comparison-header p { margin:0; max-width:560px; color:#64748b; font-size:12px; line-height:1.35; font-weight:750; }
    .quotation-table-wrap { overflow-x:auto; border-radius:18px; border:1px solid rgba(100,116,139,.16); }
    .quotation-table { width:100%; min-width:980px; border-collapse:collapse; background:#fff; }
    .quotation-table th { padding:12px 10px; background:linear-gradient(135deg,#0e4a6e,#155a82); color:#fff; font-size:10px; letter-spacing:.05em; text-transform:uppercase; text-align:left; }
    .quotation-table td { padding:11px 10px; border-bottom:1px solid rgba(100,116,139,.14); color:#334155; font-size:12px; vertical-align:middle; }
    .quotation-table tr.best-row { background:#ecfdf5; }
    .quotation-table tr.selected-row { background:#e7f2f8; box-shadow:inset 5px 0 0 #155a82; }
    .quotation-table td:first-child strong { color:#0e4a6e; font-weight:950; }
    .quotation-price { color:#0f172a; font-weight:950; }
    .quotation-saving-positive { color:#166534; font-weight:950; }
    .quotation-badge { display:inline-flex; align-items:center; justify-content:center; padding:5px 8px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; }
    .quotation-badge.best { background:#dcfce7; color:#166534; }
    .quotation-badge.selected { background:#dbeafe; color:#1d4ed8; }
    .quotation-badge.neutral { background:#e2e8f0; color:#334155; }
    .quotation-actions { display:flex; flex-wrap:wrap; gap:6px; }
    .quotation-actions button { height:29px; padding:0 8px; border-radius:9px; font-size:10px; font-weight:850; }
    @media (max-width:1500px){.quotation-hero{grid-template-columns:1fr}.quotation-grid{grid-template-columns:1fr}.quotation-form-grid{grid-template-columns:1fr 1fr 1fr}}
    @media (max-width:900px){.quotation-flow,.quotation-hero-kpis{grid-template-columns:1fr 1fr}.quotation-selected-card,.quotation-form-title,.quotation-comparison-header{grid-template-columns:1fr;display:grid}.quotation-form-grid{grid-template-columns:1fr}}
    @media (max-width:620px){.quotation-flow,.quotation-hero-kpis{grid-template-columns:1fr}}

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(230px, 1fr)) !important;
      }

      .route-content strong {
        font-size: 10.5px !important;
      }

      .kanban-info-box strong,
      .sla-card strong {
        font-size: 10.5px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(210px, 1fr)) !important;
      }

      .column-header h3 {
        max-width: 142px;
      }
    }


    /* Refinamento de tamanhos, dimensões e tipografia dos cards do Kanban */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(250px, 1fr)) !important;
      gap: 14px !important;
    }

    .column {
      padding: 0 10px 12px !important;
      border-radius: 20px !important;
    }

    .column-header {
      padding: 12px 11px 10px !important;
      margin: 0 -10px 12px !important;
    }

    .column-header h3 {
      font-size: 12.5px !important;
      line-height: 1.22 !important;
      max-width: 178px !important;
      letter-spacing: 0 !important;
    }

    .column-header .count {
      min-width: 27px !important;
      height: 25px !important;
      font-size: 11px !important;
    }

    .freight-card {
      border-radius: 17px !important;
    }

    .kanban-card-header {
      padding: 11px 12px 10px !important;
    }

    .kanban-card-topline {
      margin-bottom: 7px !important;
      align-items: center !important;
    }

    .kanban-id {
      font-size: 15px !important;
      line-height: 1.12 !important;
      max-width: 138px !important;
      letter-spacing: -.025em !important;
    }

    .priority-pill {
      max-width: 94px !important;
      padding: 5px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
    }

    .kanban-chip {
      padding: 4px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      max-width: 105px !important;
    }

    .kanban-card-body {
      padding: 10px 12px 9px !important;
    }

    .route-card {
      grid-template-columns: 25px 1fr !important;
      gap: 7px !important;
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .route-marker {
      width: 25px !important;
      height: 25px !important;
      font-size: 9.5px !important;
    }

    .route-content span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 2px !important;
    }

    .route-content strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      -webkit-line-clamp: 2 !important;
      min-height: 28px;
    }

    .kanban-info-grid {
      gap: 6px !important;
      margin-bottom: 8px !important;
    }

    .kanban-info-box {
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .kanban-info-box span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .kanban-info-box strong {
      font-size: 11px !important;
      line-height: 1.22 !important;
      letter-spacing: -.01em;
    }

    .sla-card {
      grid-template-columns: 31px 1fr !important;
      gap: 8px !important;
      padding: 8px !important;
      border-radius: 13px !important;
      margin-bottom: 8px !important;
    }

    .sla-icon {
      width: 31px !important;
      height: 31px !important;
      font-size: 8px !important;
      border-radius: 10px !important;
    }

    .sla-card span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .sla-card strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      letter-spacing: -.01em;
    }

    .phase-meter-label {
      font-size: 9.5px !important;
      line-height: 1.15 !important;
      margin-bottom: 5px !important;
    }

    .phase-meter-label span:first-child {
      max-width: 140px !important;
    }

    .phase-select {
      height: 34px !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
      padding: 0 9px !important;
    }

    .card-actions .btn-small {
      height: 30px !important;
      font-size: 10px !important;
      letter-spacing: 0 !important;
    }

    .kanban-card-footer {
      padding: 0 12px 12px !important;
    }

    .cards {
      gap: 10px !important;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(238px, 1fr)) !important;
      }

      .kanban-id {
        max-width: 126px !important;
      }

      .column-header h3 {
        max-width: 156px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(230px, 1fr)) !important;
      }

      .route-content strong {
        font-size: 10.5px !important;
      }

      .kanban-info-box strong,
      .sla-card strong {
        font-size: 10.5px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(250px, 1fr)) !important;
      }
    }


    .kanban-card-body > .kanban-info-box:last-child strong {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }


    /* Kanban mais compacto com cabeçalho superior destacado */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(232px, 1fr)) !important;
      gap: 12px !important;
      align-items: start !important;
    }

    .column {
      padding: 0 9px 10px !important;
      min-height: 620px !important;
      max-height: 78vh;
      overflow-y: auto;
      border-radius: 18px !important;
      background: rgba(248,250,252,.86) !important;
      scrollbar-width: thin;
    }

    .column-header {
      position: sticky !important;
      top: 0;
      z-index: 5;
      margin: 0 -9px 10px !important;
      padding: 10px 10px 9px !important;
      border-radius: 18px 18px 12px 12px !important;
      background: linear-gradient(135deg, #0e4a6e, #155a82) !important;
      border-bottom: 3px solid var(--seel-yellow) !important;
      box-shadow: 0 12px 20px rgba(15,23,42,.12) !important;
    }

    .column-header h3 {
      color: #ffffff !important;
      font-size: 11px !important;
      font-weight: 950 !important;
      line-height: 1.15 !important;
      letter-spacing: -.01em;
      max-width: 168px;
    }

    .column-header h3::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 6px;
      border-radius: 50%;
      background: var(--seel-yellow);
      vertical-align: 1px;
    }

    .column-header .count {
      min-width: 24px !important;
      height: 23px !important;
      padding: 0 7px !important;
      color: #0e4a6e !important;
      background: var(--seel-yellow) !important;
      font-size: 10px !important;
      box-shadow: none !important;
    }

    .cards {
      gap: 8px !important;
    }

    .freight-card {
      border-radius: 15px !important;
      box-shadow: 0 8px 16px rgba(15,23,42,.075) !important;
    }

    .freight-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 14px 22px rgba(15,23,42,.12) !important;
    }

    .kanban-card-header {
      padding: 9px 10px 8px !important;
      border-bottom-width: 2px !important;
    }

    .kanban-card-header::after {
      width: 82px !important;
      height: 82px !important;
      right: -35px !important;
      top: -43px !important;
    }

    .kanban-card-topline {
      margin-bottom: 6px !important;
      align-items: flex-start !important;
    }

    .kanban-id-label {
      display: none !important;
    }

    .kanban-id {
      font-size: 13px !important;
      letter-spacing: -.02em !important;
      max-width: 120px;
    }

    .priority-pill {
      padding: 4px 6px !important;
      font-size: 8px !important;
      max-width: 78px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kanban-chip-row {
      gap: 4px !important;
    }

    .kanban-chip {
      padding: 3px 6px !important;
      font-size: 8px !important;
      max-width: 88px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .kanban-card-body {
      padding: 9px 10px 8px !important;
    }

    .kanban-section-title {
      display: none !important;
    }

    .route-stack {
      gap: 5px !important;
      margin-bottom: 7px !important;
    }

    .route-card {
      grid-template-columns: 22px 1fr !important;
      gap: 6px !important;
      padding: 6px !important;
      border-radius: 11px !important;
    }

    .route-marker {
      width: 22px !important;
      height: 22px !important;
      border-radius: 8px !important;
      font-size: 9px !important;
    }

    .route-content span {
      font-size: 7.5px !important;
      margin-bottom: 1px !important;
    }

    .route-content strong {
      font-size: 10px !important;
      line-height: 1.18 !important;
      -webkit-line-clamp: 1 !important;
    }

    .kanban-info-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 5px !important;
      margin-bottom: 7px !important;
    }

    .kanban-info-box {
      padding: 6px !important;
      border-radius: 10px !important;
      box-shadow: none !important;
    }

    .kanban-info-box span {
      font-size: 7.5px !important;
      margin-bottom: 2px !important;
    }

    .kanban-info-box strong {
      font-size: 10px !important;
      line-height: 1.15 !important;
    }

    .sla-card {
      grid-template-columns: 27px 1fr !important;
      gap: 6px !important;
      padding: 7px !important;
      border-radius: 11px !important;
      margin-bottom: 7px !important;
    }

    .sla-icon {
      width: 27px !important;
      height: 27px !important;
      border-radius: 9px !important;
      font-size: 7px !important;
    }

    .sla-card span {
      font-size: 7.5px !important;
      margin-bottom: 1px !important;
    }

    .sla-card strong {
      font-size: 10px !important;
      line-height: 1.18 !important;
    }

    .phase-meter {
      margin-bottom: 6px !important;
    }

    .phase-meter-label {
      font-size: 8.5px !important;
      margin-bottom: 4px !important;
    }

    .phase-meter-label span:first-child {
      max-width: 116px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .phase-meter-track {
      height: 5px !important;
    }

    .kanban-card-body > .kanban-info-box:last-child {
      display: none !important;
    }

    .kanban-card-footer {
      padding: 0 10px 10px !important;
    }

    .phase-select {
      height: 31px !important;
      margin-bottom: 7px !important;
      border-radius: 10px !important;
      font-size: 10px !important;
      padding: 0 8px !important;
    }

    .card-actions {
      grid-template-columns: 1fr 1fr !important;
      gap: 5px !important;
    }

    .card-actions .btn-small {
      height: 28px !important;
      border-radius: 9px !important;
      font-size: 9px !important;
      padding: 0 4px !important;
    }

    .card-actions .btn-danger {
      grid-column: span 2;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(220px, 1fr)) !important;
      }
    }


    /* Refinamento de tamanhos, dimensões e tipografia dos cards do Kanban */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(250px, 1fr)) !important;
      gap: 14px !important;
    }

    .column {
      padding: 0 10px 12px !important;
      border-radius: 20px !important;
    }

    .column-header {
      padding: 12px 11px 10px !important;
      margin: 0 -10px 12px !important;
    }

    .column-header h3 {
      font-size: 12.5px !important;
      line-height: 1.22 !important;
      max-width: 178px !important;
      letter-spacing: 0 !important;
    }

    .column-header .count {
      min-width: 27px !important;
      height: 25px !important;
      font-size: 11px !important;
    }

    .freight-card {
      border-radius: 17px !important;
    }

    .kanban-card-header {
      padding: 11px 12px 10px !important;
    }

    .kanban-card-topline {
      margin-bottom: 7px !important;
      align-items: center !important;
    }

    .kanban-id {
      font-size: 15px !important;
      line-height: 1.12 !important;
      max-width: 138px !important;
      letter-spacing: -.025em !important;
    }

    .priority-pill {
      max-width: 94px !important;
      padding: 5px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
    }

    .kanban-chip {
      padding: 4px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      max-width: 105px !important;
    }

    .kanban-card-body {
      padding: 10px 12px 9px !important;
    }

    .route-card {
      grid-template-columns: 25px 1fr !important;
      gap: 7px !important;
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .route-marker {
      width: 25px !important;
      height: 25px !important;
      font-size: 9.5px !important;
    }

    .route-content span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 2px !important;
    }

    .route-content strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      -webkit-line-clamp: 2 !important;
      min-height: 28px;
    }

    .kanban-info-grid {
      gap: 6px !important;
      margin-bottom: 8px !important;
    }

    .kanban-info-box {
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .kanban-info-box span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .kanban-info-box strong {
      font-size: 11px !important;
      line-height: 1.22 !important;
      letter-spacing: -.01em;
    }

    .sla-card {
      grid-template-columns: 31px 1fr !important;
      gap: 8px !important;
      padding: 8px !important;
      border-radius: 13px !important;
      margin-bottom: 8px !important;
    }

    .sla-icon {
      width: 31px !important;
      height: 31px !important;
      font-size: 8px !important;
      border-radius: 10px !important;
    }

    .sla-card span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .sla-card strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      letter-spacing: -.01em;
    }

    .phase-meter-label {
      font-size: 9.5px !important;
      line-height: 1.15 !important;
      margin-bottom: 5px !important;
    }

    .phase-meter-label span:first-child {
      max-width: 140px !important;
    }

    .phase-select {
      height: 34px !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
      padding: 0 9px !important;
    }

    .card-actions .btn-small {
      height: 30px !important;
      font-size: 10px !important;
      letter-spacing: 0 !important;
    }

    .kanban-card-footer {
      padding: 0 12px 12px !important;
    }

    .cards {
      gap: 10px !important;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(238px, 1fr)) !important;
      }

      .kanban-id {
        max-width: 126px !important;
      }

      .column-header h3 {
        max-width: 156px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(230px, 1fr)) !important;
      }

      .route-content strong {
        font-size: 10.5px !important;
      }

      .kanban-info-box strong,
      .sla-card strong {
        font-size: 10.5px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(210px, 1fr)) !important;
      }

      .column-header h3 {
        max-width: 142px;
      }
    }


    /* Refinamento de tamanhos, dimensões e tipografia dos cards do Kanban */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(250px, 1fr)) !important;
      gap: 14px !important;
    }

    .column {
      padding: 0 10px 12px !important;
      border-radius: 20px !important;
    }

    .column-header {
      padding: 12px 11px 10px !important;
      margin: 0 -10px 12px !important;
    }

    .column-header h3 {
      font-size: 12.5px !important;
      line-height: 1.22 !important;
      max-width: 178px !important;
      letter-spacing: 0 !important;
    }

    .column-header .count {
      min-width: 27px !important;
      height: 25px !important;
      font-size: 11px !important;
    }

    .freight-card {
      border-radius: 17px !important;
    }

    .kanban-card-header {
      padding: 11px 12px 10px !important;
    }

    .kanban-card-topline {
      margin-bottom: 7px !important;
      align-items: center !important;
    }

    .kanban-id {
      font-size: 15px !important;
      line-height: 1.12 !important;
      max-width: 138px !important;
      letter-spacing: -.025em !important;
    }

    .priority-pill {
      max-width: 94px !important;
      padding: 5px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
    }

    .kanban-chip {
      padding: 4px 7px !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      max-width: 105px !important;
    }

    .kanban-card-body {
      padding: 10px 12px 9px !important;
    }

    .route-card {
      grid-template-columns: 25px 1fr !important;
      gap: 7px !important;
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .route-marker {
      width: 25px !important;
      height: 25px !important;
      font-size: 9.5px !important;
    }

    .route-content span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 2px !important;
    }

    .route-content strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      -webkit-line-clamp: 2 !important;
      min-height: 28px;
    }

    .kanban-info-grid {
      gap: 6px !important;
      margin-bottom: 8px !important;
    }

    .kanban-info-box {
      padding: 7px 8px !important;
      border-radius: 12px !important;
    }

    .kanban-info-box span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .kanban-info-box strong {
      font-size: 11px !important;
      line-height: 1.22 !important;
      letter-spacing: -.01em;
    }

    .sla-card {
      grid-template-columns: 31px 1fr !important;
      gap: 8px !important;
      padding: 8px !important;
      border-radius: 13px !important;
      margin-bottom: 8px !important;
    }

    .sla-icon {
      width: 31px !important;
      height: 31px !important;
      font-size: 8px !important;
      border-radius: 10px !important;
    }

    .sla-card span {
      font-size: 8px !important;
      line-height: 1.05 !important;
      margin-bottom: 3px !important;
    }

    .sla-card strong {
      font-size: 11px !important;
      line-height: 1.28 !important;
      letter-spacing: -.01em;
    }

    .phase-meter-label {
      font-size: 9.5px !important;
      line-height: 1.15 !important;
      margin-bottom: 5px !important;
    }

    .phase-meter-label span:first-child {
      max-width: 140px !important;
    }

    .phase-select {
      height: 34px !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
      padding: 0 9px !important;
    }

    .card-actions .btn-small {
      height: 30px !important;
      font-size: 10px !important;
      letter-spacing: 0 !important;
    }

    .kanban-card-footer {
      padding: 0 12px 12px !important;
    }

    .cards {
      gap: 10px !important;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(238px, 1fr)) !important;
      }

      .kanban-id {
        max-width: 126px !important;
      }

      .column-header h3 {
        max-width: 156px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(230px, 1fr)) !important;
      }

      .route-content strong {
        font-size: 10.5px !important;
      }

      .kanban-info-box strong,
      .sla-card strong {
        font-size: 10.5px !important;
      }
    }


    .dashboard-executive-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
    }
    .dashboard-title-row { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:18px; }
    .dashboard-update-badge { white-space:nowrap; padding:9px 12px; border-radius:999px; background:#0e4a6e; color:white; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(14,74,110,.18); }
    .executive-kpis { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:16px; }
    .executive-kpi { min-height:112px; padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); border-left:6px solid #155a82; }
    .executive-kpi.critical { border-left-color:#ef4444; } .executive-kpi.warning { border-left-color:#facc15; } .executive-kpi.success { border-left-color:#22c55e; }
    .executive-kpi span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:10px; }
    .executive-kpi strong { display:block; color:#0f172a; font-size:28px; line-height:1; font-weight:950; letter-spacing:-.055em; }
    .executive-kpi p { margin:8px 0 0; color:#64748b; font-size:11px; line-height:1.25; font-weight:750; }
    .decision-strip { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:center; padding:16px; margin-bottom:16px; border-radius:22px; background:linear-gradient(135deg,#0e4a6e,#155a82); border-bottom:5px solid var(--seel-yellow); color:white; box-shadow:0 16px 30px rgba(14,74,110,.18); }
    .decision-strip span { display:block; margin-bottom:6px; color:rgba(255,255,255,.72); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; }
    .decision-strip strong { display:block; font-size:18px; line-height:1.2; font-weight:950; }
    .decision-strip p { margin:0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.45; font-weight:700; }
    .powerbi-grid { display:grid; grid-template-columns:1.35fr .85fr .9fr; gap:14px; align-items:stretch; margin-bottom:16px; }
    .bi-card { min-height:300px; padding:15px; border-radius:22px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.08); }
    .bi-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }
    .bi-eyebrow { display:block; margin-bottom:4px; color:#64748b; font-size:10px; font-weight:950; letter-spacing:.07em; text-transform:uppercase; }
    .bi-card h3 { margin:0; font-size:15px; color:#0f172a; line-height:1.2; }
    .bi-card-header strong { color:#0e4a6e; font-size:12px; padding:6px 9px; border-radius:999px; background:#e7f2f8; }
    .horizontal-bars { display:grid; gap:10px; }
    .hbar-row { display:grid; grid-template-columns:142px 1fr 38px; gap:10px; align-items:center; }
    .hbar-label { color:#334155; font-size:11px; font-weight:850; line-height:1.15; }
    .hbar-track { height:13px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .hbar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,#155a82,#facc15); min-width:4px; }
    .hbar-value { text-align:right; color:#0f172a; font-size:12px; font-weight:950; }
    .donut-card { min-height:230px; display:grid; place-items:center; }
    .donut-wrap { position:relative; width:190px; height:190px; border-radius:50%; background:conic-gradient(#ef4444 0deg,#ef4444 var(--red-deg),#facc15 var(--red-deg),#facc15 var(--yellow-deg),#22c55e var(--yellow-deg),#22c55e 360deg); }
    .donut-wrap::after { content:""; position:absolute; inset:34px; border-radius:50%; background:#fff; box-shadow:inset 0 0 0 1px rgba(100,116,139,.14); }
    .donut-center { position:absolute; inset:0; z-index:1; display:grid; place-content:center; text-align:center; }
    .donut-center strong { color:#0f172a; font-size:30px; line-height:1; font-weight:950; }
    .donut-center span { display:block; margin-top:5px; color:#64748b; font-size:10px; font-weight:900; text-transform:uppercase; }
    .donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:14px; font-size:11px; color:#334155; font-weight:800; }
    .donut-legend i { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; }
    .funnel-chart { display:grid; gap:10px; padding-top:6px; }
    .funnel-step { min-height:43px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; color:#fff; background:linear-gradient(90deg,#0e4a6e,#155a82); width:var(--w); min-width:58%; }
    .funnel-step span { font-size:11px; font-weight:900; } .funnel-step strong { font-size:17px; font-weight:950; }
    .vertical-chart { height:250px; display:flex; align-items:end; gap:11px; padding:10px 4px 0; border-bottom:1px solid #cbd5e1; }
    .vbar { flex:1; min-width:0; display:grid; grid-template-rows:1fr auto; gap:7px; height:100%; }
    .vbar-fill-wrap { display:flex; align-items:end; height:100%; }
    .vbar-fill { width:100%; height:var(--h); border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#155a82,#0e4a6e); min-height:8px; position:relative; }
    .vbar-fill::before { content:attr(data-value); position:absolute; top:-22px; left:50%; transform:translateX(-50%); color:#0f172a; font-size:11px; font-weight:950; }
    .vbar-label { color:#64748b; font-size:10px; line-height:1.1; text-align:center; font-weight:850; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .deadline-list,.avg-list { display:grid; gap:9px; }
    .deadline-item,.avg-item { display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center; padding:10px; border-radius:14px; background:#f8fafc; border:1px solid rgba(100,116,139,.14); }
    .deadline-item strong,.avg-item strong { color:#0f172a; font-size:12px; } .deadline-item span,.avg-item span { display:block; margin-top:3px; color:#64748b; font-size:10px; font-weight:750; }
    .deadline-tag { padding:5px 7px; border-radius:999px; font-size:10px; font-weight:950; white-space:nowrap; } .deadline-tag.red{background:#fee2e2;color:#991b1b}.deadline-tag.yellow{background:#fef3c7;color:#92400e}.deadline-tag.green{background:#dcfce7;color:#166534}.deadline-tag.gray{background:#e2e8f0;color:#334155}
    .insights-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .insight-card { padding:15px; border-radius:20px; background:#fff; border:1px solid rgba(100,116,139,.16); box-shadow:0 12px 24px rgba(15,23,42,.07); }
    .insight-card span { display:block; color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; margin-bottom:7px; }
    .insight-card strong { display:block; color:#0f172a; font-size:16px; line-height:1.2; margin-bottom:7px; }
    .insight-card p { margin:0; color:#64748b; font-size:12px; line-height:1.35; font-weight:700; }
    @media (max-width:1400px){.executive-kpis{grid-template-columns:repeat(3,1fr)}.powerbi-grid{grid-template-columns:1fr 1fr}}
    @media (max-width:900px){.dashboard-title-row,.decision-strip{display:grid;grid-template-columns:1fr}.dashboard-update-badge{white-space:normal}.executive-kpis,.powerbi-grid,.insights-grid{grid-template-columns:1fr}}


    /* Aba de cotação por frete */
    .quote-panel {
      background: radial-gradient(circle at 12% 0%, rgba(255,225,25,.14), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,250,252,.95));
    }

    .quote-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .quote-total-saving {
      min-width: 220px;
      padding: 14px 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      border-bottom: 5px solid var(--seel-yellow);
      box-shadow: 0 14px 28px rgba(14,74,110,.18);
    }

    .quote-total-saving span,
    .quote-selected-header span,
    .quote-comparison-header span {
      display: block;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .07em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }

    .quote-total-saving strong {
      display: block;
      font-size: 26px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
    }

    .quote-layout {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 16px;
      align-items: start;
    }

    .quote-sidebar,
    .quote-main {
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 12px 24px rgba(15,23,42,.07);
    }

    .quote-sidebar {
      padding: 15px;
      max-height: 760px;
      overflow-y: auto;
    }

    .quote-sidebar h3 {
      margin: 0 0 6px;
      color: #0f172a;
      font-size: 16px;
    }

    .quote-freight-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .quote-freight-item {
      padding: 12px;
      border-radius: 16px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      cursor: pointer;
      transition: .18s ease;
    }

    .quote-freight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(21,90,130,.32);
      box-shadow: 0 10px 18px rgba(15,23,42,.08);
    }

    .quote-freight-item.active {
      background: #e7f2f8;
      border-color: #155a82;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-freight-item strong {
      display: block;
      color: #0f172a;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .quote-freight-item span {
      display: block;
      color: #64748b;
      font-size: 11px;
      line-height: 1.3;
      font-weight: 750;
    }

    .quote-mini-saving {
      display: inline-flex !important;
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534 !important;
      font-size: 10px !important;
      font-weight: 950 !important;
    }

    .quote-main {
      padding: 16px;
      min-height: 520px;
    }

    .quote-empty {
      min-height: 450px;
      display: grid;
      place-content: center;
      text-align: center;
      gap: 8px;
      color: #64748b;
      border: 2px dashed rgba(100,116,139,.22);
      border-radius: 20px;
      background: #f8fafc;
    }

    .quote-empty strong {
      color: #0f172a;
      font-size: 20px;
    }

    .quote-empty span {
      max-width: 440px;
      line-height: 1.45;
      font-weight: 700;
    }

    .quote-selected-header {
      display: grid;
      grid-template-columns: 1fr 210px;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 16px;
    }

    .quote-selected-header > div:first-child,
    .quote-saving-card {
      padding: 15px;
      border-radius: 20px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-selected-header span,
    .quote-comparison-header span {
      color: #64748b;
    }

    .quote-selected-header h3 {
      margin: 0 0 5px;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-selected-header p {
      margin: 0;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-saving-card {
      background: linear-gradient(135deg, #ecfdf5, #ffffff);
      border-left: 6px solid #22c55e;
    }

    .quote-saving-card strong {
      display: block;
      color: #166534;
      font-size: 25px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.05em;
      margin-bottom: 6px;
    }

    .quote-saving-card small {
      color: #166534;
      font-size: 12px;
      font-weight: 950;
    }

    .quote-form-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr .9fr 1fr .8fr 1.2fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .quote-form-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .quote-comparison-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 13px;
      border-radius: 18px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      margin-bottom: 12px;
    }

    .quote-comparison-header strong {
      display: block;
      color: #0f172a;
      font-size: 18px;
    }

    .quote-comparison-header p {
      margin: 0;
      max-width: 520px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 750;
    }

    .quote-table-wrap {
      overflow-x: auto;
      border-radius: 18px;
      border: 1px solid rgba(100,116,139,.16);
    }

    .quote-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 920px;
      background: #ffffff;
    }

    .quote-table th {
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      padding: 11px 10px;
      text-align: left;
    }

    .quote-table td {
      padding: 11px 10px;
      border-bottom: 1px solid rgba(100,116,139,.14);
      font-size: 12px;
      color: #334155;
      vertical-align: middle;
    }

    .quote-table tr.best-row {
      background: #ecfdf5;
    }

    .quote-table tr.selected-row {
      background: #e7f2f8;
      box-shadow: inset 5px 0 0 #155a82;
    }

    .quote-price {
      color: #0f172a;
      font-weight: 950;
    }

    .quote-saving-positive {
      color: #166534;
      font-weight: 950;
    }

    .quote-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 950;
      white-space: nowrap;
    }

    .quote-badge.best {
      background: #dcfce7;
      color: #166534;
    }

    .quote-badge.selected {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .quote-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .quote-actions button {
      height: 28px;
      padding: 0 8px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 1400px) {
      .quote-layout {
        grid-template-columns: 1fr;
      }

      .quote-form-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (max-width: 800px) {
      .quote-title-row,
      .quote-selected-header,
      .quote-comparison-header {
        display: grid;
        grid-template-columns: 1fr;
      }

      .quote-total-saving {
        min-width: 0;
      }

      .quote-form-grid {
        grid-template-columns: 1fr;
      }
    }


    .quote-feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .quote-feature-card {
      padding: 14px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid rgba(100,116,139,.16);
      box-shadow: 0 10px 22px rgba(15,23,42,.07);
      min-height: 118px;
    }

    .quote-feature-card span {
      width: 28px;
      height: 28px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0e4a6e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 950;
      margin-bottom: 9px;
    }

    .quote-feature-card strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .quote-feature-card p {
      margin: 0;
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 700;
    }

    .quote-table td:first-child strong {
      color: #0e4a6e;
    }

    .quote-empty {
      background:
        radial-gradient(circle at 50% 20%, rgba(255,225,25,.16), transparent 28%),
        #f8fafc;
    }

    @media (max-width: 1200px) {
      .quote-feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .quote-feature-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1300px) {
      .form-grid,
      .dashboard-grid,
      .kanban-toolbar {
        grid-template-columns: repeat(2, minmax(180px, 1fr));
      }

      .map-layout {
        grid-template-columns: 1fr;
      }

      .truck-status-card {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 760px) {
      main { padding: 14px; }
      header { padding: 16px; position: relative; }
      header p { margin-left: 0; }
      .tabs { top: 0; position: relative; }
      .form-grid,
      .dashboard-grid,
      .kanban-toolbar,
      .truck-status-card {
        grid-template-columns: 1fr;
      }
      .map-stage { min-height: 560px; }
      .phase-road {
        grid-template-columns: 1fr;
        right: auto;
        width: 170px;
      }
      .moving-truck {
        width: 104px;
        transform: scale(.9) translateY(var(--truck-y, 0));
      }
    }


    /* =========================================================
       SUPPLY FLOW SEEL - GESTÃO DE FRETES
       ========================================================= */
    :root {
      --sf-navy: #0b3553;
      --sf-navy-2: #082a43;
      --sf-blue: #075985;
      --sf-blue-2: #0a6d9e;
      --sf-yellow: #f5c400;
      --sf-bg: #f4f7fa;
      --sf-surface: #ffffff;
      --sf-line: #dfe7ed;
      --sf-text: #173247;
      --sf-muted: #6d8291;
      --sf-shadow: 0 12px 32px rgba(15,53,80,.08);
    }

    body { background: var(--sf-bg) !important; color: var(--sf-text); }
    body::before { display: none !important; }
    .sf-app { min-height: 100vh; }
    .sf-workspace { min-height: 100vh; width: 100%; }

    header.sf-topbar {
      height: 68px;
      min-height: 68px;
      padding: 0 clamp(18px,3vw,38px);
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      flex-wrap: nowrap;
      color: var(--sf-text);
      background: rgba(255,255,255,.98) !important;
      border: 0;
      border-bottom: 1px solid var(--sf-line);
      box-shadow: 0 3px 16px rgba(15,53,80,.05);
      backdrop-filter: blur(14px);
    }

    .sf-topbar-left,.sf-topbar-actions,.sf-user-chip,.sf-module-brand,.sf-breadcrumb { display: flex; align-items: center; }
    .sf-topbar-left { gap: 14px; min-width: 0; }
    .sf-topbar-actions { gap: 11px; }
    .sf-module-brand { gap: 10px; padding-right: 18px; border-right: 1px solid var(--sf-line); }
    .sf-module-mark { width: 38px; height: 38px; flex: none; border-radius: 11px; display: grid; place-items: center; color: var(--sf-yellow); background: var(--sf-navy); border: 2px solid var(--sf-yellow); }
    .sf-module-mark svg { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
    .sf-module-brand > div { display: grid; line-height: 1.05; }
    .sf-module-brand strong { font-size: 12px; letter-spacing: .08em; color: var(--sf-navy); }
    .sf-module-brand small { font-size: 10px; color: #69808e; margin-top: 3px; }
    .sf-breadcrumb { gap: 9px; font-size: 13px; min-width: 0; }
    .sf-breadcrumb span { color: var(--sf-muted); }
    .sf-breadcrumb b { color: #b8c6cf; }
    .sf-breadcrumb strong { color: var(--sf-navy); }

    .sf-global-search { width: 285px; height: 40px; display: flex; align-items: center; gap: 9px; padding: 0 12px; margin: 0; border: 1px solid var(--sf-line); border-radius: 12px; background: #f7f9fb; }
    .sf-global-search svg { width: 18px; height: 18px; flex: none; fill: none; stroke: #7b909e; stroke-width: 2; }
    .sf-global-search input { border: 0; margin: 0; padding: 0; background: transparent; box-shadow: none; font-size: 13px; }
    .sf-global-search input:focus { box-shadow: none; }
    .sf-icon-btn { width: 40px; height: 40px; min-height: 40px; padding: 0; display: grid; place-items: center; border: 1px solid var(--sf-line); border-radius: 12px; background: #f5f8fa !important; color: var(--sf-navy) !important; box-shadow: none !important; }
    .sf-icon-btn svg,.sf-primary-action svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .sf-notification { position: relative; }
    .sf-notification span { position: absolute; right: 8px; top: 7px; width: 7px; height: 7px; background: #ef4444; border: 2px solid #fff; border-radius: 50%; }
    .sf-user-chip { gap: 9px; }
    .sf-user-avatar { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; background: var(--sf-navy); color: #fff; font-size: 12px; font-weight: 900; }
    .sf-user-chip > div:last-child { display: grid; gap: 1px; }
    .sf-user-chip strong { font-size: 12px; color: var(--sf-navy); }
    .sf-user-chip span { font-size: 10px; color: var(--sf-muted); }

    .sf-page-head { max-width: 1600px; margin: 0 auto; padding: 30px 34px 24px; display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
    .sf-eyebrow { margin-bottom: 7px; color: var(--sf-blue-2); font-size: 10px; font-weight: 900; letter-spacing: .16em; }
    .sf-page-head h1 { margin: 0; color: var(--sf-navy); font-size: 30px; letter-spacing: -.025em; }
    .sf-page-head p { margin: 7px 0 0; color: var(--sf-muted); font-size: 14px; line-height: 1.45; }
    .sf-page-actions { display: flex; gap: 10px; align-items: center; }
    .sf-primary-action,.sf-secondary-action { min-height: 44px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 0 17px; }
    .sf-primary-action { color: #fff !important; background: var(--sf-navy) !important; border: 0; border-bottom: 3px solid var(--sf-yellow); box-shadow: 0 8px 20px rgba(11,53,83,.18); }
    .sf-secondary-action { color: var(--sf-navy) !important; background: #fff !important; border: 1px solid var(--sf-line); box-shadow: none; }

    .tabs.sf-module-tabs { max-width: calc(1600px - 68px); margin: 0 auto; padding: 5px; position: sticky; top: 68px; z-index: 40; display: flex; flex-wrap: nowrap; gap: 4px; overflow-x: auto; border: 1px solid var(--sf-line); border-radius: 14px; background: rgba(255,255,255,.97); box-shadow: 0 6px 20px rgba(15,53,80,.05); backdrop-filter: blur(12px); }
    .tabs.sf-module-tabs .tab { min-height: 40px; white-space: nowrap; display: flex; align-items: center; gap: 8px; padding: 0 16px; border: 0; border-radius: 10px; color: #617989; background: transparent; box-shadow: none; font-size: 13px; }
    .tabs.sf-module-tabs .tab:hover { color: var(--sf-navy); background: #f4f7f9; }
    .tabs.sf-module-tabs .tab.active { color: var(--sf-blue); background: #eaf3f8; border: 0; box-shadow: inset 0 -2px 0 var(--sf-blue); }
    .sf-tab-dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: #b7c6cf; }
    .tabs.sf-module-tabs .tab.active .sf-tab-dot { background: var(--sf-yellow); box-shadow: 0 0 0 3px rgba(245,196,0,.2); }

    .sf-workspace > main { max-width: 1600px; margin: 0 auto; padding: 22px 34px 46px; }
    .panel { border: 1px solid var(--sf-line); border-radius: 18px; background: #fff; box-shadow: var(--sf-shadow); backdrop-filter: none; }
    .panel h2 { color: var(--sf-navy); }
    .panel h2::after { width: 54px; height: 4px; background: var(--sf-yellow); box-shadow: none; }

    .dashboard-filter-panel { margin: 0 0 18px; padding: 16px; border: 1px solid var(--sf-line); border-radius: 16px; background: linear-gradient(135deg,#fff,#f7fafb); box-shadow: 0 8px 24px rgba(15,53,80,.05); }
    .dashboard-filter-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 13px; }
    .dashboard-filter-head > div:first-child { display: grid; gap: 3px; }
    .dashboard-filter-kicker { color: var(--sf-blue); font-size: 9px; font-weight: 950; letter-spacing: .11em; text-transform: uppercase; }
    .dashboard-filter-head strong { color: var(--sf-navy); font-size: 14px; }
    .dashboard-filter-head p { margin: 0; color: var(--sf-muted); font-size: 11px; }
    .dashboard-filter-summary { padding: 7px 10px; border: 1px solid rgba(245,196,0,.45); border-radius: 999px; color: var(--sf-navy); background: rgba(245,196,0,.18); font-size: 10px; font-weight: 900; white-space: nowrap; }
    .dashboard-filter-grid { display: grid; grid-template-columns: minmax(230px,1.3fr) repeat(5,minmax(135px,.75fr)) auto; gap: 10px; align-items: end; }
    .dashboard-filter-field label { margin-bottom: 6px; color: #617989; font-size: 9px; letter-spacing: .05em; }
    .dashboard-filter-field input,.dashboard-filter-field select { height: 39px; margin: 0; border-radius: 10px; border-color: #d3e0e7; font-size: 12px; padding: 0 10px; }
    .dashboard-clear-btn { height: 39px; min-height: 39px; padding: 0 13px; color: var(--sf-navy); background: #fff; border: 1px solid var(--sf-line); box-shadow: none; white-space: nowrap; }

    .executive-kpis { gap: 12px; }
    .executive-kpi { border-left: 4px solid var(--sf-yellow); border-radius: 15px; box-shadow: 0 7px 20px rgba(15,53,80,.06); }
    .bi-card,.insight-card,.decision-strip { border-color: var(--sf-line); box-shadow: 0 8px 24px rgba(15,53,80,.05); }

    @media (max-width: 1260px) {
      .dashboard-filter-grid { grid-template-columns: repeat(3,minmax(170px,1fr)); }
      .dashboard-clear-btn { width: 100%; }
      .sf-global-search { display: none; }
    }
    @media (max-width: 820px) {
      header.sf-topbar { padding: 0 14px; }
      .sf-breadcrumb span,.sf-breadcrumb b,.sf-module-brand > div,.sf-user-chip > div:last-child { display: none; }
      .sf-module-brand { padding-right: 10px; }
      .sf-page-head { padding: 22px 18px 18px; flex-direction: column; }
      .sf-page-actions { width: 100%; display: grid; grid-template-columns: 1fr 1fr; }
      .tabs.sf-module-tabs { margin: 0 18px; top: 68px; }
      .sf-workspace > main { padding: 18px 18px 42px; }
      .dashboard-filter-grid { grid-template-columns: 1fr 1fr; }
      .dashboard-filter-head { flex-direction: column; }
    }
    @media (max-width: 560px) {
      .sf-page-head h1 { font-size: 25px; }
      .sf-user-chip { display: none; }
      .sf-page-actions,.dashboard-filter-grid { grid-template-columns: 1fr; }
      .tabs.sf-module-tabs .tab { padding: 0 12px; }
      .dashboard-filter-summary { white-space: normal; }
    }



    /* Editor visual do formulário */
    .form-editor-shell{display:grid;gap:16px}
    .form-editor-intro{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding-bottom:16px;border-bottom:1px solid var(--sf-line,#dfe7ed)}
    .form-editor-intro h2{margin:0 0 6px}.form-editor-intro p{margin:0;color:#64748b;font-size:13px;line-height:1.45}
    .form-editor-status{padding:8px 11px;border-radius:999px;background:#edf5f8;color:#0e4a6e;border:1px solid rgba(21,90,130,.16);font-size:11px;font-weight:900;white-space:nowrap}
    .form-editor-tools{display:grid;grid-template-columns:1fr 1.35fr auto;gap:12px;align-items:end;padding:14px;border-radius:16px;background:#f7fafb;border:1px solid rgba(21,90,130,.14)}
    .form-editor-tool{display:grid;gap:7px}.form-editor-tool label{margin:0;font-size:10px}.form-editor-tool-row{display:grid;grid-template-columns:1fr auto;gap:8px}.form-editor-tool-row.field-add{grid-template-columns:1.2fr .75fr .9fr auto}
    .form-editor-tool input,.form-editor-tool select{margin:0;height:40px}
    .form-editor-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}.form-editor-actions button{white-space:nowrap}
    .form-editor-list{display:grid;gap:10px}
    .form-editor-item{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:12px;align-items:start;padding:13px;border-radius:15px;background:#fff;border:1px solid rgba(100,116,139,.18);box-shadow:0 7px 18px rgba(15,23,42,.05)}
    .form-editor-item.section-item{background:linear-gradient(135deg,rgba(21,90,130,.08),rgba(255,255,255,.98));border-left:5px solid var(--seel-yellow,#ffe119)}
    .form-editor-order{width:42px;height:42px;border-radius:12px;background:#0e4a6e;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:950}
    .form-editor-item.section-item .form-editor-order{background:var(--seel-yellow,#ffe119);color:#0e4a6e}
    .form-editor-content{display:grid;gap:10px;min-width:0}
    .form-editor-main-grid{display:grid;grid-template-columns:1.4fr .75fr 1.2fr;gap:9px}.form-editor-main-grid.section-grid{grid-template-columns:1fr}
    .form-editor-content label{margin:0;font-size:9px}.form-editor-content input,.form-editor-content select,.form-editor-content textarea{margin-top:5px;padding:9px 10px;font-size:12px;border-radius:10px}.form-editor-content textarea{min-height:70px}
    .form-editor-options{display:none}.form-editor-item.is-select .form-editor-options{display:block}
    .form-editor-checks{display:flex;gap:12px;flex-wrap:wrap;padding:8px 10px;border-radius:11px;background:#f8fafc;border:1px solid rgba(100,116,139,.14)}
    .form-editor-checks label{display:flex;align-items:center;gap:6px;font-size:11px;text-transform:none;letter-spacing:0;color:#334155}.form-editor-checks input{width:auto;margin:0}
    .form-editor-item-actions{display:grid;grid-template-columns:repeat(2,34px);gap:6px}.form-editor-item-actions button{width:34px;height:34px;min-height:34px;padding:0;border-radius:10px;background:#f1f5f9;color:#0e4a6e;border:1px solid rgba(100,116,139,.18);font-size:14px}.form-editor-item-actions .delete-editor-item{grid-column:1/-1;width:74px;color:#991b1b;background:#fff1f2}
    .form-editor-empty{padding:34px;text-align:center;border:1px dashed #9fb4c1;border-radius:15px;color:#64748b;background:#f8fafc}
    .form-editor-note{font-size:11px;color:#64748b;padding:10px 12px;border-left:4px solid var(--seel-yellow,#ffe119);background:#fffbea;border-radius:10px;line-height:1.45}
    @media(max-width:1100px){.form-editor-tools{grid-template-columns:1fr}.form-editor-tool-row.field-add{grid-template-columns:1fr 1fr}.form-editor-actions{justify-content:flex-start}.form-editor-main-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:700px){.form-editor-intro{display:grid}.form-editor-item{grid-template-columns:38px 1fr}.form-editor-order{width:36px;height:36px}.form-editor-item-actions{grid-column:1/-1;display:flex}.form-editor-item-actions .delete-editor-item{width:auto}.form-editor-main-grid,.form-editor-tool-row.field-add,.form-editor-tool-row{grid-template-columns:1fr}}



    /* =========================================================
       KANBAN DE FRETES - PADRAO CADASTRO E CONTRATOS
       ========================================================= */
    #kanban .panel {
      background: transparent;
      border: 0;
      box-shadow: none;
      padding: 0;
    }

    #kanban .panel > h2,
    #kanban .panel > .muted {
      padding-left: 2px;
    }

    #kanban .kanban-toolbar {
      background: #ffffff;
      border: 1px solid var(--sf-line, rgba(21,90,130,.16));
      border-radius: 16px;
      box-shadow: 0 8px 22px rgba(15,53,80,.06);
      padding: 14px;
      margin-bottom: 16px;
    }

    #kanbanBoard {
      display: grid !important;
      grid-template-columns: repeat(7, minmax(248px, 1fr)) !important;
      gap: 12px !important;
      align-items: start;
      overflow-x: auto;
      padding: 2px 2px 16px !important;
    }

    #kanbanBoard .column {
      min-height: 520px !important;
      padding: 10px !important;
      border: 1px solid #cbdbe4 !important;
      border-radius: 15px !important;
      background: #edf3f6 !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.75) !important;
      scroll-snap-align: start;
    }

    #kanbanBoard .column::before {
      display: none !important;
    }

    #kanbanBoard .column-header {
      position: static !important;
      display: grid !important;
      grid-template-columns: 34px minmax(0,1fr) 32px !important;
      gap: 9px !important;
      align-items: center !important;
      padding: 0 0 9px !important;
      margin: 0 0 9px !important;
      background: transparent !important;
      border-bottom: 1px solid #d5e2e9 !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      border-radius: 0 !important;
      top: auto !important;
    }

    #kanbanBoard .column-icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      background: #ffffff;
      color: #075985;
      border: 1px solid #d5e2e9;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .04em;
    }

    #kanbanBoard .column-copy {
      min-width: 0;
    }

    #kanbanBoard .column-header h3 {
      margin: 0 !important;
      max-width: none !important;
      color: #0b3553 !important;
      font-size: 13px !important;
      line-height: 1.12 !important;
      font-weight: 900 !important;
      letter-spacing: 0 !important;
    }

    #kanbanBoard .column-header h3::before {
      display: none !important;
    }

    #kanbanBoard .column-copy p {
      margin: 3px 0 0;
      color: #6d8291;
      font-size: 9px;
      line-height: 1.15;
      font-weight: 700;
    }

    #kanbanBoard .column-header .count {
      min-width: 32px !important;
      height: 34px !important;
      padding: 0 7px !important;
      display: grid !important;
      place-items: center !important;
      border-radius: 10px !important;
      background: #ffffff !important;
      color: #0b3553 !important;
      border: 1px solid #d5e2e9 !important;
      box-shadow: none !important;
      font-size: 12px !important;
      font-weight: 950 !important;
    }

    #kanbanBoard .freight-card {
      position: relative;
      overflow: hidden;
      margin: 0 0 9px !important;
      padding: 0 !important;
      border: 1px solid #d7e2e9 !important;
      border-left: 4px solid #075985 !important;
      border-radius: 14px !important;
      background: #ffffff !important;
      box-shadow: 0 5px 14px rgba(15,53,80,.08) !important;
      opacity: 1 !important;
    }

    #kanbanBoard .freight-card:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 9px 20px rgba(15,53,80,.13) !important;
      border-color: #bfd0da !important;
    }

    #kanbanBoard .freight-card.red { border-left-color: #dc2626 !important; }
    #kanbanBoard .freight-card.yellow { border-left-color: #eab308 !important; }
    #kanbanBoard .freight-card.green { border-left-color: #16a34a !important; }
    #kanbanBoard .freight-card.cancelled { border-left-color: #64748b !important; }

    #kanbanBoard .kanban-card-header,
    #kanbanBoard .freight-card.red .kanban-card-header,
    #kanbanBoard .freight-card.yellow .kanban-card-header,
    #kanbanBoard .freight-card.green .kanban-card-header,
    #kanbanBoard .freight-card.cancelled .kanban-card-header {
      padding: 10px 10px 8px !important;
      color: #173247 !important;
      background: #ffffff !important;
      border-bottom: 1px solid #e2ebf0 !important;
    }

    #kanbanBoard .kanban-card-header::after {
      display: none !important;
    }

    #kanbanBoard .kanban-card-topline {
      margin-bottom: 7px !important;
      align-items: center !important;
    }

    #kanbanBoard .kanban-id-label {
      margin-bottom: 2px !important;
      color: #7b909e !important;
      font-size: 8px !important;
      letter-spacing: .07em !important;
    }

    #kanbanBoard .kanban-id {
      max-width: 138px !important;
      color: #0b3553 !important;
      font-size: 13px !important;
      line-height: 1.1 !important;
      font-weight: 950 !important;
      letter-spacing: -.02em !important;
    }

    #kanbanBoard .priority-pill {
      min-width: auto !important;
      max-width: 94px !important;
      min-height: 30px !important;
      padding: 5px 8px !important;
      border: 0 !important;
      border-radius: 10px !important;
      font-size: 8.5px !important;
      line-height: 1.05 !important;
      font-weight: 950 !important;
      text-align: center;
      backdrop-filter: none !important;
    }

    #kanbanBoard .priority-pill.red { background: #fee2e2 !important; color: #b91c1c !important; }
    #kanbanBoard .priority-pill.yellow { background: #fef3c7 !important; color: #92400e !important; }
    #kanbanBoard .priority-pill.green { background: #dcfce7 !important; color: #166534 !important; }
    #kanbanBoard .priority-pill.gray { background: #e2e8f0 !important; color: #475569 !important; }

    #kanbanBoard .kanban-chip-row {
      gap: 5px !important;
    }

    #kanbanBoard .kanban-chip {
      max-width: 105px !important;
      padding: 4px 7px !important;
      border: 1px solid #dce7ed !important;
      border-radius: 999px !important;
      color: #526f80 !important;
      background: #f4f8fa !important;
      font-size: 8px !important;
      line-height: 1.05 !important;
      font-weight: 850 !important;
    }

    #kanbanBoard .kanban-card-body {
      padding: 9px 10px 8px !important;
    }

    #kanbanBoard .kanban-section-title {
      margin-bottom: 6px !important;
      color: #6d8291 !important;
      font-size: 8px !important;
      letter-spacing: .06em !important;
    }

    #kanbanBoard .route-stack {
      gap: 6px !important;
      margin-bottom: 8px !important;
    }

    #kanbanBoard .route-card {
      grid-template-columns: 25px 1fr !important;
      gap: 7px !important;
      padding: 7px !important;
      border: 1px solid #dce7ed !important;
      border-radius: 11px !important;
      background: #f8fbfc !important;
      box-shadow: none !important;
    }

    #kanbanBoard .route-marker {
      width: 25px !important;
      height: 25px !important;
      border-radius: 9px !important;
      background: #0b3553 !important;
      color: #f5c400 !important;
      box-shadow: none !important;
      font-size: 9px !important;
    }

    #kanbanBoard .route-marker.dest {
      background: #075985 !important;
    }

    #kanbanBoard .route-content span {
      margin-bottom: 2px !important;
      color: #738997 !important;
      font-size: 7.5px !important;
    }

    #kanbanBoard .route-content strong {
      min-height: 0 !important;
      color: #173247 !important;
      font-size: 10px !important;
      line-height: 1.25 !important;
      -webkit-line-clamp: 2 !important;
    }

    #kanbanBoard .kanban-info-grid {
      gap: 6px !important;
      margin-bottom: 8px !important;
    }

    #kanbanBoard .kanban-info-box {
      padding: 7px !important;
      border: 1px solid #dce7ed !important;
      border-radius: 10px !important;
      background: #ffffff !important;
      box-shadow: none !important;
    }

    #kanbanBoard .kanban-info-box span {
      margin-bottom: 3px !important;
      color: #738997 !important;
      font-size: 7.5px !important;
    }

    #kanbanBoard .kanban-info-box strong {
      color: #173247 !important;
      font-size: 10px !important;
      line-height: 1.2 !important;
    }

    #kanbanBoard .sla-card {
      grid-template-columns: 30px 1fr !important;
      gap: 8px !important;
      padding: 8px !important;
      margin-bottom: 8px !important;
      border: 1px solid #d5e2e9 !important;
      border-radius: 11px !important;
      background: #ffffff !important;
    }

    #kanbanBoard .sla-icon {
      width: 30px !important;
      height: 30px !important;
      border-radius: 9px !important;
      background: #0b3553 !important;
      color: #f5c400 !important;
      font-size: 7.5px !important;
    }

    #kanbanBoard .sla-card span {
      margin-bottom: 2px !important;
      color: #738997 !important;
      font-size: 7.5px !important;
    }

    #kanbanBoard .sla-card strong {
      color: #173247 !important;
      font-size: 10px !important;
      line-height: 1.25 !important;
    }

    #kanbanBoard .phase-meter {
      margin-bottom: 7px !important;
    }

    #kanbanBoard .phase-meter-label {
      margin-bottom: 5px !important;
      color: #607987 !important;
      font-size: 8.5px !important;
      line-height: 1.12 !important;
    }

    #kanbanBoard .phase-meter-track {
      height: 6px !important;
      background: #e2e8f0 !important;
    }

    #kanbanBoard .phase-meter-fill {
      background: linear-gradient(90deg,#075985,#f5c400) !important;
    }

    #kanbanBoard .kanban-card-footer {
      padding: 0 10px 10px !important;
    }

    #kanbanBoard .phase-select {
      height: 33px !important;
      margin-bottom: 7px !important;
      padding: 0 8px !important;
      border: 1px solid #cbdbe4 !important;
      border-radius: 9px !important;
      background: #f8fbfc !important;
      color: #173247 !important;
      font-size: 10px !important;
      font-weight: 800 !important;
      box-shadow: none !important;
    }

    #kanbanBoard .card-actions {
      display: grid !important;
      grid-template-columns: 1fr 1fr 1fr !important;
      gap: 6px !important;
      margin-top: 0 !important;
    }

    #kanbanBoard .card-actions .btn-small {
      min-width: 0 !important;
      height: 29px !important;
      padding: 0 5px !important;
      border-radius: 8px !important;
      font-size: 9px !important;
      box-shadow: none !important;
    }

    #kanbanBoard .card-actions .btn-secondary {
      background: #ffffff !important;
      color: #0b3553 !important;
      border: 1px solid #cbdbe4 !important;
    }

    #kanbanBoard .card-actions .btn-danger {
      background: #fff1f2 !important;
      color: #b91c1c !important;
      border: 1px solid #fecdd3 !important;
    }

    #kanbanBoard .empty {
      min-height: 130px;
      display: grid;
      place-items: center;
      padding: 18px 12px;
      border: 1px dashed #9eb8c7;
      border-radius: 12px;
      background: rgba(255,255,255,.48);
      color: #6d8797;
      font-size: 10px;
    }

    @media (max-width: 1500px) {
      #kanbanBoard {
        grid-template-columns: repeat(7, minmax(235px, 1fr)) !important;
      }
    }

    @media (max-width: 900px) {
      #kanbanBoard {
        grid-template-columns: repeat(7, minmax(225px, 1fr)) !important;
      }
    }



    /* Compactação extra do Kanban de Fretes */
    .kanban-board {
      grid-template-columns: repeat(7, minmax(220px, 1fr)) !important;
      gap: 10px !important;
    }

    .column {
      padding: 0 8px 10px !important;
      border-radius: 18px !important;
    }

    .column-header {
      padding: 10px 9px 8px !important;
      margin: 0 -8px 10px !important;
      border-radius: 16px 16px 14px 14px !important;
    }

    .column-header h3 {
      font-size: 11.5px !important;
      line-height: 1.15 !important;
      max-width: 145px !important;
    }

    .column-header .count {
      min-width: 24px !important;
      height: 22px !important;
      font-size: 10px !important;
    }

    .cards {
      gap: 8px !important;
    }

    .freight-card {
      border-radius: 14px !important;
      box-shadow: 0 8px 16px rgba(15,23,42,.07) !important;
    }

    .kanban-card-header {
      padding: 9px 10px 8px !important;
    }

    .kanban-card-topline {
      margin-bottom: 5px !important;
      gap: 6px !important;
    }

    .kanban-id {
      font-size: 13px !important;
      line-height: 1.08 !important;
      max-width: 118px !important;
    }

    .priority-pill,
    .kanban-chip {
      padding: 3px 6px !important;
      font-size: 8px !important;
      line-height: 1.05 !important;
      border-radius: 999px !important;
    }

    .priority-pill { max-width: 82px !important; }
    .kanban-chip { max-width: 90px !important; }

    .kanban-card-body {
      padding: 8px 10px 8px !important;
      gap: 7px !important;
    }

    .route-card {
      grid-template-columns: 22px 1fr !important;
      gap: 6px !important;
      padding: 6px 7px !important;
      border-radius: 10px !important;
      margin-bottom: 6px !important;
    }

    .route-marker {
      width: 22px !important;
      height: 22px !important;
      font-size: 8.5px !important;
    }

    .route-content span,
    .kanban-info-box span,
    .sla-card span {
      font-size: 7px !important;
      line-height: 1 !important;
      margin-bottom: 2px !important;
      letter-spacing: .02em !important;
    }

    .route-content strong {
      font-size: 10px !important;
      line-height: 1.2 !important;
      min-height: 24px !important;
      -webkit-line-clamp: 2 !important;
    }

    .kanban-info-grid {
      gap: 5px !important;
      margin-bottom: 6px !important;
    }

    .kanban-info-box {
      padding: 6px 7px !important;
      border-radius: 10px !important;
    }

    .kanban-info-box strong,
    .sla-card strong {
      font-size: 10px !important;
      line-height: 1.16 !important;
    }

    .sla-card {
      grid-template-columns: 28px 1fr !important;
      gap: 6px !important;
      padding: 7px !important;
      border-radius: 11px !important;
      margin-bottom: 6px !important;
    }

    .sla-icon {
      width: 28px !important;
      height: 28px !important;
      font-size: 7.5px !important;
      border-radius: 9px !important;
    }

    .phase-meter-label {
      font-size: 8.5px !important;
      line-height: 1.1 !important;
      margin-bottom: 4px !important;
    }

    .phase-select {
      height: 30px !important;
      font-size: 10px !important;
      padding: 0 8px !important;
      border-radius: 10px !important;
    }

    .kanban-card-footer {
      padding: 0 10px 10px !important;
      gap: 6px !important;
    }

    .card-actions {
      gap: 5px !important;
    }

    .card-actions .btn-small {
      height: 27px !important;
      min-height: 27px !important;
      font-size: 9px !important;
      padding: 0 8px !important;
      border-radius: 9px !important;
    }

    @media (max-width: 1500px) {
      .kanban-board {
        grid-template-columns: repeat(7, minmax(205px, 1fr)) !important;
      }
      .column-header h3 { max-width: 130px !important; }
      .kanban-id { max-width: 102px !important; }
    }



    /* Dashboard, urgencia e cronometros - Supply Flow */
    .dashboard-filter-grid {
      grid-template-columns: minmax(220px,1.3fr) repeat(6,minmax(125px,.72fr)) auto !important;
    }

    .executive-kpis {
      grid-template-columns: repeat(7,minmax(145px,1fr)) !important;
    }

    .executive-kpi.sla-average { border-left-color: var(--sf-blue) !important; }
    .executive-kpi.normal { border-left-color: #2563eb !important; }
    .executive-kpi.urgent { border-left-color: #f97316 !important; }
    .executive-kpi.sla-average strong { font-size: 20px !important; line-height: 1.15 !important; }

    .kanban-chip.urgency-normal {
      background: rgba(219,234,254,.18) !important;
      color: #dbeafe !important;
      border-color: rgba(219,234,254,.32) !important;
    }

    .kanban-chip.urgency-urgente {
      background: rgba(255,237,213,.20) !important;
      color: #ffedd5 !important;
      border-color: rgba(251,146,60,.42) !important;
    }

    .kanban-timer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      margin-bottom: 6px;
    }

    .kanban-timer-box {
      min-width: 0;
      padding: 6px 7px;
      border-radius: 10px;
      background: #f4f8fa;
      border: 1px solid rgba(21,90,130,.15);
    }

    .kanban-timer-box span {
      display: block;
      margin-bottom: 3px;
      color: #64748b;
      font-size: 7px;
      font-weight: 950;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .kanban-timer-box strong {
      display: block;
      color: #0e4a6e;
      font-size: 9px;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 1600px) {
      .executive-kpis { grid-template-columns: repeat(4,minmax(145px,1fr)) !important; }
      .dashboard-filter-grid { grid-template-columns: repeat(4,minmax(150px,1fr)) !important; }
    }

    @media (max-width: 980px) {
      .executive-kpis { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
      .dashboard-filter-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
    }

    @media (max-width: 620px) {
      .executive-kpis,.dashboard-filter-grid,.kanban-timer-grid { grid-template-columns: 1fr !important; }
    }



    /* Semáforo da carteira no padrão Cadastro e Contratos */
    .semaphore-card {
      border-top: 0 !important;
      border-left: 1px solid rgba(100,116,139,.16) !important;
      border-radius: 16px !important;
      padding: 18px 20px !important;
      background: #ffffff !important;
      box-shadow: 0 12px 28px rgba(0,83,131,.08) !important;
    }

    .semaphore-card .bi-card-header {
      margin-bottom: 4px !important;
    }

    .semaphore-card .bi-card-header h3 {
      margin: 2px 0 6px !important;
      color: #0e4a6e !important;
      font-size: 17px !important;
    }

    .semaphore-card .bi-card-header p {
      margin: 0 !important;
      color: #688091 !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
    }

    .semaphore-chart {
      min-height: 190px;
      display: block;
      padding-top: 8px;
    }

    .semaphore-bar-list {
      display: grid;
      gap: 14px;
      margin-top: 10px;
    }

    .semaphore-bar-row {
      display: grid;
      grid-template-columns: 92px minmax(110px, 1fr) 84px;
      gap: 12px;
      align-items: center;
    }

    .semaphore-bar-label {
      font-weight: 850;
      color: #0e4a6e;
      font-size: 12px;
    }

    .semaphore-bar-track {
      height: 14px;
      border-radius: 999px;
      background: #dfeaf0;
      overflow: hidden;
      border: 1px solid #c8d9e2;
    }

    .semaphore-bar-fill {
      height: 100%;
      min-width: 0;
      border-radius: 999px;
      transition: width .45s ease;
    }

    .semaphore-bar-fill.red { background: #ef4444; }
    .semaphore-bar-fill.orange { background: #f97316; }
    .semaphore-bar-fill.green { background: #16a085; }

    .semaphore-bar-metric {
      text-align: right;
      font-weight: 850;
      color: #0e4a6e;
      font-size: 12px;
      white-space: nowrap;
    }

    .semaphore-total-strip {
      margin-top: 15px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid rgba(100,116,139,.16);
      display: flex;
      justify-content: space-between;
      gap: 10px;
      color: #64748b;
      font-size: 11px;
      font-weight: 800;
    }

    .semaphore-total-strip strong {
      color: #0e4a6e;
      font-size: 12px;
    }

    @media (max-width: 650px) {
      .semaphore-bar-row {
        grid-template-columns: 78px minmax(80px, 1fr) 72px;
        gap: 8px;
      }
      .semaphore-bar-label,
      .semaphore-bar-metric { font-size: 11px; }
    }



    /* Obras / Departamentos - ranking executivo */
    .obra-departamentos-card {
      overflow: hidden;
      background:
        radial-gradient(circle at 100% 0%, rgba(255,225,25,.12), transparent 30%),
        linear-gradient(180deg, #ffffff, #f8fbfd);
    }

    .obra-card-header {
      align-items: flex-start;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(21,90,130,.12);
    }

    .obra-card-header p {
      margin: 5px 0 0;
      max-width: 690px;
      color: #64748b;
      font-size: 12px;
      line-height: 1.45;
      font-weight: 650;
    }

    #obraSummaryLabel {
      padding: 8px 11px;
      border-radius: 999px;
      background: rgba(21,90,130,.09);
      color: #0e4a6e;
      border: 1px solid rgba(21,90,130,.15);
      font-size: 11px;
      white-space: nowrap;
    }

    .obra-ranking-chart {
      display: grid;
      gap: 8px;
      margin-top: 14px;
    }

    .obra-ranking-head,
    .obra-ranking-row {
      display: grid;
      grid-template-columns: 34px minmax(150px, 1.15fr) minmax(210px, 2.15fr) 94px;
      gap: 10px;
      align-items: center;
    }

    .obra-ranking-head {
      padding: 0 10px 4px;
      color: #7890a1;
      font-size: 9px;
      font-weight: 950;
      letter-spacing: .065em;
      text-transform: uppercase;
    }

    .obra-ranking-row {
      min-height: 58px;
      padding: 9px 10px;
      border-radius: 15px;
      border: 1px solid rgba(100,116,139,.13);
      background: rgba(255,255,255,.92);
      box-shadow: 0 5px 14px rgba(15,23,42,.045);
      transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
    }

    .obra-ranking-row:hover {
      transform: translateY(-1px);
      border-color: rgba(21,90,130,.25);
      box-shadow: 0 9px 20px rgba(15,23,42,.075);
    }

    .obra-rank {
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: #eaf3f8;
      color: #0e4a6e;
      font-size: 11px;
      font-weight: 950;
      border: 1px solid rgba(21,90,130,.12);
    }

    .obra-ranking-row:first-of-type .obra-rank {
      background: #ffe119;
      color: #0e4a6e;
      border-color: #e2c600;
      box-shadow: 0 5px 12px rgba(255,225,25,.24);
    }

    .obra-name {
      min-width: 0;
    }

    .obra-name strong {
      display: block;
      color: #0f172a;
      font-size: 12px;
      font-weight: 950;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .obra-name span {
      display: block;
      margin-top: 4px;
      color: #64748b;
      font-size: 9.5px;
      font-weight: 750;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .obra-volume-area {
      min-width: 0;
    }

    .obra-volume-track {
      width: 100%;
      height: 12px;
      overflow: hidden;
      border-radius: 999px;
      background: #e8eef2;
      box-shadow: inset 0 1px 2px rgba(15,23,42,.06);
    }

    .obra-volume-fill {
      width: var(--bar-size, 0%);
      min-width: 8px;
      height: 100%;
      display: flex;
      overflow: hidden;
      border-radius: inherit;
      transition: width .45s ease;
    }

    .obra-segment-open { background: linear-gradient(90deg, #0e4a6e, #267ba7); }
    .obra-segment-delivered { background: linear-gradient(90deg, #15803d, #22c55e); }
    .obra-segment-cancelled { background: linear-gradient(90deg, #64748b, #94a3b8); }

    .obra-volume-meta {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: 5px;
      color: #64748b;
      font-size: 9px;
      font-weight: 800;
    }

    .obra-total {
      text-align: right;
    }

    .obra-total strong {
      display: block;
      color: #0e4a6e;
      font-size: 17px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -.03em;
    }

    .obra-total span {
      display: block;
      margin-top: 4px;
      color: #64748b;
      font-size: 9px;
      font-weight: 850;
    }

    .obra-ranking-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 10px 10px 0;
      color: #64748b;
      font-size: 9.5px;
      font-weight: 800;
    }

    .obra-ranking-legend span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .obra-ranking-legend i {
      width: 9px;
      height: 9px;
      display: inline-block;
      border-radius: 3px;
    }

    .obra-ranking-more {
      padding: 9px 11px;
      border-radius: 12px;
      background: rgba(21,90,130,.055);
      color: #4d7088;
      text-align: center;
      font-size: 10px;
      font-weight: 850;
    }

    @media (max-width: 900px) {
      .obra-ranking-head { display: none; }
      .obra-ranking-row {
        grid-template-columns: 32px minmax(0, 1fr) 70px;
      }
      .obra-volume-area {
        grid-column: 2 / 4;
      }
    }



    /* Redimensionamento visual do gráfico Obras / Departamentos */
    #dashboard .obra-departamentos-card {
      grid-column: span 2;
      min-height: 470px;
      padding: 18px 20px 17px;
    }

    #dashboard .obra-card-header {
      margin-bottom: 12px;
      padding-bottom: 15px;
    }

    #dashboard .obra-card-header h3 {
      font-size: 17px;
      line-height: 1.2;
    }

    #dashboard .obra-card-header p {
      max-width: 820px;
      font-size: 12.5px;
    }

    #dashboard .obra-ranking-chart {
      gap: 7px;
      margin-top: 10px;
      width: 100%;
    }

    #dashboard .obra-ranking-head,
    #dashboard .obra-ranking-row {
      grid-template-columns: 38px minmax(190px, 1.25fr) minmax(330px, 2.6fr) 104px;
      gap: 14px;
    }

    #dashboard .obra-ranking-head {
      padding: 0 12px 5px;
      font-size: 9.5px;
    }

    #dashboard .obra-ranking-row {
      min-height: 52px;
      padding: 8px 12px;
      border-radius: 14px;
    }

    #dashboard .obra-rank {
      width: 30px;
      height: 30px;
      font-size: 11px;
    }

    #dashboard .obra-name strong {
      font-size: 12.5px;
    }

    #dashboard .obra-name span {
      margin-top: 3px;
      font-size: 9.5px;
    }

    #dashboard .obra-volume-track {
      height: 15px;
    }

    #dashboard .obra-volume-meta {
      margin-top: 4px;
      font-size: 9.5px;
    }

    #dashboard .obra-total strong {
      font-size: 19px;
    }

    #dashboard .obra-total span {
      margin-top: 3px;
      font-size: 9px;
    }

    #dashboard .obra-ranking-legend {
      gap: 16px;
      padding: 11px 12px 0;
      font-size: 10px;
    }

    #dashboard .obra-ranking-legend i {
      width: 10px;
      height: 10px;
    }

    @media (max-width: 1400px) {
      #dashboard .obra-departamentos-card {
        grid-column: 1 / -1;
      }

      #dashboard .obra-ranking-head,
      #dashboard .obra-ranking-row {
        grid-template-columns: 38px minmax(170px, 1.2fr) minmax(260px, 2fr) 96px;
      }
    }

    @media (max-width: 900px) {
      #dashboard .obra-departamentos-card {
        grid-column: auto;
        min-height: auto;
        padding: 15px;
      }

      #dashboard .obra-ranking-head {
        display: none;
      }

      #dashboard .obra-ranking-row {
        grid-template-columns: 32px minmax(0, 1fr) 76px;
        gap: 9px;
        min-height: 62px;
      }

      #dashboard .obra-volume-area {
        grid-column: 2 / 4;
      }
    }



    /* Dashboard responsivo: gráficos ocupando toda a área disponível */
    #dashboard .powerbi-grid {
      display: grid !important;
      grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
      grid-auto-flow: row dense !important;
      grid-auto-rows: auto !important;
      gap: 16px !important;
      align-items: stretch !important;
      width: 100% !important;
    }

    #dashboard .powerbi-grid > .bi-card {
      display: flex !important;
      flex-direction: column !important;
      width: 100% !important;
      height: 100% !important;
      min-width: 0 !important;
      overflow: hidden !important;
    }

    #dashboard .powerbi-grid > .bi-card:nth-child(1) {
      grid-column: span 7 !important;
      min-height: 390px !important;
    }

    #dashboard .powerbi-grid > .bi-card:nth-child(2) {
      grid-column: span 5 !important;
      min-height: 390px !important;
    }

    #dashboard .powerbi-grid > .bi-card:nth-child(3) {
      grid-column: 1 / -1 !important;
      min-height: 550px !important;
    }

    #dashboard .powerbi-grid > .bi-card:nth-child(4),
    #dashboard .powerbi-grid > .bi-card:nth-child(5) {
      grid-column: span 6 !important;
      min-height: 370px !important;
    }

    #dashboard .bi-card-header {
      flex: 0 0 auto !important;
    }

    #dashboard #phaseBarChart,
    #dashboard #riskDonut,
    #dashboard #obraBarChart,
    #dashboard #deadlineList,
    #dashboard #phaseAverages {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      width: 100% !important;
    }

    #dashboard #phaseBarChart {
      display: grid !important;
      grid-template-rows: repeat(7, minmax(38px, 1fr)) !important;
      gap: 12px !important;
      align-content: stretch !important;
      padding: 6px 2px 2px !important;
    }

    #dashboard #phaseBarChart .hbar-row {
      grid-template-columns: minmax(155px, 195px) minmax(140px, 1fr) 42px !important;
      min-height: 38px !important;
      gap: 12px !important;
    }

    #dashboard #phaseBarChart .hbar-label {
      font-size: 11.5px !important;
      line-height: 1.2 !important;
    }

    #dashboard #phaseBarChart .hbar-track {
      height: 17px !important;
    }

    #dashboard #phaseBarChart .hbar-value {
      font-size: 13px !important;
    }

    #dashboard #riskDonut {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      padding: 10px 2px 4px !important;
    }

    #dashboard #riskDonut .semaphore-bar-list {
      width: 100% !important;
      gap: 22px !important;
      margin: 0 !important;
    }

    #dashboard #riskDonut .semaphore-bar-row {
      grid-template-columns: 100px minmax(120px, 1fr) 92px !important;
      gap: 13px !important;
    }

    #dashboard #riskDonut .semaphore-bar-track {
      height: 18px !important;
    }

    #dashboard #riskDonut .semaphore-bar-label,
    #dashboard #riskDonut .semaphore-bar-metric {
      font-size: 12.5px !important;
    }

    #dashboard #riskDonut .semaphore-total-strip {
      margin-top: 24px !important;
      padding: 13px 14px !important;
    }

    #dashboard .obra-departamentos-card {
      grid-column: 1 / -1 !important;
      min-height: 550px !important;
    }

    #dashboard #obraBarChart {
      display: grid !important;
      align-content: stretch !important;
      gap: 8px !important;
    }

    #dashboard #obraBarChart .obra-ranking-row {
      min-height: 55px !important;
    }

    #dashboard #obraBarChart .obra-volume-track {
      height: 16px !important;
    }

    #dashboard #deadlineList,
    #dashboard #phaseAverages {
      display: grid !important;
      grid-auto-rows: minmax(48px, 1fr) !important;
      align-content: stretch !important;
      gap: 10px !important;
    }

    #dashboard #deadlineList .deadline-item,
    #dashboard #phaseAverages .avg-item {
      min-height: 48px !important;
      height: 100% !important;
      padding: 11px 12px !important;
    }

    #dashboard .insights-grid {
      align-items: stretch !important;
    }

    #dashboard .insight-card {
      min-height: 130px !important;
      height: 100% !important;
    }

    @media (min-width: 1800px) {
      #dashboard .powerbi-grid > .bi-card:nth-child(1) {
        grid-column: span 8 !important;
      }
      #dashboard .powerbi-grid > .bi-card:nth-child(2) {
        grid-column: span 4 !important;
      }
      #dashboard #phaseBarChart .hbar-row {
        grid-template-columns: 210px minmax(180px, 1fr) 46px !important;
      }
    }

    @media (max-width: 1399px) {
      #dashboard .powerbi-grid > .bi-card:nth-child(1),
      #dashboard .powerbi-grid > .bi-card:nth-child(2) {
        grid-column: span 6 !important;
      }
      #dashboard .powerbi-grid > .bi-card:nth-child(3) {
        grid-column: 1 / -1 !important;
      }
      #dashboard #phaseBarChart .hbar-row {
        grid-template-columns: minmax(130px, 165px) minmax(110px, 1fr) 38px !important;
      }
    }

    @media (max-width: 1050px) {
      #dashboard .powerbi-grid > .bi-card:nth-child(n) {
        grid-column: 1 / -1 !important;
        min-height: auto !important;
      }
      #dashboard .powerbi-grid > .bi-card:nth-child(1),
      #dashboard .powerbi-grid > .bi-card:nth-child(2),
      #dashboard .powerbi-grid > .bi-card:nth-child(4),
      #dashboard .powerbi-grid > .bi-card:nth-child(5) {
        min-height: 340px !important;
      }
      #dashboard .powerbi-grid > .bi-card:nth-child(3) {
        min-height: 500px !important;
      }
    }

    @media (max-width: 680px) {
      #dashboard .powerbi-grid {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
      }
      #dashboard #phaseBarChart .hbar-row {
        grid-template-columns: 110px minmax(80px, 1fr) 32px !important;
        gap: 8px !important;
      }
      #dashboard #riskDonut .semaphore-bar-row {
        grid-template-columns: 78px minmax(70px, 1fr) 76px !important;
        gap: 8px !important;
      }
    }



    /* Cabeçalho e apresentação inicial removidos */
    .sf-workspace {
      padding-top: 18px !important;
    }
    .sf-module-tabs {
      margin-top: 0 !important;
    }



    /* Barra de abas elevada para o topo */
    .sf-workspace {
      padding-top: 4px !important;
    }
    .tabs.sf-module-tabs,
    .sf-module-tabs {
      margin-top: 0 !important;
      top: 0 !important;
    }
    @media (max-width: 760px) {
      .sf-workspace {
        padding-top: 3px !important;
      }
      .tabs.sf-module-tabs {
        top: 0 !important;
      }
    }



    /* Barra de abas no mesmo padrão e posição do módulo Frota */
    .sf-workspace {
      padding-top: 0 !important;
    }
    .sf-workspace > main {
      width: min(1360px, calc(100% - 28px)) !important;
      max-width: none !important;
      margin: 0 auto !important;
      padding: 24px 0 46px !important;
    }
    .tabs.sf-module-tabs {
      position: static !important;
      top: auto !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 0 18px !important;
      padding: 5px !important;
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      overflow-x: auto !important;
      background: #ffffff !important;
      border: 1px solid #d5e2e9 !important;
      border-radius: 18px !important;
      box-shadow: 0 9px 22px rgba(0,62,95,.08) !important;
      backdrop-filter: none !important;
      z-index: auto !important;
    }
    .tabs.sf-module-tabs .tab {
      width: auto !important;
      min-height: 43px !important;
      padding: 0 13px !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 7px !important;
      border: 0 !important;
      border-radius: 13px !important;
      background: transparent !important;
      color: #536d7c !important;
      box-shadow: none !important;
      font-size: 12px !important;
      font-weight: 800 !important;
      white-space: nowrap !important;
    }
    .tabs.sf-module-tabs .tab:hover {
      background: #eef5f9 !important;
      color: #003d63 !important;
      transform: none !important;
      box-shadow: none !important;
    }
    .tabs.sf-module-tabs .tab.active {
      background: #ffdd00 !important;
      color: #003d63 !important;
      border: 0 !important;
      box-shadow: none !important;
    }
    .tabs.sf-module-tabs .tab-icon {
      font-size: 14px !important;
      line-height: 1 !important;
      flex: 0 0 auto !important;
    }
    .tabs.sf-module-tabs .sf-tab-dot {
      display: none !important;
    }
    @media (max-width: 760px) {
      .sf-workspace > main {
        width: min(100%, calc(100% - 20px)) !important;
        padding-top: 16px !important;
      }
      .tabs.sf-module-tabs {
        flex-wrap: nowrap !important;
      }
    }



    /* Redução adicional da largura dos cards do Kanban */
    #kanbanBoard,
    .kanban-board {
      grid-template-columns: repeat(7, minmax(185px, 200px)) !important;
      justify-content: start !important;
      gap: 9px !important;
    }

    #kanbanBoard .column,
    .kanban-board .column {
      width: 100% !important;
      min-width: 185px !important;
      max-width: 200px !important;
    }

    #kanbanBoard .freight-card,
    .kanban-board .freight-card {
      width: 100% !important;
      min-width: 0 !important;
    }

    #kanbanBoard .column-header h3,
    .kanban-board .column-header h3 {
      max-width: 112px !important;
      font-size: 10.5px !important;
    }

    #kanbanBoard .kanban-id,
    .kanban-board .kanban-id {
      max-width: 96px !important;
      font-size: 12px !important;
    }

    #kanbanBoard .kanban-info-grid,
    .kanban-board .kanban-info-grid {
      grid-template-columns: 1fr !important;
    }

    @media (max-width: 1500px) {
      #kanbanBoard,
      .kanban-board {
        grid-template-columns: repeat(7, minmax(180px, 192px)) !important;
      }
      #kanbanBoard .column,
      .kanban-board .column {
        min-width: 180px !important;
        max-width: 192px !important;
      }
    }

    @media (max-width: 900px) {
      #kanbanBoard,
      .kanban-board {
        grid-template-columns: repeat(7, minmax(178px, 190px)) !important;
      }
      #kanbanBoard .column,
      .kanban-board .column {
        min-width: 178px !important;
        max-width: 190px !important;
      }
    }



    /* Cards compactos: dados de veículo, peso e valor somente nos detalhes */
    .kanban-info-grid.kanban-info-grid-summary {
      grid-template-columns: 1fr !important;
      margin-bottom: 9px !important;
    }
    .kanban-info-grid.kanban-info-grid-summary .kanban-info-box {
      padding: 8px 10px !important;
    }



    /* Ajuste dos textos dos cards do modal de detalhes */
    #modalContent .dashboard-grid {
      grid-template-columns: repeat(5, minmax(140px, 1fr)) !important;
      gap: 16px !important;
      align-items: stretch;
    }

    #modalContent .metric {
      padding: 16px 16px 18px !important;
      border-radius: 18px !important;
      min-height: 128px;
    }

    #modalContent .metric::after {
      width: 92px !important;
      height: 92px !important;
      right: -36px !important;
      top: -40px !important;
      opacity: .55;
    }

    #modalContent .metric > span:first-child {
      display: block !important;
      font-size: 10px !important;
      line-height: 1.15 !important;
      letter-spacing: .03em !important;
      margin-bottom: 8px !important;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    #modalContent .metric strong {
      font-size: 18px !important;
      line-height: 1.15 !important;
      letter-spacing: -0.03em !important;
      margin-top: 0 !important;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    #modalContent .metric strong .badge {
      font-size: 9px !important;
      padding: 5px 8px !important;
      line-height: 1 !important;
    }

    @media (max-width: 1100px) {
      #modalContent .dashboard-grid {
        grid-template-columns: repeat(2, minmax(170px, 1fr)) !important;
      }
    }

    @media (max-width: 680px) {
      #modalContent .dashboard-grid {
        grid-template-columns: 1fr !important;
      }
    }



    /* Cards do modal no padrão visual do Cadastro de Fornecedores */
    #detailsModal .modal {
      border-radius: 22px !important;
      border: 1px solid #c9d8e2 !important;
      background: #ffffff !important;
      box-shadow: 0 24px 60px rgba(0, 83, 131, .18) !important;
    }

    #detailsModal .modal-header {
      padding-bottom: 12px !important;
      margin-bottom: 14px !important;
      border-bottom: 1px solid #d7e1e8 !important;
    }

    #detailsModal .modal-header h2 {
      color: var(--seel-blue-dark) !important;
      font-size: 22px !important;
      line-height: 1.15 !important;
      font-weight: 900 !important;
    }

    #modalContent .dashboard-grid {
      grid-template-columns: repeat(5, minmax(145px, 1fr)) !important;
      gap: 12px !important;
      margin-bottom: 16px !important;
    }

    #modalContent .metric {
      min-height: 112px !important;
      padding: 14px !important;
      background: #ffffff !important;
      border: 1px solid #d7e1e8 !important;
      border-top: 5px solid var(--seel-yellow) !important;
      border-left: 1px solid #d7e1e8 !important;
      border-radius: 18px !important;
      box-shadow: 0 8px 20px rgba(0, 83, 131, .08) !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      gap: 5px !important;
      overflow: hidden !important;
    }

    #modalContent .metric::after {
      display: none !important;
    }

    #modalContent .metric > span:first-child {
      display: block !important;
      min-height: 28px !important;
      margin: 0 !important;
      color: #5f7888 !important;
      font-size: 10px !important;
      line-height: 1.18 !important;
      font-weight: 800 !important;
      letter-spacing: .03em !important;
      text-transform: uppercase !important;
      overflow-wrap: anywhere !important;
    }

    #modalContent .metric > strong {
      display: block !important;
      width: 100% !important;
      margin: 0 !important;
      color: var(--seel-blue-dark) !important;
      font-size: 22px !important;
      line-height: 1.12 !important;
      font-weight: 900 !important;
      letter-spacing: -.025em !important;
      overflow-wrap: anywhere !important;
      word-break: normal !important;
    }

    #modalContent .metric > strong .badge {
      width: max-content !important;
      max-width: 100% !important;
      padding: 5px 9px !important;
      border-radius: 999px !important;
      font-size: 9px !important;
      line-height: 1 !important;
      white-space: normal !important;
    }

    #modalContent .panel {
      border-radius: 20px !important;
      border: 1px solid #d7e1e8 !important;
      background: #ffffff !important;
      box-shadow: none !important;
    }

    #modalContent .panel > h2 {
      color: var(--seel-blue-dark) !important;
      font-size: 20px !important;
      font-weight: 900 !important;
    }

    #modalContent .panel > h2::after {
      width: 64px !important;
      height: 4px !important;
      margin-top: 8px !important;
      background: var(--seel-yellow) !important;
      box-shadow: none !important;
    }

    @media (max-width: 1100px) {
      #modalContent .dashboard-grid {
        grid-template-columns: repeat(3, minmax(150px, 1fr)) !important;
      }
    }

    @media (max-width: 760px) {
      #modalContent .dashboard-grid {
        grid-template-columns: repeat(2, minmax(130px, 1fr)) !important;
      }
    }

    @media (max-width: 480px) {
      #modalContent .dashboard-grid {
        grid-template-columns: 1fr !important;
      }
    }



    /* Correção definitiva dos cards do modal de detalhes */
    #detailsModal .modal {
      width: min(1180px, calc(100vw - 32px)) !important;
      max-width: 1180px !important;
      padding: 20px !important;
      overflow-x: hidden !important;
    }

    #detailsModal .modal-header {
      gap: 16px !important;
      align-items: flex-start !important;
    }

    #detailsModal .modal-header h2 {
      min-width: 0 !important;
      max-width: calc(100% - 110px) !important;
      overflow-wrap: anywhere !important;
    }

    .details-kpi-grid {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      gap: 12px !important;
      align-items: stretch !important;
      margin: 0 0 18px !important;
      width: 100% !important;
    }

    .details-kpi {
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      justify-content: flex-start !important;
      gap: 10px !important;
      min-width: 0 !important;
      min-height: 126px !important;
      padding: 16px !important;
      overflow: hidden !important;
      background: #ffffff !important;
      border: 1px solid #cfdae3 !important;
      border-top: 5px solid var(--seel-yellow) !important;
      border-radius: 18px !important;
      box-shadow: 0 8px 18px rgba(14, 74, 110, .08) !important;
    }

    .details-kpi::after {
      content: "";
      position: absolute;
      width: 88px;
      height: 88px;
      right: -34px;
      top: -42px;
      border-radius: 50%;
      background: rgba(255, 225, 25, .10);
      pointer-events: none;
    }

    .details-kpi-label {
      position: relative !important;
      z-index: 1 !important;
      display: block !important;
      width: 100% !important;
      min-height: 24px !important;
      color: #5c7082 !important;
      font-size: 10px !important;
      line-height: 1.2 !important;
      font-weight: 900 !important;
      letter-spacing: .04em !important;
      text-transform: uppercase !important;
      overflow-wrap: anywhere !important;
    }

    .details-kpi-value {
      position: relative !important;
      z-index: 1 !important;
      display: -webkit-box !important;
      width: 100% !important;
      min-width: 0 !important;
      margin: 0 !important;
      color: var(--seel-blue-dark) !important;
      font-size: clamp(17px, 1.55vw, 23px) !important;
      line-height: 1.16 !important;
      font-weight: 950 !important;
      letter-spacing: -.025em !important;
      overflow: hidden !important;
      overflow-wrap: anywhere !important;
      word-break: normal !important;
      -webkit-line-clamp: 3 !important;
      -webkit-box-orient: vertical !important;
    }

    .details-kpi-value-compact {
      font-size: clamp(16px, 1.45vw, 21px) !important;
    }

    .details-kpi-value-money {
      font-size: clamp(17px, 1.45vw, 22px) !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      display: block !important;
    }

    .details-status-badge {
      position: relative !important;
      z-index: 1 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      max-width: 100% !important;
      min-height: 30px !important;
      padding: 7px 11px !important;
      border-radius: 999px !important;
      color: #ffffff !important;
      font-size: 10px !important;
      line-height: 1 !important;
      font-weight: 950 !important;
      letter-spacing: .02em !important;
      text-transform: uppercase !important;
      white-space: normal !important;
      text-align: center !important;
      overflow-wrap: anywhere !important;
    }

    .details-status-badge.red { background: #dc2626 !important; }
    .details-status-badge.yellow { background: #f59e0b !important; color: #1f2937 !important; }
    .details-status-badge.green { background: #16a34a !important; }
    .details-status-badge.gray { background: #64748b !important; }

    #modalContent .panel .form-grid > div {
      min-width: 0 !important;
    }

    #modalContent .panel .form-grid input,
    #modalContent .panel .form-grid textarea,
    #modalContent .panel .form-grid select {
      min-width: 0 !important;
      overflow-wrap: anywhere !important;
    }

    @media (max-width: 1040px) {
      .details-kpi-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      }
    }

    @media (max-width: 720px) {
      #detailsModal .modal {
        width: calc(100vw - 20px) !important;
        padding: 14px !important;
      }

      #detailsModal .modal-header h2 {
        max-width: calc(100% - 80px) !important;
        font-size: 18px !important;
      }

      .details-kpi-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 10px !important;
      }

      .details-kpi {
        min-height: 112px !important;
        padding: 13px !important;
      }
    }

    @media (max-width: 460px) {
      .details-kpi-grid {
        grid-template-columns: 1fr !important;
      }

      .details-kpi {
        min-height: 100px !important;
      }
    }



    /* =========================================================
       Kanban de Fretes no padrão visual do Cadastro de Fornecedores
       ========================================================= */
    #kanbanBoard {
      display: grid !important;
      grid-template-columns: repeat(7, minmax(224px, 1fr)) !important;
      gap: 10px !important;
      align-items: start !important;
      overflow-x: auto !important;
      padding: 2px 2px 18px !important;
      scroll-snap-type: x proximity;
    }

    #kanbanBoard .freight-stage-column {
      min-height: 0 !important;
      padding: 10px !important;
      border: 1px solid #c9d8e2 !important;
      border-radius: 22px !important;
      background: #eef5f9 !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.72) !important;
    }

    #kanbanBoard .freight-stage-header {
      position: static !important;
      display: grid !important;
      grid-template-columns: 36px minmax(0,1fr) 30px !important;
      gap: 8px !important;
      align-items: start !important;
      padding: 0 !important;
      margin: 0 0 8px !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
    }

    #kanbanBoard .freight-stage-header .column-icon {
      width: 36px !important;
      height: 36px !important;
      display: grid !important;
      place-items: center !important;
      border: 2px solid #f5cf00 !important;
      border-radius: 12px !important;
      background: #005b89 !important;
      color: #ffffff !important;
      font-size: 16px !important;
      line-height: 1 !important;
      box-shadow: 0 5px 12px rgba(0,83,131,.15) !important;
    }

    #kanbanBoard .freight-stage-header h3 {
      margin: 0 !important;
      max-width: none !important;
      color: #053451 !important;
      font-size: 13px !important;
      line-height: 1.05 !important;
      font-weight: 950 !important;
      letter-spacing: -.01em !important;
    }

    #kanbanBoard .freight-stage-header p {
      margin: 3px 0 0 !important;
      color: #688091 !important;
      font-size: 9px !important;
      line-height: 1.12 !important;
      font-weight: 700 !important;
    }

    #kanbanBoard .freight-stage-header .count {
      min-width: 30px !important;
      width: auto !important;
      height: 42px !important;
      padding: 0 6px !important;
      display: grid !important;
      place-items: center !important;
      border: 0 !important;
      border-radius: 12px !important;
      background: #f3f1eb !important;
      color: #053451 !important;
      font-size: 12px !important;
      font-weight: 950 !important;
      box-shadow: none !important;
    }

    #kanbanBoard .freight-stage-summary {
      display: grid !important;
      gap: 4px !important;
      margin: 0 0 8px !important;
      padding: 7px 8px !important;
      border: 1px solid #d6e2ea !important;
      border-radius: 12px !important;
      background: #ffffff !important;
    }

    #kanbanBoard .freight-stage-summary-row {
      display: grid !important;
      grid-template-columns: minmax(0,1fr) auto !important;
      gap: 6px !important;
      align-items: center !important;
      color: #688091 !important;
      font-size: 8.5px !important;
      line-height: 1.15 !important;
    }

    #kanbanBoard .freight-stage-summary-row strong {
      max-width: 108px !important;
      color: #053451 !important;
      font-size: 8.5px !important;
      line-height: 1.1 !important;
      font-weight: 950 !important;
      font-variant-numeric: tabular-nums;
      text-align: right !important;
      overflow-wrap: anywhere;
    }

    #kanbanBoard .freight-queue-lights {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: flex-end !important;
      gap: 4px !important;
    }

    #kanbanBoard .freight-queue-lights i {
      width: 9px !important;
      height: 9px !important;
      border-radius: 50% !important;
      display: inline-block !important;
      box-shadow: inset 0 -1px 2px rgba(0,0,0,.16) !important;
    }

    #kanbanBoard .queue-red { background: #e83e57 !important; }
    #kanbanBoard .queue-yellow { background: #efbd38 !important; }
    #kanbanBoard .queue-green { background: #42cf8b !important; }
    #kanbanBoard .freight-queue-lights b { color: #60798a !important; font-size: 8px !important; }

    #kanbanBoard .freight-stage-cards {
      display: grid !important;
      gap: 8px !important;
    }

    #kanbanBoard .freight-stage-cards .empty {
      min-height: 98px !important;
      margin: 0 !important;
      padding: 14px 10px !important;
      display: grid !important;
      place-items: center !important;
      border: 1px dashed #9eb8c7 !important;
      border-radius: 13px !important;
      background: rgba(255,255,255,.45) !important;
      color: #6d8797 !important;
      font-size: 9.5px !important;
      text-align: center !important;
    }

    #kanbanBoard .freight-card {
      display: block !important;
      margin: 0 !important;
      padding: 8px 8px 7px !important;
      overflow: hidden !important;
      border: 1px solid #d7e1e8 !important;
      border-left: 5px solid #075985 !important;
      border-radius: 15px !important;
      background: #ffffff !important;
      box-shadow: 0 7px 17px rgba(0,83,131,.09) !important;
      cursor: pointer !important;
      transition: transform .12s ease, box-shadow .12s ease !important;
    }

    #kanbanBoard .freight-card:hover,
    #kanbanBoard .freight-card:focus-visible {
      transform: translateY(-1px) !important;
      box-shadow: 0 11px 24px rgba(0,83,131,.15) !important;
      outline: none !important;
    }

    #kanbanBoard .freight-card.red { border-left-color: #ef4444 !important; }
    #kanbanBoard .freight-card.yellow { border-left-color: #facc15 !important; }
    #kanbanBoard .freight-card.green { border-left-color: #22c55e !important; }
    #kanbanBoard .freight-card.cancelled { border-left-color: #64748b !important; opacity: 1 !important; }

    #kanbanBoard .freight-compact-top {
      display: grid !important;
      grid-template-columns: minmax(0,1fr) auto !important;
      gap: 6px !important;
      align-items: start !important;
    }

    #kanbanBoard .freight-compact-title-wrap { min-width: 0 !important; }
    #kanbanBoard .freight-compact-id {
      margin-bottom: 2px !important;
      color: #7a95a8 !important;
      font-size: 8px !important;
      line-height: 1 !important;
      font-weight: 950 !important;
      letter-spacing: .04em !important;
    }

    #kanbanBoard .freight-compact-title {
      color: #053451 !important;
      font-size: 11.5px !important;
      line-height: 1.1 !important;
      font-weight: 950 !important;
      text-transform: uppercase !important;
      overflow-wrap: anywhere !important;
    }

    #kanbanBoard .freight-priority-bubble {
      min-width: 31px !important;
      height: 31px !important;
      padding: 0 5px !important;
      display: grid !important;
      place-items: center !important;
      border-radius: 10px !important;
      font-size: 8px !important;
      line-height: 1 !important;
      font-weight: 950 !important;
    }

    #kanbanBoard .freight-priority-bubble.urgent { background: #f9e8cf !important; color: #f97316 !important; }
    #kanbanBoard .freight-priority-bubble.normal { background: #dce9fb !important; color: #2563eb !important; }

    #kanbanBoard .freight-compact-lines {
      display: grid !important;
      gap: 2px !important;
      margin-top: 5px !important;
    }

    #kanbanBoard .freight-compact-lines > div {
      display: grid !important;
      grid-template-columns: 12px minmax(0,1fr) !important;
      gap: 4px !important;
      align-items: start !important;
      color: #5f7888 !important;
      font-size: 8.5px !important;
      line-height: 1.16 !important;
    }

    #kanbanBoard .freight-line-icon {
      color: #075985 !important;
      font-size: 8px !important;
      line-height: 1.2 !important;
      text-align: center !important;
    }

    #kanbanBoard .freight-compact-description {
      min-height: 19px !important;
      max-height: 21px !important;
      margin-top: 5px !important;
      color: #173248 !important;
      font-size: 8.5px !important;
      line-height: 1.15 !important;
      font-weight: 700 !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }

    #kanbanBoard .freight-responsible-note {
      display: grid !important;
      gap: 2px !important;
      margin-top: 5px !important;
      padding: 5px 6px !important;
      border: 1px solid #f5c400 !important;
      border-radius: 8px !important;
      background: #fff8cf !important;
      color: #6a5510 !important;
      font-size: 8px !important;
      line-height: 1.15 !important;
    }

    #kanbanBoard .freight-responsible-note b { color: #775d00 !important; font-size: 8px !important; }
    #kanbanBoard .freight-responsible-note span {
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }

    #kanbanBoard .freight-compact-badges {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 3px !important;
      margin-top: 5px !important;
    }

    #kanbanBoard .freight-mini-badge {
      max-width: 100% !important;
      padding: 3px 5px !important;
      border-radius: 999px !important;
      font-size: 7px !important;
      line-height: 1 !important;
      font-weight: 950 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    #kanbanBoard .freight-mini-badge.urgent { background: #ffe3cf !important; color: #f97316 !important; }
    #kanbanBoard .freight-mini-badge.normal { background: #dbeafe !important; color: #2563eb !important; }
    #kanbanBoard .freight-mini-badge.traffic-red { background: #fee2e2 !important; color: #dc2626 !important; }
    #kanbanBoard .freight-mini-badge.traffic-yellow { background: #fef3c7 !important; color: #b45309 !important; }
    #kanbanBoard .freight-mini-badge.traffic-green { background: #dcfce7 !important; color: #16a34a !important; }
    #kanbanBoard .freight-mini-badge.traffic-gray { background: #e2e8f0 !important; color: #475569 !important; }
    #kanbanBoard .freight-mini-badge.phase { background: #ede9fe !important; color: #6d28d9 !important; }

    #kanbanBoard .freight-compact-meta {
      display: grid !important;
      grid-template-columns: minmax(0,1fr) auto !important;
      gap: 4px !important;
      align-items: center !important;
      margin-top: 5px !important;
      color: #5f7888 !important;
      font-size: 8px !important;
      line-height: 1.12 !important;
    }

    #kanbanBoard .freight-compact-meta strong { color: #053451 !important; }
    #kanbanBoard .meta-status { font-weight: 900 !important; white-space: nowrap !important; }
    #kanbanBoard .meta-status.red { color: #dc2626 !important; }
    #kanbanBoard .meta-status.yellow { color: #b45309 !important; }
    #kanbanBoard .meta-status.green { color: #16a34a !important; }
    #kanbanBoard .meta-status.gray { color: #64748b !important; }

    #kanbanBoard .freight-compact-timer {
      display: grid !important;
      gap: 2px !important;
      margin-top: 5px !important;
      padding: 5px 6px !important;
      border: 1px solid #cfdde7 !important;
      border-radius: 9px !important;
      background: #f3f7fa !important;
    }

    #kanbanBoard .freight-compact-timer > div {
      display: grid !important;
      grid-template-columns: minmax(0,1fr) auto !important;
      gap: 5px !important;
      align-items: center !important;
      color: #5f7888 !important;
      font-size: 7.5px !important;
      line-height: 1.1 !important;
    }

    #kanbanBoard .freight-compact-timer strong {
      color: #053451 !important;
      font-size: 7.5px !important;
      line-height: 1.1 !important;
      font-weight: 950 !important;
      font-variant-numeric: tabular-nums !important;
      white-space: nowrap !important;
    }

    #kanbanBoard .freight-phase-selector-wrap {
      display: grid !important;
      gap: 3px !important;
      margin-top: 5px !important;
    }

    #kanbanBoard .freight-phase-selector-wrap label {
      margin: 0 !important;
      color: #688091 !important;
      font-size: 7px !important;
      line-height: 1 !important;
      font-weight: 900 !important;
      letter-spacing: .04em !important;
      text-transform: uppercase !important;
    }

    #kanbanBoard .freight-phase-selector-wrap .phase-select {
      width: 100% !important;
      height: 27px !important;
      min-height: 27px !important;
      margin: 0 !important;
      padding: 0 7px !important;
      border: 1px solid #bfcfd9 !important;
      border-radius: 8px !important;
      background: #ffffff !important;
      color: #053451 !important;
      font-size: 8.5px !important;
      line-height: 1 !important;
      font-weight: 800 !important;
      box-shadow: none !important;
    }

    #kanbanBoard .freight-compact-actions {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 5px !important;
      margin-top: 5px !important;
    }

    #kanbanBoard .freight-compact-actions button {
      min-width: 0 !important;
      min-height: 26px !important;
      height: 26px !important;
      padding: 0 5px !important;
      border: 1px solid #cbdbe4 !important;
      border-radius: 8px !important;
      background: #ffffff !important;
      color: #053451 !important;
      font-size: 8px !important;
      line-height: 1 !important;
      font-weight: 900 !important;
      box-shadow: none !important;
    }

    #kanbanBoard .freight-compact-actions button:last-child {
      background: #075985 !important;
      color: #ffffff !important;
      border-color: #075985 !important;
    }

    @media (max-width: 1550px) {
      #kanbanBoard { grid-template-columns: repeat(7, minmax(215px, 1fr)) !important; }
    }

    @media (max-width: 1100px) {
      #kanbanBoard { grid-template-columns: repeat(7, minmax(205px, 1fr)) !important; }
    }



    /* Rolagem estável nas colunas do Kanban */
    #kanbanBoard .freight-stage-cards {
      overflow-anchor: none !important;
      scroll-behavior: auto !important;
    }

    #kanbanBoard .freight-stage-column,
    #kanbanBoard .freight-card {
      overflow-anchor: none !important;
    }



    /* Lógica dinâmica para veículo, implemento, prancha e tração */
    #freightForm .vehicle-dynamic-hidden {
      display: none !important;
    }

    #freightForm .vehicle-dynamic-required > label::after {
      content: " *";
      color: #dc2626;
      font-weight: 900;
    }

    /* Formulário incorreto, edição completa e limite de observações */
    #kanbanBoard .freight-card.form-error {
      border-color: #f59e0b !important;
      border-left-color: #dc2626 !important;
      box-shadow: 0 8px 20px rgba(220,38,38,.13) !important;
    }

    #kanbanBoard .freight-mini-badge.form-error-badge {
      display: none !important;
      background: #fee2e2 !important;
      color: #b91c1c !important;
      border: 1px solid #fecaca !important;
    }

    #kanbanBoard .freight-card.form-error .freight-mini-badge.form-error-badge {
      display: inline-flex !important;
    }

    #kanbanBoard .freight-form-error-check {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      margin: 6px 0 0 !important;
      padding: 6px 7px !important;
      border: 1px solid #d6e1e8 !important;
      border-radius: 9px !important;
      background: #f8fafc !important;
      color: #526b7c !important;
      font-size: 8px !important;
      line-height: 1.15 !important;
      font-weight: 900 !important;
      text-transform: none !important;
      letter-spacing: 0 !important;
      cursor: pointer !important;
    }

    #kanbanBoard .freight-card.form-error .freight-form-error-check {
      background: #fff7ed !important;
      border-color: #fdba74 !important;
      color: #9a3412 !important;
    }

    #kanbanBoard .freight-form-error-check input {
      width: 14px !important;
      height: 14px !important;
      min-width: 14px !important;
      margin: 0 !important;
      padding: 0 !important;
      accent-color: #dc2626 !important;
      cursor: pointer !important;
    }

    .observations-limit-wrap {
      position: relative;
    }

    .observations-counter {
      display: flex;
      justify-content: flex-end;
      margin-top: 5px;
      color: #64748b;
      font-size: 11px;
      font-weight: 800;
    }

    .observations-counter.near-limit { color: #b45309; }
    .observations-counter.at-limit { color: #dc2626; }

    .edit-mode-banner {
      display: none;
      margin: 0 0 16px;
      padding: 12px 14px;
      border: 1px solid #bfdbfe;
      border-left: 5px solid #075985;
      border-radius: 12px;
      background: #eff6ff;
      color: #0c4a6e;
      font-size: 13px;
      font-weight: 800;
    }

    .edit-mode-banner.active { display: block; }
    .executive-kpi.form-error { border-left-color: #dc2626 !important; }

    .field-rule-note {
      display: block;
      margin-top: 6px;
      color: #64748b;
      font-size: 10.5px;
      line-height: 1.35;
      font-weight: 700;
    }

    .field-rule-note strong { color: #0f4c6d; }

    #dataSolicitacao[readonly] {
      background: #f1f5f9 !important;
      color: #334155 !important;
      cursor: not-allowed;
      font-weight: 800;
    }

    #dataColetaMaterial:invalid {
      border-color: #dc2626;
    }



    /* Envio de cotação pelo Outlook dentro do card */
    #kanbanBoard .freight-compact-actions {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
      gap: 6px !important;
    }

    #kanbanBoard .freight-compact-actions .btn-email {
      grid-column: 1 / -1 !important;
      width: 100% !important;
      min-height: 30px !important;
      padding: 6px 8px !important;
      border: 1px solid #0f766e !important;
      border-radius: 8px !important;
      background: #0f766e !important;
      color: #ffffff !important;
      font-size: 9px !important;
      line-height: 1.1 !important;
      font-weight: 900 !important;
      text-transform: none !important;
      letter-spacing: 0 !important;
      cursor: pointer !important;
      box-shadow: none !important;
    }

    #kanbanBoard .freight-compact-actions .btn-email:hover {
      background: #115e59 !important;
      border-color: #115e59 !important;
    }

    #kanbanBoard .freight-compact-actions [data-action="edit"] {
      background: #075985 !important;
      color: #ffffff !important;
      border-color: #075985 !important;
    }



    #kanbanBoard .freight-compact-actions a.btn-email {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-decoration: none !important;
    }



    /* Links do Google Maps no formulario e na aba de mapa */
    .map-location-links {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 12px;
    }

    .map-location-links[hidden] {
      display: none !important;
    }

    .map-location-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      padding: 9px 12px;
      border: 1px solid #dbe5f0;
      border-radius: 10px;
      background: #ffffff;
      color: #1d4ed8;
      font-size: 12px;
      font-weight: 800;
      line-height: 1.2;
      text-align: center;
      text-decoration: none;
    }

    .map-location-links a:hover {
      border-color: #93c5fd;
      background: #eff6ff;
    }

    .maps-link-valid {
      border-color: #86efac !important;
      background: #f0fdf4 !important;
    }

    .maps-link-invalid {
      border-color: #fca5a5 !important;
      background: #fef2f2 !important;
    }

    @media (max-width: 680px) {
      .map-location-links {
        grid-template-columns: 1fr;
      }
    }



    /* Escolha obrigatória entre endereço digitado e link do Google Maps */
    #freightForm [data-form-key].location-mode-hidden {
      display: none !important;
    }

    #freightForm [data-form-key].location-mode-active {
      animation: locationFieldReveal .18s ease-out;
    }

    #freightForm [data-form-key].location-mode-required label::after {
      content: " *";
      color: #b91c1c;
      font-weight: 950;
    }

    #freightForm [data-form-key="field:modoLocalColeta"],
    #freightForm [data-form-key="field:modoLocalEntrega"] {
      padding: 12px;
      border: 1px solid rgba(21, 90, 130, .16);
      border-left: 4px solid var(--seel-yellow, #ffe119);
      border-radius: 13px;
      background: #f8fbfc;
    }

    #freightForm [data-form-key="field:modoLocalColeta"] select,
    #freightForm [data-form-key="field:modoLocalEntrega"] select {
      background-color: #fff;
      font-weight: 800;
    }

    @keyframes locationFieldReveal {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }



    /* Solicitante preenchido pelo login do aplicativo principal */
    #freightForm .logged-user-field input.login-fixed-field,
    #freightForm .logged-user-field input[readonly] {
      background: #f1f5f9 !important;
      color: #0f3550 !important;
      border-color: #cbd5e1 !important;
      font-weight: 800 !important;
      cursor: not-allowed !important;
    }

    .logged-user-hint {
      margin-top: -4px;
      padding: 9px 11px;
      border: 1px solid #fbbf24;
      border-left: 4px solid #f59e0b;
      border-radius: 9px;
      background: #fffbeb;
      color: #92400e;
      font-size: 10.5px;
      line-height: 1.35;
      font-weight: 800;
    }

    .logged-user-hint.login-found {
      border-color: #a7f3d0;
      border-left-color: #059669;
      background: #ecfdf5;
      color: #065f46;
    }

    /* Botão de correção exibido somente quando o formulário estiver marcado como errado */
    #kanbanBoard .freight-compact-actions .btn-email-correction {
      display: none !important;
      grid-column: 1 / -1 !important;
      background: #b91c1c !important;
      border-color: #b91c1c !important;
      color: #ffffff !important;
    }

    #kanbanBoard .freight-card.form-error .freight-compact-actions .btn-email-correction {
      display: inline-flex !important;
    }

    #kanbanBoard .freight-card.form-error .freight-compact-actions .btn-email-correction:hover {
      background: #991b1b !important;
      border-color: #991b1b !important;
    }



    /* Relatório final de fretes entregues */
    #report .freight-report-shell {
      display: grid;
      gap: 16px;
    }

    #report .freight-report-filters {
      display: grid;
      grid-template-columns: minmax(250px, 1.5fr) repeat(4, minmax(165px, .8fr)) minmax(300px, 1.35fr) auto;
      gap: 12px;
      align-items: end;
      padding: 15px;
      border: 1px solid rgba(21,90,130,.18);
      border-radius: 18px;
      background: rgba(255,255,255,.90);
      box-shadow: 0 10px 24px rgba(7,50,77,.08);
    }

    #report .freight-report-filters > * {
      min-width: 0;
      margin: 0;
    }

    #report .freight-report-filters label {
      display: grid;
      gap: 6px;
      margin: 0;
    }

    #report .freight-report-filters label > span {
      color: #526f82;
      font-size: 9px;
      line-height: 1.1;
      font-weight: 950;
      letter-spacing: .05em;
      text-transform: uppercase;
    }

    #report .freight-report-filters input,
    #report .freight-report-filters select {
      width: 100%;
      min-width: 0;
      height: 40px;
      padding: 0 11px;
      border-radius: 11px;
      font-size: 11px;
      font-weight: 750;
    }

    #report .freight-report-date-range {
      display: grid;
      grid-template-columns: minmax(0,1fr) minmax(0,1fr);
      gap: 8px;
      min-width: 0;
    }

    #report .freight-report-clear {
      height: 40px;
      min-width: 112px;
      white-space: nowrap;
    }

    #report .freight-report-table-card {
      overflow: hidden;
      border: 1px solid rgba(21,90,130,.18);
      border-radius: 20px;
      background: #fff;
      box-shadow: 0 14px 30px rgba(7,50,77,.09);
    }

    #report .freight-report-table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 17px 18px;
      border-bottom: 1px solid #dbe5eb;
      background: linear-gradient(135deg, rgba(231,242,248,.82), rgba(255,255,255,.96));
    }

    #report .freight-report-table-head h2 {
      margin: 0 0 5px;
      color: #0e4a6e;
      font-size: 19px;
    }

    #report .freight-report-table-head h2::after { display: none; }

    #report .freight-report-table-head p {
      margin: 0;
      color: #607b8d;
      font-size: 11.5px;
      font-weight: 700;
    }

    #report .freight-report-table-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 9px;
    }

    #report .freight-report-status {
      display: inline-flex;
      align-items: center;
      min-height: 32px;
      padding: 0 10px;
      border-radius: 999px;
      background: #dcfce7;
      color: #166534;
      font-size: 9px;
      font-weight: 950;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    #report .freight-report-export {
      min-height: 36px;
      background: linear-gradient(135deg, var(--seel-yellow), #fff06a);
      color: var(--seel-blue-dark);
      border: 1px solid rgba(14,74,110,.18);
    }

    #report .freight-report-table-wrap {
      max-height: 68vh;
      overflow: auto;
    }

    #report .freight-report-table {
      width: 100%;
      min-width: 2400px;
      border-collapse: separate;
      border-spacing: 0;
      background: #fff;
    }

    #report .freight-report-table thead th {
      position: sticky;
      top: 0;
      z-index: 2;
      padding: 11px 10px;
      background: linear-gradient(135deg, #0e4a6e, #155a82);
      color: #fff;
      border-bottom: 3px solid var(--seel-yellow);
      font-size: 9px;
      line-height: 1.2;
      font-weight: 950;
      letter-spacing: .04em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    #report .freight-report-table tbody td {
      padding: 10px;
      border-bottom: 1px solid #e6edf2;
      color: #334155;
      font-size: 10.5px;
      line-height: 1.35;
      vertical-align: top;
    }

    #report .freight-report-table tbody tr:nth-child(even) td { background: #f8fafc; }
    #report .freight-report-table tbody tr:hover td { background: #fffce8; }

    #report .freight-report-main {
      display: block;
      color: #0f3047;
      font-weight: 900;
    }

    #report .freight-report-sub {
      display: block;
      margin-top: 3px;
      color: #738b9a;
      font-size: 9px;
      font-weight: 700;
    }

    #report .freight-report-code {
      display: inline-flex;
      padding: 5px 7px;
      border-radius: 8px;
      background: #e7f2f8;
      color: #0e4a6e;
      font-weight: 950;
      white-space: nowrap;
    }

    #report .freight-report-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 8px;
      line-height: 1;
      font-weight: 950;
      white-space: nowrap;
    }

    #report .freight-report-badge.urgent { background: #ffe4d2; color: #c2410c; }
    #report .freight-report-badge.normal { background: #dbeafe; color: #1d4ed8; }
    #report .freight-report-badge.ok { background: #dcfce7; color: #166534; }
    #report .freight-report-badge.error { background: #fee2e2; color: #991b1b; }

    #report .freight-report-money,
    #report .freight-report-sla {
      color: #0e4a6e;
      font-weight: 950;
      white-space: nowrap;
    }

    #report .freight-report-observation {
      display: block;
      min-width: 220px;
      max-width: 360px;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    #report .freight-report-empty {
      padding: 30px 18px;
      color: #688091;
      font-size: 12px;
      font-weight: 750;
      text-align: center;
    }

    @media (max-width: 1550px) {
      #report .freight-report-filters {
        grid-template-columns: repeat(4, minmax(170px, 1fr));
      }
      #report .freight-report-search,
      #report .freight-report-date-filter { grid-column: span 2; }
      #report .freight-report-clear { width: 100%; }
    }

    @media (max-width: 900px) {
      #report .freight-report-filters { grid-template-columns: repeat(2, minmax(0,1fr)); }
      #report .freight-report-search,
      #report .freight-report-date-filter { grid-column: 1 / -1; }
      #report .freight-report-table-head { align-items: flex-start; flex-direction: column; }
      #report .freight-report-table-actions { width: 100%; justify-content: flex-start; }
    }

    @media (max-width: 580px) {
      #report .freight-report-filters { grid-template-columns: 1fr; }
      #report .freight-report-search,
      #report .freight-report-date-filter { grid-column: auto; }
      #report .freight-report-date-range { grid-template-columns: 1fr; }
      #report .freight-report-clear { width: 100%; }
    }


    .google-cloud-key-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      text-decoration: none;
      white-space: nowrap;
    }

</style>

<style id="freight-oc-card-style">
  .freight-oc-field {
    display: grid;
    gap: 5px;
    margin-top: 8px;
    padding: 8px;
    border: 1px solid rgba(21, 90, 130, 0.20);
    border-radius: 11px;
    background: linear-gradient(135deg, rgba(255,225,25,.12), rgba(255,255,255,.96));
  }
  .freight-oc-field label {
    margin: 0;
    color: #49687b;
    font-size: 8px;
    line-height: 1;
    font-weight: 950;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
  .freight-oc-input-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 7px;
    align-items: center;
  }
  .freight-oc-input {
    width: 100%;
    min-width: 0;
    height: 30px;
    padding: 0 9px;
    border: 1px solid #b9cad5;
    border-radius: 9px;
    background: #fff;
    color: #07324d;
    font-size: 10px;
    font-weight: 850;
    box-shadow: none;
  }
  .freight-oc-input:focus {
    border-color: #155a82;
    box-shadow: 0 0 0 3px rgba(255,225,25,.22);
  }
  .freight-oc-save-status {
    min-width: 42px;
    color: #64748b;
    font-size: 8px;
    line-height: 1;
    font-weight: 900;
    text-align: right;
    white-space: nowrap;
  }
  .freight-oc-save-status.saved { color: #15803d; }
  .freight-oc-save-status.pending { color: #a16207; }
  .freight-report-table th:nth-child(3),
  .freight-report-table td:nth-child(3) {
    min-width: 125px;
  }
  .freight-report-table th:nth-child(4),
  .freight-report-table td:nth-child(4) {
    min-width: 150px;
  }
  #report .freight-cte-input-wrap {
    display: grid;
    grid-template-columns: minmax(105px, 1fr) auto;
    gap: 6px;
    align-items: center;
    min-width: 145px;
  }
  #report .freight-cte-input {
    width: 100%;
    min-width: 0;
    height: 31px;
    padding: 0 8px;
    border: 1px solid #b8cad5;
    border-radius: 8px;
    background: #ffffff;
    color: #07324d;
    font-size: 10px;
    font-weight: 850;
    box-shadow: none;
  }
  #report .freight-cte-input:focus {
    border-color: #155a82;
    box-shadow: 0 0 0 3px rgba(255,225,25,.24);
    outline: none;
  }
  #report .freight-cte-save-status {
    min-width: 36px;
    color: #64748b;
    font-size: 8px;
    line-height: 1;
    font-weight: 900;
    white-space: nowrap;
  }
  #report .freight-cte-save-status.saved { color: #15803d; }
  #report .freight-cte-save-status.pending { color: #a16207; }
</style>



<style id="google-places-config-styles">
  #freightForm .google-places-config{
    display:grid;
    grid-template-columns:minmax(240px,.8fr) minmax(420px,1.2fr);
    gap:10px 14px;
    align-items:center;
    padding:13px 14px;
    border:1px solid rgba(21,90,130,.22);
    border-left:5px solid var(--seel-yellow);
    border-radius:15px;
    background:linear-gradient(135deg,rgba(223,240,248,.62),rgba(255,255,255,.96));
  }
  #freightForm .google-places-config-copy{display:grid;gap:3px;min-width:0}
  #freightForm .google-places-config-copy strong{color:var(--seel-blue-dark);font-size:13px;font-weight:950}
  #freightForm .google-places-config-copy span{color:#5b7486;font-size:11px;line-height:1.35;font-weight:700}
  #freightForm .google-places-config-actions{
    display:grid;
    grid-template-columns:minmax(220px,1fr) auto auto;
    gap:8px;
    align-items:center;
    min-width:0;
  }
  #freightForm .google-places-config-actions input{height:39px;min-width:0}
  #freightForm .google-places-config-actions button{height:39px;padding:0 12px;white-space:nowrap;font-size:11px}
  #freightForm .google-places-config-status{
    grid-column:1/-1;
    padding:8px 10px;
    border-radius:10px;
    background:#f8fafc;
    border:1px solid rgba(100,116,139,.18);
    color:#475569;
    font-size:11px;
    font-weight:850;
  }
  #freightForm .google-places-config-status.active{background:#ecfdf5;border-color:#86efac;color:#166534}
  #freightForm .google-places-config-status.loading{background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}
  #freightForm .google-places-config-status.error{background:#fef2f2;border-color:#fca5a5;color:#991b1b}
  #freightForm .google-places-config small{grid-column:1/-1;color:#708797;font-size:10px;line-height:1.35}
  #freightForm .address-suggestion-copy span.google-source{color:#1d4ed8;font-weight:900}
  @media(max-width:980px){
    #freightForm .google-places-config{grid-template-columns:1fr}
    #freightForm .google-places-config-actions{grid-template-columns:1fr 1fr}
    #freightForm .google-places-config-actions input{grid-column:1/-1}
  }
  @media(max-width:560px){
    #freightForm .google-places-config-actions{grid-template-columns:1fr}
    #freightForm .google-places-config-actions input{grid-column:auto}
  }
</style>
<style id="freight-address-autocomplete-styles">
  #freightForm .address-autocomplete-host {
    position: relative !important;
    z-index: 4;
  }

  #freightForm .address-autocomplete-host:focus-within {
    z-index: 1200;
  }

  #freightForm .address-autocomplete-input {
    padding-right: 42px !important;
    background-image:
      linear-gradient(45deg, transparent 50%, #64748b 50%),
      linear-gradient(135deg, #64748b 50%, transparent 50%);
    background-position:
      calc(100% - 19px) calc(50% - 2px),
      calc(100% - 14px) calc(50% - 2px);
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
  }

  #freightForm .address-autocomplete-input.address-selected {
    border-color: #22c55e !important;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, .12) !important;
  }

  #freightForm .address-autocomplete-helper {
    min-height: 15px;
    margin-top: 5px;
    color: #64748b;
    font-size: 10px;
    line-height: 1.35;
    font-weight: 700;
    text-transform: none;
    letter-spacing: 0;
  }

  #freightForm .address-autocomplete-helper.searching {
    color: #155a82;
  }

  #freightForm .address-autocomplete-helper.success {
    color: #15803d;
  }

  #freightForm .address-autocomplete-helper.error {
    color: #b91c1c;
  }

  #freightForm .address-autocomplete-suggestions {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% - 13px);
    z-index: 1300;
    max-height: 290px;
    overflow-y: auto;
    padding: 6px;
    border: 1px solid #cbd5e1;
    border-radius: 13px;
    background: rgba(255, 255, 255, .99);
    box-shadow: 0 20px 42px rgba(15, 23, 42, .20);
  }

  #freightForm .address-autocomplete-suggestions[hidden] {
    display: none !important;
  }

  #freightForm .address-suggestion-button {
    width: 100%;
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 9px;
    align-items: start;
    padding: 9px 10px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: #0f3550;
    text-align: left;
    box-shadow: none;
  }

  #freightForm .address-suggestion-button:hover,
  #freightForm .address-suggestion-button.active {
    transform: none;
    background: #eef6fb;
    box-shadow: none;
  }

  #freightForm .address-suggestion-icon {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 1px solid #d7e2e9;
    border-radius: 10px;
    background: #f8fafc;
    color: #155a82;
    font-size: 12px;
    font-weight: 950;
  }

  #freightForm .address-suggestion-copy {
    min-width: 0;
  }

  #freightForm .address-suggestion-copy strong {
    display: block;
    color: #0f3550;
    font-size: 12px;
    line-height: 1.3;
    font-weight: 850;
    text-transform: none;
    letter-spacing: 0;
  }

  #freightForm .address-suggestion-copy span {
    display: block;
    margin-top: 2px;
    color: #64748b;
    font-size: 9px;
    line-height: 1.25;
    font-weight: 750;
    text-transform: uppercase;
    letter-spacing: .04em;
  }

  .pac-container {
    z-index: 99999 !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 13px !important;
    box-shadow: 0 20px 42px rgba(15, 23, 42, .20) !important;
    font-family: Inter, "Segoe UI", Arial, sans-serif !important;
    overflow: hidden !important;
  }

  .pac-item {
    padding: 8px 10px !important;
    cursor: pointer !important;
    font-size: 12px !important;
  }

  .pac-item:hover,
  .pac-item-selected {
    background: #eef6fb !important;
  }

  @media (max-width: 760px) {
    #freightForm .address-autocomplete-suggestions {
      position: fixed;
      left: 12px;
      right: 12px;
      top: auto;
      bottom: 14px;
      max-height: 46vh;
      border-radius: 16px;
    }
  }
</style>


<style id="freight-responsible-note-editor-style">
  #kanbanBoard .freight-responsible-note-editor{
    display:grid;
    gap:5px;
    margin-top:8px;
    padding:8px;
    border:1px solid rgba(21,90,130,.22);
    border-left:4px solid var(--seel-yellow);
    border-radius:11px;
    background:linear-gradient(135deg,rgba(255,225,25,.13),rgba(255,255,255,.98));
  }
  #kanbanBoard .freight-responsible-note-editor label{
    margin:0;
    color:#375d73;
    font-size:8px;
    line-height:1.1;
    font-weight:950;
    letter-spacing:.05em;
    text-transform:uppercase;
  }
  #kanbanBoard .freight-responsible-note-input{
    width:100%;
    min-width:0;
    min-height:58px;
    max-height:120px;
    padding:8px 9px;
    resize:vertical;
    border:1px solid #b9cad5;
    border-radius:9px;
    background:#fff;
    color:#07324d;
    font-size:10px;
    line-height:1.35;
    font-weight:750;
    box-shadow:none;
  }
  #kanbanBoard .freight-responsible-note-input:focus{
    border-color:#155a82;
    box-shadow:0 0 0 3px rgba(255,225,25,.22);
    outline:none;
  }
  #kanbanBoard .freight-responsible-note-footer{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:8px;
  }
  #kanbanBoard .freight-responsible-note-status,
  #kanbanBoard .freight-responsible-note-counter{
    color:#64748b;
    font-size:8px;
    line-height:1;
    font-weight:900;
    white-space:nowrap;
  }
  #kanbanBoard .freight-responsible-note-status.saved{color:#15803d}
  #kanbanBoard .freight-responsible-note-status.pending{color:#a16207}
  #kanbanBoard .freight-responsible-note-counter.near-limit{color:#a16207}
  #kanbanBoard .freight-responsible-note-counter.at-limit{color:#b91c1c}
  .logged-user-field .login-fixed-field{
    background:#eef6fa !important;
    border-color:rgba(21,90,130,.28) !important;
    color:#0e4a6e !important;
    font-weight:850 !important;
    cursor:not-allowed !important;
  }
</style>


  <style>
    /* Ajuste final: ícones executivos nos cards e OBS somente no modal de detalhes */
    #kanbanBoard .freight-ui-icon {
      width: 12px !important;
      height: 12px !important;
      min-width: 12px !important;
      display: inline-block !important;
      vertical-align: middle !important;
      stroke: currentColor !important;
      fill: none !important;
      stroke-width: 2 !important;
      stroke-linecap: round !important;
      stroke-linejoin: round !important;
    }

    #kanbanBoard .freight-line-icon {
      width: 18px !important;
      height: 18px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 6px !important;
      background: #e9f3f8 !important;
      color: #075985 !important;
    }

    #kanbanBoard .freight-line-icon .freight-ui-icon {
      width: 10px !important;
      height: 10px !important;
      min-width: 10px !important;
    }

    #kanbanBoard .freight-compact-lines > div {
      grid-template-columns: 18px minmax(0,1fr) !important;
      gap: 6px !important;
      align-items: center !important;
      min-height: 20px !important;
    }

    #kanbanBoard .freight-compact-title {
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
    }

    #kanbanBoard .freight-compact-title .freight-ui-icon {
      width: 13px !important;
      height: 13px !important;
      min-width: 13px !important;
      color: #075985 !important;
    }

    #kanbanBoard .freight-priority-bubble {
      display: inline-flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 1px !important;
    }

    #kanbanBoard .freight-priority-bubble .freight-ui-icon {
      width: 10px !important;
      height: 10px !important;
      min-width: 10px !important;
    }

    #kanbanBoard .freight-compact-description {
      display: grid !important;
      grid-template-columns: 18px minmax(0, 1fr) !important;
      gap: 6px !important;
      align-items: start !important;
      max-height: none !important;
      min-height: 26px !important;
      padding: 5px 6px !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 8px !important;
      background: #f8fafc !important;
    }

    #kanbanBoard .freight-description-icon {
      width: 18px !important;
      height: 18px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 6px !important;
      background: #ffffff !important;
      color: #075985 !important;
      border: 1px solid #d7e1e8 !important;
    }

    #kanbanBoard .freight-description-icon .freight-ui-icon {
      width: 10px !important;
      height: 10px !important;
      min-width: 10px !important;
    }

    #kanbanBoard .freight-description-text {
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      overflow: hidden !important;
    }

    #kanbanBoard .freight-mini-badge,
    #kanbanBoard .freight-compact-meta > span,
    #kanbanBoard .freight-timer-label,
    #kanbanBoard .freight-phase-selector-wrap label,
    #kanbanBoard .freight-form-error-check span,
    #kanbanBoard .freight-compact-actions a,
    #kanbanBoard .freight-compact-actions button {
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
    }

    #kanbanBoard .freight-mini-badge .freight-ui-icon,
    #kanbanBoard .freight-compact-meta .freight-ui-icon,
    #kanbanBoard .freight-timer-label .freight-ui-icon,
    #kanbanBoard .freight-phase-selector-wrap label .freight-ui-icon,
    #kanbanBoard .freight-form-error-check .freight-ui-icon,
    #kanbanBoard .freight-compact-actions .freight-ui-icon {
      width: 9px !important;
      height: 9px !important;
      min-width: 9px !important;
    }

    #kanbanBoard .freight-compact-meta > span:first-child {
      min-width: 0 !important;
    }

    #kanbanBoard .freight-compact-timer > div {
      grid-template-columns: minmax(0, 1fr) auto !important;
    }

    #kanbanBoard .freight-timer-label {
      min-width: 0 !important;
    }

    #kanbanBoard .freight-responsible-note-editor,
    #kanbanBoard [data-responsible-note-field] {
      display: none !important;
    }

    #detailsModal .responsible-note-detail-panel {
      margin: 0 0 18px !important;
      padding: 17px !important;
      border: 1px solid #d5e2ea !important;
      border-left: 6px solid #f2c400 !important;
      border-radius: 18px !important;
      background: linear-gradient(135deg, #fffdf1, #ffffff) !important;
      box-shadow: 0 8px 20px rgba(14,74,110,.07) !important;
    }

    #detailsModal .responsible-note-detail-heading {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      margin-bottom: 10px !important;
    }

    #detailsModal .responsible-note-detail-title {
      display: inline-flex !important;
      align-items: center !important;
      gap: 9px !important;
      color: #0e4a6e !important;
      font-size: 15px !important;
      font-weight: 950 !important;
    }

    #detailsModal .responsible-note-detail-title .freight-ui-icon {
      width: 19px !important;
      height: 19px !important;
      min-width: 19px !important;
      color: #0e4a6e !important;
    }

    #detailsModal .responsible-note-detail-status {
      padding: 5px 9px !important;
      border-radius: 999px !important;
      background: #e2e8f0 !important;
      color: #475569 !important;
      font-size: 10px !important;
      font-weight: 900 !important;
      white-space: nowrap !important;
    }

    #detailsModal .responsible-note-detail-status.saved {
      background: #dcfce7 !important;
      color: #166534 !important;
    }

    #detailsModal .responsible-note-detail-status.pending {
      background: #fef3c7 !important;
      color: #92400e !important;
    }

    #detailsModal .responsible-note-detail-help {
      margin: 0 0 9px !important;
      color: #64748b !important;
      font-size: 12px !important;
      line-height: 1.45 !important;
      font-weight: 700 !important;
    }

    #detailsModal .responsible-note-detail-input {
      width: 100% !important;
      min-height: 112px !important;
      max-height: 240px !important;
      padding: 12px 13px !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 13px !important;
      background: #ffffff !important;
      color: #0f3550 !important;
      font-size: 13px !important;
      line-height: 1.5 !important;
      font-weight: 650 !important;
      resize: vertical !important;
    }

    #detailsModal .responsible-note-detail-input:focus {
      border-color: #0e4a6e !important;
      box-shadow: 0 0 0 4px rgba(255,225,25,.22) !important;
    }

    #detailsModal .responsible-note-detail-footer {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      margin-top: 9px !important;
    }

    #detailsModal .responsible-note-detail-counter {
      color: #64748b !important;
      font-size: 11px !important;
      font-weight: 850 !important;
    }

    #detailsModal .responsible-note-detail-counter.near-limit { color: #b45309 !important; }
    #detailsModal .responsible-note-detail-counter.at-limit { color: #dc2626 !important; }

    #detailsModal .responsible-note-save-button {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 7px !important;
      min-height: 36px !important;
      padding: 8px 13px !important;
      border-radius: 10px !important;
      background: #0e4a6e !important;
      color: #ffffff !important;
      border: 1px solid #0e4a6e !important;
      font-size: 11px !important;
      font-weight: 900 !important;
    }

    #detailsModal .responsible-note-save-button .freight-ui-icon {
      width: 13px !important;
      height: 13px !important;
      min-width: 13px !important;
    }

    @media (max-width: 620px) {
      #detailsModal .responsible-note-detail-heading,
      #detailsModal .responsible-note-detail-footer {
        align-items: stretch !important;
        flex-direction: column !important;
      }

      #detailsModal .responsible-note-save-button {
        width: 100% !important;
      }
    }
  </style>

</head>
<body>
  <div class="sf-app" id="sfFreightApp">
    <div class="sf-workspace">
<main>
      <nav class="tabs sf-module-tabs" aria-label="Navegação do módulo">
        <button class="tab active" onclick="showTab('form', this)"><span class="tab-icon">📝</span>Nova solicitação</button>
        <button class="tab" onclick="showTab('kanban', this)"><span class="tab-icon">🗂️</span>Kanban</button>
        <button class="tab" onclick="showTab('mapa', this)"><span class="tab-icon">🗺️</span>Mapa</button>
        <button class="tab" onclick="showTab('cotacao', this)"><span class="tab-icon">💰</span>Mapa de Cotações</button>
        <button class="tab" onclick="showTab('dashboard', this)"><span class="tab-icon">📊</span>Dashboard</button>
        <button class="tab" onclick="showTab('report', this)"><span class="tab-icon">📋</span>Relatório</button>
        <button class="tab" onclick="showTab('history', this)"><span class="tab-icon">📄</span>Histórico</button>
        <button class="tab" onclick="showTab('editor', this)"><span class="tab-icon">⚙️</span>Editor do formulário</button>
      </nav>


    <section id="form" class="section active">
      <div class="panel">
        <h2 id="freightFormTitle">Nova Solicitação de Frete</h2><p id="freightFormSubtitle" class="muted">Preencha os dados da RM, endereços, carga, documentação e fornecedor. Ao criar, o card entra no Kanban.</p>
        <div id="freightEditBanner" class="edit-mode-banner">Modo de edição ativo. Revise as informações e registre os erros encontrados no campo Observações.</div>
        <form id="freightForm">
          <div class="form-grid">
            <div class="form-section-title">Informações iniciais</div>
            <div><label>Número da RM *</label><input id="numeroRM" required placeholder="Ex.: 17901" /></div>
            <div><label>Número da Obra / Departamento *</label><input id="numeroObra" required placeholder="Ex.: 949" /></div>
            <div class="logged-user-field"><label>Solicitante *</label><input id="solicitante" required readonly aria-readonly="true" class="login-fixed-field" placeholder="Carregando usuário conectado..." autocomplete="off" /></div>
            <div class="logged-user-field"><label>E-mail *</label><input id="emailSolicitante" type="email" required readonly aria-readonly="true" class="login-fixed-field" placeholder="Carregando e-mail do usuário..." autocomplete="off" /></div>
            <div><label>Telefone do Solicitante</label><input id="telefoneSolicitante" placeholder="Ex.: 21980931551" /></div>
            <div id="loggedUserHint" class="full logged-user-hint">Identificando automaticamente o nome e o e-mail do usuário conectado no aplicativo principal.</div>
            <div><label>Urgência *</label><select id="urgencia" required><option value="NORMAL">NORMAL</option><option value="URGENTE">URGENTE</option></select></div>
            <div><label>Data da solicitação *</label><input id="dataSolicitacao" type="date" required readonly /></div>
            <div><label>Data da Coleta do Material *</label><input id="dataColetaMaterial" type="date" required /></div>
            <div><label>Horário da coleta *</label><input id="horarioColeta" type="time" required /></div>
            <div><label>Tipo de movimentação *</label><select id="tipoMovimentacao" required><option value="">Selecione</option><option>Movimentação entre obras</option><option>Coleta em fornecedor</option><option>Entrega em obra</option><option>Devolução</option><option>Transferência interna</option><option>Outro</option></select></div>
            <div><label>Particularidade da Obra</label><input id="particularidadeObra" placeholder="Ex.: RODOVIA" /></div>
            <div class="form-section-title">Endereços</div>
            <div class="full google-places-config" id="googlePlacesConfig">
              <div class="google-places-config-copy">
                <strong>Pesquisa de endereços e locais pelo Google Maps</strong>
                <span>Ative uma vez para pesquisar fornecedores, empresas, obras, estabelecimentos e endereços reais enquanto digita.</span>
              </div>
              <div class="google-places-config-actions">
                <input id="googlePlacesApiKeyInput" type="password" placeholder="Cole a chave alfanumérica (normalmente começa com AIza...)" autocomplete="off" spellcheck="false" />
                <button id="activateGooglePlacesButton" class="btn-primary" type="button">Ativar Google Maps</button>
                <button id="clearGooglePlacesKeyButton" class="btn-secondary" type="button">Remover chave</button>
                <a id="openGoogleCloudKeyButton" class="btn-secondary google-cloud-key-link" href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noopener noreferrer">Criar chave no Google Cloud</a>
              </div>
              <div id="googlePlacesConfigStatus" class="google-places-config-status">Aguardando configuração do Google Maps.</div>
              <small>Use uma chave alfanumérica da Google Maps Platform — não cole links do Google Maps. A chave fica salva somente neste navegador. Habilite Maps JavaScript API e Places API (New), associe faturamento e restrinja a chave ao domínio onde o aplicativo será publicado.</small>
            </div>
            <div class="full"><label>Como deseja informar o local de coleta? *</label><select id="modoLocalColeta" required><option value="">Selecione</option><option value="ENDERECO">Endereço</option><option value="LINK_MAPS">Link do Maps</option></select></div>
            <div><label>Endereço de coleta</label><input id="enderecoColeta" placeholder="Rua, número, bairro, cidade/UF" /></div>
            <div><label>CEP da coleta</label><input id="cepColeta" placeholder="Ex.: 25010-000" /></div>
            <div class="full"><label>Link do Google Maps — coleta</label><input id="linkGoogleMapsColeta" type="url" placeholder="Cole o link completo do local de coleta no Google Maps" /></div>
            <div class="full"><label>Como deseja informar o local de entrega? *</label><select id="modoLocalEntrega" required><option value="">Selecione</option><option value="ENDERECO">Endereço</option><option value="LINK_MAPS">Link do Maps</option></select></div>
            <div><label>Endereço de entrega</label><input id="enderecoEntrega" placeholder="Rua, número, bairro, cidade/UF" /></div>
            <div><label>CEP da entrega</label><input id="cepEntrega" placeholder="Ex.: 95706-006" /></div>
            <div class="full"><label>Link do Google Maps — entrega</label><input id="linkGoogleMapsEntrega" type="url" placeholder="Cole o link completo do local de entrega no Google Maps" /></div>
            <div class="form-section-title">Informações do Frete</div>
            <div><label>Tipo de veículo *</label><select id="tipoVeiculo" required><option value="">Selecione</option><option>Utilitário</option><option>VUC</option><option>Caminhão 3/4</option><option>Toco</option><option>Truck</option><option>Bitruck</option><option>Munck</option><option>Prancha</option><option>Carreta</option></select></div>
            <div><label>Implemento</label><select id="implemento"><option value="">Selecione o tipo de veículo</option></select></div>
            <div><label>Capacidade da prancha (peso)</label><input id="capacidadePrancha" placeholder="Ex.: 30 toneladas" /></div>
            <div><label>Comprimento / tamanho da prancha</label><input id="tamanhoPrancha" placeholder="Ex.: 12 metros" /></div>
            <div><label>Tração do veículo</label><select id="tracaoVeiculo"><option value="">Selecione</option><option>Não se aplica</option><option>Convencional (4x2 / 6x2)</option><option>Traçado (6x4)</option></select></div>
            <div class="full"><label>Observações sobre o veículo / operação</label><textarea id="observacoesVeiculoOperacao" placeholder="Ex.: acesso fora de estrada, restrição de altura, enlonamento, suspensão a ar ou equipamento específico."></textarea></div>
            <div><label>Frete compartilhado?</label><select id="freteCompartilhado"><option>NÃO</option><option>SIM</option></select></div>
            <div><label>Necessita operador para descarga?</label><select id="operadorDescarga"><option>Não necessita</option><option>Necessita</option></select></div>
            <div><label>Responsável Supply Chain</label><input id="responsavelSupply" placeholder="Nome do analista" /></div>
            <div class="form-section-title">Recebimento e Documentação</div>
            <div><label>Responsável no recebimento</label><input id="responsavelRecebimento" placeholder="Nome e telefone" /></div>
            <div><label>Ordem/Pedido de coleta</label><input id="ordemColeta" placeholder="Ex.: 86693" /></div>
            <div><label>Pedido de compra</label><input id="pedidoCompra" placeholder="Ex.: 86693" /></div>
            <div><label>Requer nota fiscal?</label><input id="notaFiscal" placeholder="Ex.: NÃO PRECISA. O FORNECEDOR IRÁ EMITIR A NF." /></div>
            <div class="form-section-title">Carga e Fornecedor</div>
            <div><label>Peso total da carga kg</label><input id="pesoTotalCarga" type="number" min="0" step="0.01" placeholder="Ex.: 145.40" /></div>
            <div><label>Valor total da carga R$</label><input id="valorTotalCarga" type="number" min="0" step="0.01" placeholder="Ex.: 23140.00" /></div>
            <div><label>Total de peças / volumes</label><input id="totalPecas" placeholder="Ex.: 92 unidades" /></div>
            <div><label>Data limite de entrega *</label><input id="dataLimiteEntrega" type="datetime-local" required /></div>
            <div><label>Fornecedor / Locador</label><input id="fornecedorNome" placeholder="Ex.: SEEL ENGENHARIA" /></div>
            <div><label>CNPJ fornecedor</label><input id="fornecedorCnpj" placeholder="Ex.: 72.030.927/0001-85" /></div>
            <div><label>Transportadora aprovada</label><input id="transportadora" placeholder="Preencher após cotação" /></div>
            <div><label>E-mail da transportadora para cotação</label><input id="emailTransportadora" type="email" placeholder="Ex.: cotacao@transportadora.com.br" /></div>
            <div><label>Valor aprovado R$</label><input id="valorAprovado" type="number" min="0" step="0.01" /></div>
            <div class="full"><label>Materiais / Detalhes da carga</label><textarea id="materiais" placeholder="Descreva todos os itens, quantidades, pesos, dimensões e valores declarados."></textarea></div>
            <div class="full"><label>Dimensões / Informações complementares</label><textarea id="dimensoesCarga" placeholder="Ex.: dimensões totais, peso estimado por obra, observações para cotação."></textarea></div>
            <div class="full observations-limit-wrap"><label>Observações / erros encontrados</label><textarea id="observacoes" maxlength="240" placeholder="Descreva os erros encontrados no formulário ou outras observações (máximo de 240 caracteres)."></textarea><div class="observations-counter" id="observacoesCounter">0/240 caracteres</div></div>
          </div>

          <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="freightSubmitButton" class="btn-primary" type="submit">Criar solicitação</button>
            <button id="freightResetButton" class="btn-secondary" type="reset">Limpar formulário</button>
          </div>
        </form>
      </div>
    </section>

    <section id="kanban" class="section">
      <div class="panel">
        <h2>Kanban Operacional</h2><p class="muted">As solicitações são priorizadas pelo menor prazo de entrega e pelo semáforo automático. Cronômetros: segunda a sexta, das 07h às 17h.</p>

        <div class="kanban-toolbar">
          <input id="searchInput" placeholder="Buscar por obra, origem, destino, material ou solicitação" oninput="renderAll()" />

          <select id="semaforoFilter" onchange="renderAll()">
            <option value="">Todos os semáforos</option>
            <option value="red">Vermelho</option>
            <option value="yellow">Amarelo</option>
            <option value="green">Verde</option>
            <option value="gray">Cancelado</option>
          </select>

          <select id="obraFilter" onchange="renderAll()">
            <option value="">Todas as obras</option>
          </select>

          <select id="sortMode" onchange="renderAll()">
            <option value="deadline">Ordenar por menor prazo</option>
            <option value="created">Ordenar por criação</option>
            <option value="phaseTime">Ordenar por tempo na fase</option>
          </select>
        </div>

        <div id="kanbanBoard" class="kanban"></div>
      </div>
    </section>


    <section id="mapa" class="section">
      <div class="panel">
        <h2>Mapa de Rotas dos Fretes</h2>
        <p class="muted">Mapa do Google Maps incorporado sem chave de API. Ao selecionar um frete, o mapa abre somente a rota entre coleta e entrega; o rastreamento detalhado fica separado abaixo.</p>

        <div class="map-layout">
          <div class="map-shell">
            <div id="brazilMapStage" class="google-embed-map">
              <iframe
                id="googleRouteFrame"
                class="google-embed-frame"
                src="https://www.google.com/maps?q=Brasil&output=embed"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen>
              </iframe>

              <svg id="brazilMapSvg" class="operations-overlay" viewBox="0 0 760 640" preserveAspectRatio="xMidYMid meet" aria-label="Camada operacional com rotas de frete">
                <defs>
                  <filter id="pinShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.22"/>
                  </filter>
                  <linearGradient id="mapRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#2563eb" />
                    <stop offset="55%" stop-color="#3b82f6" />
                    <stop offset="100%" stop-color="#1d4ed8" />
                  </linearGradient>
                </defs>

                <g id="brazilRoutesLayer"></g>
                <g id="brazilPointsLayer"></g>
                <g id="brazilTruckLayer"></g>
              </svg>

              <div class="google-embed-badge">Rota no Google Maps</div>
              <div class="map-alert-note">Mapa com rota do frete selecionado.</div>
            </div>

            <div class="brazil-map-status">
              <div>Solicitação<strong id="mapFreightId">-</strong></div>
              <div>Fase atual<strong id="mapFreightPhase">-</strong></div>
              <div>Tempo restante<strong id="mapFreightRemaining">-</strong></div>
              <div>Tempo na fase<strong id="mapFreightPhaseTime">-</strong></div>
            </div>

            <div class="brazil-map-legend">
              <span><i class="legend-dot origin"></i> Coleta</span>
              <span><i class="legend-dot destination"></i> Entrega</span>
              <span><i class="legend-line route-blue"></i> Rota do frete</span>
            </div>

            <div id="mapLocationLinks" class="map-location-links" hidden>
              <a id="mapOriginGoogleLink" href="#" target="_blank" rel="noopener noreferrer">📍 Abrir coleta no Google Maps</a>
              <a id="mapDestinationGoogleLink" href="#" target="_blank" rel="noopener noreferrer">🏁 Abrir entrega no Google Maps</a>
            </div>
          </div>

          <div id="deliveryTrackingPanel" class="delivery-tracking-panel">
            <div class="tracking-header">
              <div>
                <span class="tracking-kicker">Rastreamento do frete</span>
                <h3 id="trackingTitle">Selecione um frete</h3>
                <p id="trackingSubtitle">Status conforme Kanban.</p>
              </div>
              <div class="tracking-status-pill" id="trackingStatusPill">-</div>
            </div>

            <div class="tracking-route-summary">
              <div>
                <span>Coleta</span>
                <strong id="trackingOrigin">-</strong>
              </div>
              <div>
                <span>Entrega</span>
                <strong id="trackingDestination">-</strong>
              </div>
              <div>
                <span>Previsão</span>
                <strong id="trackingDeadline">-</strong>
              </div>
            </div>

            <div class="ecommerce-tracker">
              <div class="tracker-rail">
                <div id="trackerProgress" class="tracker-progress"></div>
                <div id="trackerTruck" class="tracker-truck">
                  <div class="tracker-truck-shadow"></div>
                  <div class="tracker-truck-body">
                    <div class="tracker-truck-trailer"></div>
                    <div class="tracker-truck-line"></div>
                    <div class="tracker-truck-line line-2"></div>
                    <div class="tracker-truck-chassis"></div>
                    <div class="tracker-truck-cab"></div>
                    <div class="tracker-truck-window window-a"></div>
                    <div class="tracker-truck-window window-b"></div>
                    <div class="tracker-truck-light"></div>
                    <div class="tracker-truck-wheel wheel-a"></div>
                    <div class="tracker-truck-wheel wheel-b"></div>
                  </div>
                </div>
              </div>
              <div id="trackerSteps" class="tracker-steps"></div>
            </div>
          </div>

          <div>
            <h3 style="margin-top:0;">Fretes em acompanhamento</h3>
            <div id="mapFreightList" class="freight-list"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="cotacao" class="section">
      <div class="panel quotation-map-panel">
        <div class="quotation-hero">
          <div>
            <span class="quotation-kicker">Mapa de Cotações</span>
            <h2>Cotações por Frete</h2>
            <p class="muted">Preços, prazos, pagamento e saving.</p>
          </div>

          <div class="quotation-hero-kpis">
            <div>
              <span>Saving total</span>
              <strong id="quoteTotalSaving">R$ 0,00</strong>
            </div>
            <div>
              <span>Fretes cotados</span>
              <strong id="quotedFreightsCount">0</strong>
            </div>
            <div>
              <span>Cotações</span>
              <strong id="totalQuotesCount">0</strong>
            </div>
          </div>
        </div>

        <div class="quotation-grid">
          <aside class="quotation-freights">
            <div class="quotation-side-header">
              <h3>Fretes para cotação</h3>
              <p>Lista de fretes.</p>
            </div>

            <div class="quotation-search">
              <input id="quoteSearchInput" placeholder="Buscar frete..." oninput="renderQuoteFreightList()" />
            </div>

            <div id="quoteFreightList" class="quotation-freight-list"></div>
          </aside>

          <main class="quotation-work-area">
            <div id="quoteEmptyState" class="quotation-empty-state">
              <strong>Selecione um frete</strong>
              <span>Cotações e comparativo do frete selecionado.</span>
            </div>

            <div id="quoteWorkspace" class="quotation-workspace" style="display:none;">
              <div class="quotation-selected-card">
                <div>
                  <span>Frete selecionado</span>
                  <h3 id="quoteFreightTitle">-</h3>
                  <p id="quoteFreightRoute">-</p>
                </div>

                <div class="quotation-saving-summary">
                  <span>Saving do frete</span>
                  <strong id="selectedQuoteSaving">R$ 0,00</strong>
                  <small id="selectedQuoteSavingPct">0%</small>
                </div>
              </div>

              <div class="quotation-form-card">
                <div class="quotation-form-title">
                  <div>
                    <span>Cotação</span>
                    <strong>Nova cotação</strong>
                  </div>
                  <button class="btn-secondary" onclick="clearQuoteForm()">Limpar</button>
                </div>

                <div class="quotation-form-grid">
                  <div>
                    <label>Transportadora</label>
                    <input id="quoteCarrier" placeholder="Nome da transportadora" />
                  </div>
                  <div>
                    <label>Preço cotado R$</label>
                    <input id="quotePrice" type="number" min="0" step="0.01" placeholder="0,00" />
                  </div>
                  <div>
                    <label>Condição de pagamento</label>
                    <select id="quotePayment">
                      <option value="À vista">À vista</option>
                      <option value="7 dias">7 dias</option>
                      <option value="15 dias">15 dias</option>
                      <option value="30 dias">30 dias</option>
                      <option value="45 dias">45 dias</option>
                      <option value="60 dias">60 dias</option>
                      <option value="90 dias">90 dias</option>
                      <option value="Risco Sacado">Risco Sacado</option>
                    </select>
                  </div>
                  <div>
                    <label>Prazo operacional</label>
                    <input id="quoteDeadline" placeholder="Prazo" />
                  </div>
                  <div>
                    <label>Validade</label>
                    <input id="quoteValidity" type="date" />
                  </div>
                  <div>
                    <label>Observações</label>
                    <input id="quoteNotes" placeholder="Observações" />
                  </div>
                </div>

                <button class="btn-primary quotation-add-button" onclick="addQuoteToSelectedFreight()">Adicionar cotação</button>
              </div>

              <div class="quotation-comparison-card">
                <div class="quotation-comparison-header">
                  <div>
                    <span>Comparativo</span>
                    <h3 id="quoteCountLabel">0 propostas</h3>
                  </div>
                  <p>Comparação entre transportadoras, valor, prazo, pagamento e saving.</p>
                </div>

                <div id="quoteComparisonTable" class="quotation-table-wrap"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <section id="dashboard" class="section">
      <div class="panel dashboard-executive-panel">
        <div class="dashboard-title-row">
          <div>
            <h2>Dashboard de Fretes</h2>
            <p class="muted">Indicadores operacionais da carteira.</p>
          </div>
          <div class="dashboard-update-badge">Base atualizada pelo Kanban</div>
        </div>

        <div class="dashboard-filter-panel">
          <div class="dashboard-filter-head">
            <div>
              <span class="dashboard-filter-kicker">Filtros do Dashboard</span>
              <strong>Recorte gerencial da carteira</strong>
              <p>Os indicadores, gráficos, semáforo e médias são recalculados automaticamente.</p>
            </div>
            <div class="dashboard-filter-summary" id="dashboardFilterSummary">Base completa</div>
          </div>
          <div class="dashboard-filter-grid">
            <div class="dashboard-filter-field dashboard-search-field">
              <label>Pesquisa</label>
              <input id="dashboardSearch" type="search" placeholder="RM, obra, rota, solicitante ou transportadora" />
            </div>
            <div class="dashboard-filter-field">
              <label>Fase</label>
              <select id="dashboardPhase">
                <option value="">Todas as fases</option>
                <option>Não iniciado</option>
                <option>Em cotação</option>
                <option>Aguardando Validação da Obra</option>
                <option>Coleta Agendada</option>
                <option>Em transporte</option>
                <option>Entregue</option>
                <option>Cancelados</option>
              </select>
            </div>
            <div class="dashboard-filter-field">
              <label>Urgência</label>
              <select id="dashboardUrgency">
                <option value="">Normal ou urgente</option>
                <option value="NORMAL">Normal</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
            <div class="dashboard-filter-field">
              <label>Semáforo</label>
              <select id="dashboardTraffic">
                <option value="">Todos</option>
                <option value="red">Vermelho</option>
                <option value="yellow">Amarelo</option>
                <option value="green">Verde</option>
                <option value="gray">Cancelado</option>
              </select>
            </div>
            <div class="dashboard-filter-field">
              <label>Obra / Departamento</label>
              <select id="dashboardObra"><option value="">Todas</option></select>
            </div>
            <div class="dashboard-filter-field">
              <label>Solicitações desde</label>
              <input id="dashboardDateFrom" type="date" />
            </div>
            <div class="dashboard-filter-field">
              <label>Solicitações até</label>
              <input id="dashboardDateTo" type="date" />
            </div>
            <button class="dashboard-clear-btn" type="button" onclick="clearDashboardFilters()">Limpar filtros</button>
          </div>
        </div>

        <div id="executiveKpis" class="executive-kpis"></div>

        <div class="decision-strip">
          <div>
            <span>Ponto de atenção</span>
            <strong id="decisionHeadline">-</strong>
          </div>
          <p id="decisionText">-</p>
        </div>

        <div class="powerbi-grid">
          <div class="bi-card bi-card-large">
            <div class="bi-card-header">
              <div>
                <span class="bi-eyebrow">Distribuição operacional</span>
                <h3>Fretes por fase do processo</h3>
              </div>
              <strong id="phaseTotalLabel">0 fretes</strong>
            </div>
            <div id="phaseBarChart" class="horizontal-bars"></div>
          </div>

          <div class="bi-card semaphore-card">
            <div class="bi-card-header">
              <div>
                <span class="bi-eyebrow">SLA e risco</span>
                <h3>Semáforo da carteira</h3>
                <p>Fretes em aberto classificados conforme a data limite.</p>
              </div>
            </div>
            <div id="riskDonut" class="semaphore-chart"></div>
          </div>

          <div class="bi-card bi-card-large obra-departamentos-card">
            <div class="bi-card-header obra-card-header">
              <div>
                <span class="bi-eyebrow">Obras / Departamentos</span>
                <h3>Distribuição das solicitações por unidade</h3>
                <p>Ranking com participação na carteira e situação operacional de cada obra ou departamento.</p>
              </div>
              <strong id="obraSummaryLabel">0 unidades</strong>
            </div>
            <div id="obraBarChart" class="obra-ranking-chart"></div>
          </div>

          <div class="bi-card">
            <div class="bi-card-header">
              <div>
                <span class="bi-eyebrow">Agenda crítica</span>
                <h3>Próximos vencimentos</h3>
              </div>
            </div>
            <div id="deadlineList" class="deadline-list"></div>
          </div>

          <div class="bi-card">
            <div class="bi-card-header">
              <div>
                <span class="bi-eyebrow">Tempos por fase</span>
                <h3>Médias por fase</h3>
              </div>
            </div>
            <div id="phaseAverages" class="avg-list"></div>
          </div>
        </div>

        <div class="insights-grid">
          <div class="insight-card">
            <span>Gargalo</span>
            <strong id="bottleneckInsight">-</strong>
            <p>Maior concentração da carteira.</p>
          </div>
          <div class="insight-card">
            <span>SLA</span>
            <strong id="slaInsight">-</strong>
            <p>Fretes vencidos ou em alerta.</p>
          </div>
          <div class="insight-card">
            <span>Prioridade</span>
            <strong id="managementPriority">-</strong>
            <p>Prioridade operacional.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="report" class="section">
      <div class="freight-report-shell">
        <section class="freight-report-filters">
          <label class="freight-report-search"><span>Pesquisa</span><input id="freightReportSearch" type="search" placeholder="Solicitação, RM, OC, CTE, obra, solicitante, rota ou transportadora"></label>
          <label><span>Urgência</span><select id="freightReportUrgency"><option value="">Normal ou urgente</option><option value="NORMAL">Normal</option><option value="URGENTE">Urgente</option></select></label>
          <label><span>Tipo de movimentação</span><select id="freightReportMovement"><option value="">Todos os tipos</option></select></label>
          <label><span>Obra / departamento</span><select id="freightReportObra"><option value="">Todas</option></select></label>
          <label><span>Transportadora</span><select id="freightReportCarrier"><option value="">Todas</option></select></label>
          <label class="freight-report-date-filter"><span>Data da solicitação</span><div class="freight-report-date-range"><input id="freightReportDateFrom" aria-label="Data inicial" type="date"><input id="freightReportDateTo" aria-label="Data final" type="date"></div></label>
          <button class="btn-secondary freight-report-clear" id="clearFreightReportFilters" type="button">Limpar filtros</button>
        </section>

        <section class="freight-report-table-card">
          <div class="freight-report-table-head">
            <div>
              <h2>Relatório de Fretes Entregues</h2>
              <p id="freightReportSummary">Nenhum frete entregue.</p>
            </div>
            <div class="freight-report-table-actions">
              <span class="freight-report-status">Fase final · Entregue</span>
              <button class="btn-primary freight-report-export" id="exportFreightReport" type="button">⬇ Exportar Excel</button>
            </div>
          </div>
          <div class="freight-report-table-wrap">
            <table class="freight-report-table">
              <thead>
                <tr>
                  <th>Solicitação</th>
                  <th>Nº RM</th>
                  <th>Nº da OC</th>
                  <th>Nº do CTE</th>
                  <th>Obra / departamento</th>
                  <th>Solicitante</th>
                  <th>Urgência</th>
                  <th>Tipo de movimentação</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Veículo</th>
                  <th>Transportadora aprovada</th>
                  <th>Valor aprovado</th>
                  <th>Condição de pagamento</th>
                  <th>Saving</th>
                  <th>Data da solicitação</th>
                  <th>Data da coleta</th>
                  <th>Data da entrega</th>
                  <th>SLA total</th>
                  <th>Qualidade</th>
                  <th>OBS do Responsável</th>
                </tr>
              </thead>
              <tbody id="freightReportBody"></tbody>
            </table>
          </div>
          <div class="freight-report-empty" id="freightReportEmpty" style="display:none;">Nenhum frete entregue corresponde aos filtros selecionados.</div>
        </section>
      </div>
    </section>

    <section id="history" class="section">
      <div class="panel">
        <h2>Histórico de movimentações</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Solicitação</th>
                <th>Obra</th>
                <th>Fase</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Tempo na fase</th>
              </tr>
            </thead>
            <tbody id="historyTable"></tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="editor" class="section">
      <div class="panel form-editor-shell">
        <div class="form-editor-intro">
          <div>
            <h2>Editor do Formulário</h2>
            <p>Edite títulos, perguntas, tipos de campo, opções, obrigatoriedade, visibilidade e ordem. As alterações são salvas automaticamente neste navegador.</p>
          </div>
          <span class="form-editor-status" id="formEditorStatus">Configuração salva</span>
        </div>

        <div class="form-editor-tools">
          <div class="form-editor-tool">
            <label>NOVA SEÇÃO</label>
            <div class="form-editor-tool-row">
              <input id="editorNewSectionTitle" placeholder="Ex.: Dados da transportadora" />
              <button class="btn-secondary" type="button" onclick="addFreightFormSection()">Adicionar seção</button>
            </div>
          </div>
          <div class="form-editor-tool">
            <label>NOVO CAMPO</label>
            <div class="form-editor-tool-row field-add">
              <input id="editorNewFieldLabel" placeholder="Nome da pergunta" />
              <select id="editorNewFieldType">
                <option value="text">Texto</option><option value="number">Número</option><option value="date">Data</option><option value="time">Hora</option><option value="datetime-local">Data e hora</option><option value="email">E-mail</option><option value="tel">Telefone</option><option value="select">Lista suspensa</option><option value="textarea">Texto longo</option>
              </select>
              <select id="editorNewFieldSection"><option value="">Final do formulário</option></select>
              <button class="btn-primary" type="button" onclick="addFreightFormField()">Adicionar campo</button>
            </div>
          </div>
          <div class="form-editor-actions">
            <button class="btn-secondary" type="button" onclick="confirmFreightFormSaved()">Salvar agora</button>
            <button class="btn-danger" type="button" onclick="restoreDefaultFreightForm()">Restaurar padrão</button>
          </div>
        </div>

        <div class="form-editor-note">Campos novos também são gravados dentro da solicitação. Alterações no formulário não apagam os fretes que já foram cadastrados.</div>
        <div class="form-editor-list" id="freightFormEditorList"></div>
      </div>
    </section>
      </main>
    </div>
  </div>

  <div id="detailsModal" class="modal-backdrop" onclick="closeModal(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 id="modalTitle">Detalhes</h2>
        <button class="btn-secondary" onclick="closeModal()">Fechar</button>
      </div>
      <div id="modalContent"></div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"><\/script>
  <script>
    const PHASES = [
      "Não iniciado",
      "Em cotação",
      "Aguardando Validação da Obra",
      "Coleta Agendada",
      "Em transporte",
      "Entregue",
      "Cancelados"
    ];

    const FINAL_PHASES = ["Entregue", "Cancelados"];

    const VEHICLE_TYPES = [
      "Utilitário", "VUC", "Caminhão 3/4", "Toco", "Truck",
      "Bitruck", "Munck", "Prancha", "Carreta"
    ];

    const VEHICLE_IMPLEMENT_OPTIONS = {
      "Utilitário": ["Não se aplica"],
      "VUC": ["Baú", "Carroceria Aberta", "Sider"],
      "Caminhão 3/4": ["Baú", "Carroceria Aberta", "Sider", "Plataforma"],
      "Toco": ["Baú", "Carroceria Aberta", "Sider", "Plataforma", "Tanque", "Caçamba"],
      "Truck": ["Baú", "Carroceria Aberta", "Sider", "Plataforma", "Tanque", "Caçamba"],
      "Bitruck": ["Baú", "Carroceria Aberta", "Sider", "Plataforma", "Tanque", "Caçamba"],
      "Munck": ["Não se aplica"],
      "Carreta": ["Baú", "Carroceria Aberta", "Sider", "Plataforma", "Prancha", "Tanque", "Graneleiro", "Porta-contêiner", "Cegonha"]
    };

    const VEHICLE_TRACTION_TYPES = new Set(["Truck", "Bitruck", "Munck", "Prancha", "Carreta"]);
    const STORAGE_KEY = "gestao_fretes_solicitacoes_v1";
    const FORM_EDITOR_STORAGE_KEY = "gestao_fretes_formulario_config_v1";

    let defaultFreightFormSchema = [];
    let freightFormSchema = [];
    let freights = loadFreights();
    let selectedMapFreightId = null;
    let selectedQuoteFreightId = null;
    let editingFreightId = null;

    /*
      GOOGLE MAPS:
      Para ativar o mapa real, substitua o texto abaixo pela sua chave da API Google Maps.
      APIs recomendadas no Google Cloud:
      - Maps JavaScript API
      - Geocoding API
      - Directions API
      Importante: restrinja a chave ao domínio/URL onde o app será hospedado.
    */
    const GOOGLE_MAPS_API_KEY_STORAGE = "gestao_fretes_google_maps_api_key_v1";
    const GOOGLE_MAPS_API_KEY_FALLBACK = "COLE_SUA_CHAVE_DO_GOOGLE_MAPS_AQUI";
    const GOOGLE_MAPS_EMBED_FALLBACK_URL = "https://www.google.com/maps?q=Brasil&output=embed";
    const getManagedGoogleMapsApiKey = () => {
      try {
        return String(window.SUPPLY_FLOW_GOOGLE_MAPS_API_KEY || "").trim();
      } catch (error) {
        return "";
      }
    };
    let GOOGLE_MAPS_API_KEY = (() => {
      const managedKey = getManagedGoogleMapsApiKey();
      if (managedKey) return managedKey;
      try {
        return String(localStorage.getItem(GOOGLE_MAPS_API_KEY_STORAGE) || GOOGLE_MAPS_API_KEY_FALLBACK).trim();
      } catch (error) {
        return GOOGLE_MAPS_API_KEY_FALLBACK;
      }
    })();

    let googleMapInstance = null;
    let googleDirectionsService = null;
    let googleDirectionsRenderer = null;
    let googleMapMarkers = [];
    let googleTruckOverlay = null;
    let googleRoutePath = [];
    let googleMapsLoaded = false;
    let googleMapsLoading = false;

    const FREIGHT_REQUEST_SLA_DAYS = Object.freeze({ NORMAL: 5, URGENTE: 3 });

    function dateToInputValue(dateValue) {
      const date = dateValue instanceof Date ? new Date(dateValue) : new Date(dateValue);
      if (Number.isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return \`\${year}-\${month}-\${day}\`;
    }

    function parseLocalDateInput(value) {
      const match = String(value || "").match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
      if (!match) return null;
      const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0, 0);
      return Number.isNaN(date.getTime()) ? null : date;
    }

    function addRequestBusinessDays(startValue, businessDays) {
      const start = startValue instanceof Date ? new Date(startValue) : parseLocalDateInput(startValue);
      if (!start || Number.isNaN(start.getTime())) return "";
      const cursor = new Date(start);
      cursor.setHours(12, 0, 0, 0);
      let remaining = Math.max(0, Number(businessDays) || 0);
      while (remaining > 0) {
        cursor.setDate(cursor.getDate() + 1);
        const day = cursor.getDay();
        if (day >= 1 && day <= 5) remaining -= 1;
      }
      return dateToInputValue(cursor);
    }

    function getFreightRequestDateValue(freight = null) {
      if (freight?.dataSolicitacao) return String(freight.dataSolicitacao).slice(0, 10);
      if (freight?.createdAt) return dateToInputValue(new Date(freight.createdAt));
      return dateToInputValue(new Date());
    }

    function getMinimumCollectionDateValue(urgencyValue, requestDateValue) {
      const urgency = String(urgencyValue || "NORMAL").toUpperCase() === "URGENTE" ? "URGENTE" : "NORMAL";
      const days = FREIGHT_REQUEST_SLA_DAYS[urgency];
      return addRequestBusinessDays(requestDateValue || dateToInputValue(new Date()), days);
    }

    function formatDateOnlyPtBr(value) {
      const date = parseLocalDateInput(value);
      return date ? date.toLocaleDateString("pt-BR") : "-";
    }

    function upsertFieldRuleNote(control, noteId, html) {
      if (!control) return;
      const wrapper = control.closest("[data-form-key]") || control.parentElement;
      if (!wrapper) return;
      let note = wrapper.querySelector(\`#\${noteId}\`);
      if (!note) {
        note = document.createElement("small");
        note.id = noteId;
        note.className = "field-rule-note";
        wrapper.appendChild(note);
      }
      note.innerHTML = html;
    }

    function setupInitialDateUrgencyLogic(preserveCollectionDate = true) {
      const urgencyControl = document.getElementById("urgencia");
      const requestDateControl = document.getElementById("dataSolicitacao");
      const collectionDateControl = document.getElementById("dataColetaMaterial");
      if (!urgencyControl || !requestDateControl || !collectionDateControl) return;

      requestDateControl.readOnly = true;
      requestDateControl.setAttribute("aria-readonly", "true");
      if (!requestDateControl.value) requestDateControl.value = dateToInputValue(new Date());
      if (!urgencyControl.value) urgencyControl.value = "NORMAL";

      const applyRule = (forceExactDate = false) => {
        const urgency = urgencyControl.value === "URGENTE" ? "URGENTE" : "NORMAL";
        const days = FREIGHT_REQUEST_SLA_DAYS[urgency];
        const minimumDate = getMinimumCollectionDateValue(urgency, requestDateControl.value);
        collectionDateControl.min = minimumDate;
        if (forceExactDate || !preserveCollectionDate || !collectionDateControl.value || collectionDateControl.value < minimumDate) {
          collectionDateControl.value = minimumDate;
        }
        collectionDateControl.setCustomValidity(
          collectionDateControl.value && collectionDateControl.value < minimumDate
            ? \`A data da coleta deve ser a partir de \${formatDateOnlyPtBr(minimumDate)}.\`
            : ""
        );

        upsertFieldRuleNote(
          urgencyControl,
          "urgenciaSlaNote",
          \`<strong>\${urgency}</strong>: prazo mínimo de atendimento de <strong>\${days} dias úteis</strong>.\`
        );
        upsertFieldRuleNote(
          requestDateControl,
          "dataSolicitacaoNote",
          "Data preenchida automaticamente e bloqueada para edição."
        );
        upsertFieldRuleNote(
          collectionDateControl,
          "dataColetaSlaNote",
          \`Data mínima permitida: <strong>\${formatDateOnlyPtBr(minimumDate)}</strong> (\${days} dias úteis após a solicitação).\`
        );
      };

      if (urgencyControl.dataset.slaRuleBound !== "1") {
        urgencyControl.dataset.slaRuleBound = "1";
        urgencyControl.addEventListener("change", () => applyRule(true));
      }
      if (collectionDateControl.dataset.slaRuleBound !== "1") {
        collectionDateControl.dataset.slaRuleBound = "1";
        collectionDateControl.addEventListener("input", () => applyRule(false));
        collectionDateControl.addEventListener("change", () => applyRule(false));
      }

      applyRule(false);
    }


    function isGoogleMapsLink(value) {
      const raw = String(value || "").trim();
      if (!raw) return false;
      try {
        const url = new URL(raw);
        const host = url.hostname.toLowerCase();
        return (
          host === "maps.app.goo.gl" ||
          host === "goo.gl" ||
          host === "maps.google.com" ||
          host.startsWith("maps.google.") ||
          ((host === "google.com" || host.startsWith("www.google.")) && url.pathname.toLowerCase().includes("/maps"))
        );
      } catch (error) {
        return false;
      }
    }

    function decodeMapsText(value) {
      let decoded = String(value || "");
      for (let index = 0; index < 3; index += 1) {
        try {
          const next = decodeURIComponent(decoded);
          if (next === decoded) break;
          decoded = next;
        } catch (error) {
          break;
        }
      }
      return decoded.replace(/\\+/g, " ").trim();
    }

    function extractLatLngFromMapsValue(value) {
      const raw = decodeMapsText(value);
      if (!raw) return null;

      const direct = raw.match(/^\\s*(-?\\d{1,2}(?:\\.\\d+)?)\\s*,\\s*(-?\\d{1,3}(?:\\.\\d+)?)\\s*$/);
      if (direct) return { lat: Number(direct[1]), lng: Number(direct[2]) };

      const atCoordinates = raw.match(/@(-?\\d{1,2}(?:\\.\\d+)?),(-?\\d{1,3}(?:\\.\\d+)?)/);
      if (atCoordinates) return { lat: Number(atCoordinates[1]), lng: Number(atCoordinates[2]) };

      const dataCoordinates = raw.match(/!3d(-?\\d{1,2}(?:\\.\\d+)?)!4d(-?\\d{1,3}(?:\\.\\d+)?)/);
      if (dataCoordinates) return { lat: Number(dataCoordinates[1]), lng: Number(dataCoordinates[2]) };

      const reverseDataCoordinates = raw.match(/!2d(-?\\d{1,3}(?:\\.\\d+)?)!3d(-?\\d{1,2}(?:\\.\\d+)?)/);
      if (reverseDataCoordinates) return { lat: Number(reverseDataCoordinates[2]), lng: Number(reverseDataCoordinates[1]) };

      return null;
    }

    function extractGoogleMapsLocation(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";

      const coordinates = extractLatLngFromMapsValue(raw);
      if (coordinates && Number.isFinite(coordinates.lat) && Number.isFinite(coordinates.lng)) {
        return \`\${coordinates.lat},\${coordinates.lng}\`;
      }

      try {
        const url = new URL(raw);
        const parameterNames = ["query", "q", "ll", "destination", "origin", "daddr", "saddr"];
        for (const name of parameterNames) {
          const parameter = decodeMapsText(url.searchParams.get(name));
          if (parameter) return parameter;
        }

        const placeId = decodeMapsText(url.searchParams.get("query_place_id"));
        if (placeId) return \`place_id:\${placeId}\`;

        const decodedPath = decodeMapsText(url.pathname);
        const placeMatch = decodedPath.match(/\\/(?:place|search)\\/([^/]+)/i);
        if (placeMatch && placeMatch[1]) return decodeMapsText(placeMatch[1]);
      } catch (error) {
        return "";
      }

      return "";
    }

    function getFreightAddress(freight, type) {
      if (!freight) return "";
      return type === "origin"
        ? String(freight.enderecoColeta || freight.origem || "").trim()
        : String(freight.enderecoEntrega || freight.destino || "").trim();
    }

    function getFreightGoogleMapsLink(freight, type) {
      if (!freight) return "";
      const value = type === "origin" ? freight.linkGoogleMapsColeta : freight.linkGoogleMapsEntrega;
      return isGoogleMapsLink(value) ? String(value).trim() : "";
    }

    function getFreightMapLocation(freight, type) {
      const link = getFreightGoogleMapsLink(freight, type);
      const extracted = extractGoogleMapsLocation(link);
      const address = getFreightAddress(freight, type);
      return extracted || address || link || "";
    }

    function getFreightLocationDisplay(freight, type) {
      const address = getFreightAddress(freight, type);
      if (address) return address;
      const extracted = extractGoogleMapsLocation(getFreightGoogleMapsLink(freight, type));
      return extracted || (getFreightGoogleMapsLink(freight, type) ? "Local informado por link do Google Maps" : "-");
    }

    function setupGoogleMapsLinkFields() {
      ["linkGoogleMapsColeta", "linkGoogleMapsEntrega"].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        const validate = () => {
          const value = input.value.trim();
          input.classList.remove("maps-link-valid", "maps-link-invalid");
          input.setCustomValidity("");
          if (!value) return;
          if (isGoogleMapsLink(value)) {
            input.classList.add("maps-link-valid");
          } else {
            input.classList.add("maps-link-invalid");
            input.setCustomValidity("Insira um link válido do Google Maps.");
          }
        };
        if (input.dataset.mapsValidationBound !== "1") {
          input.dataset.mapsValidationBound = "1";
          input.addEventListener("input", validate);
          input.addEventListener("blur", validate);
        }
        validate();
      });
    }


    const LOCATION_INPUT_MODES = Object.freeze({
      ADDRESS: "ENDERECO",
      MAPS: "LINK_MAPS"
    });

    function setLocationModeFieldState(fieldId, visible, required, clearWhenHidden = false) {
      const control = document.getElementById(fieldId);
      if (!control) return;
      const wrapper = control.closest("[data-form-key]") || control.parentElement;
      if (wrapper) {
        wrapper.classList.toggle("location-mode-hidden", !visible);
        wrapper.classList.toggle("location-mode-active", visible);
        wrapper.classList.toggle("location-mode-required", visible && required);
      }
      control.disabled = !visible;
      control.required = Boolean(visible && required);
      if (!visible) {
        control.setCustomValidity("");
        control.classList.remove("maps-link-valid", "maps-link-invalid");
        if (clearWhenHidden) control.value = "";
      }
    }

    function inferLocationInputMode(type) {
      const isCollection = type === "collection";
      const address = document.getElementById(isCollection ? "enderecoColeta" : "enderecoEntrega")?.value.trim() || "";
      const link = document.getElementById(isCollection ? "linkGoogleMapsColeta" : "linkGoogleMapsEntrega")?.value.trim() || "";
      if (link && !address) return LOCATION_INPUT_MODES.MAPS;
      if (address) return LOCATION_INPUT_MODES.ADDRESS;
      return "";
    }

    function updateLocationInputMode(type, preserveValues = true) {
      const isCollection = type === "collection";
      const modeId = isCollection ? "modoLocalColeta" : "modoLocalEntrega";
      const addressId = isCollection ? "enderecoColeta" : "enderecoEntrega";
      const cepId = isCollection ? "cepColeta" : "cepEntrega";
      const linkId = isCollection ? "linkGoogleMapsColeta" : "linkGoogleMapsEntrega";
      const modeControl = document.getElementById(modeId);
      if (!modeControl) return;

      if (!modeControl.value && preserveValues) {
        const inferredMode = inferLocationInputMode(type);
        if (inferredMode) modeControl.value = inferredMode;
      }

      const selectedMode = modeControl.value;
      const useAddress = selectedMode === LOCATION_INPUT_MODES.ADDRESS;
      const useMaps = selectedMode === LOCATION_INPUT_MODES.MAPS;

      modeControl.required = true;
      setLocationModeFieldState(addressId, useAddress, useAddress, !preserveValues);
      setLocationModeFieldState(cepId, useAddress, useAddress, !preserveValues);
      setLocationModeFieldState(linkId, useMaps, useMaps, !preserveValues);

      if (useMaps) setupGoogleMapsLinkFields();
    }

    function setupLocationInputModes(preserveValues = true) {
      [
        { id: "modoLocalColeta", type: "collection" },
        { id: "modoLocalEntrega", type: "delivery" }
      ].forEach(({ id, type }) => {
        const control = document.getElementById(id);
        if (!control) return;
        if (control.dataset.locationModeBound !== "1") {
          control.dataset.locationModeBound = "1";
          control.addEventListener("change", () => updateLocationInputMode(type, false));
        }
        updateLocationInputMode(type, preserveValues);
      });
    }

    function updateMapLocationLinks(freight) {
      const wrapper = document.getElementById("mapLocationLinks");
      const originAnchor = document.getElementById("mapOriginGoogleLink");
      const destinationAnchor = document.getElementById("mapDestinationGoogleLink");
      if (!wrapper || !originAnchor || !destinationAnchor) return;

      const originLink = getFreightGoogleMapsLink(freight, "origin");
      const destinationLink = getFreightGoogleMapsLink(freight, "destination");
      originAnchor.hidden = !originLink;
      destinationAnchor.hidden = !destinationLink;
      if (originLink) originAnchor.href = originLink;
      if (destinationLink) destinationAnchor.href = destinationLink;
      wrapper.hidden = !originLink && !destinationLink;
    }

    const LOGGED_USER_STORAGE_KEYS = [
      "seel_current_user", "seelCurrentUser", "SEEL_CURRENT_USER", "currentUser", "current_user",
      "loggedUser", "logged_user", "authUser", "auth_user", "usuarioLogado", "usuario_logado",
      "usuarioAtual", "supplyFlowUser", "supply_flow_user", "sfUser", "appUser", "userData",
      "user_data", "profile", "userProfile", "account", "sessionUser", "userSession", "authSession"
    ];

    let loggedRequesterIdentity = null;

    function normalizeLoggedUser(candidate) {
      if (!candidate) return null;
      let value = candidate;
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (!trimmed) return null;
        try { value = JSON.parse(trimmed); }
        catch (error) {
          if (trimmed.includes("@")) return { name: "", email: trimmed };
          return { name: trimmed, email: "" };
        }
      }
      if (typeof value !== "object") return null;
      if (value.data && typeof value.data === "object") value = { ...value, ...value.data };
      if (value.payload && typeof value.payload === "object") value = { ...value, ...value.payload };
      if (value.detail && typeof value.detail === "object") value = { ...value, ...value.detail };
      if (value.auth && typeof value.auth === "object") value = { ...value, ...value.auth };
      if (value.session && typeof value.session === "object") value = { ...value, ...value.session };
      if (value.account && typeof value.account === "object") value = { ...value, ...value.account };
      if (value.user && typeof value.user === "object") value = { ...value, ...value.user };
      if (value.usuario && typeof value.usuario === "object") value = { ...value, ...value.usuario };
      if (value.profile && typeof value.profile === "object") value = { ...value, ...value.profile };
      const name = String(
        value.name || value.nome || value.fullName || value.full_name || value.displayName ||
        value.display_name || value.nomeCompleto || value.nome_completo || value.userName ||
        value.username || value.preferred_username || value.given_name || ""
      ).trim();
      const email = String(
        value.email || value.mail || value.userEmail || value.user_email || value.emailUsuario ||
        value.email_usuario || value.upn || value.userPrincipalName || value.preferred_username || ""
      ).trim();
      if (!name && !email) return null;
      return { name, email };
    }

    function readLoggedUserFromStorage(storage) {
      if (!storage) return null;
      for (const key of LOGGED_USER_STORAGE_KEYS) {
        try {
          const user = normalizeLoggedUser(storage.getItem(key));
          if (user) return user;
        } catch (error) {}
      }
      const nameKeys = ["userName", "username", "nomeUsuario", "usuarioNome", "loggedUserName", "displayName", "fullName", "nomeCompleto"];
      const emailKeys = ["userEmail", "email", "emailUsuario", "usuarioEmail", "loggedUserEmail", "mail", "upn", "userPrincipalName"];
      let name = "";
      let email = "";
      for (const key of nameKeys) {
        try { name = name || String(storage.getItem(key) || "").trim(); } catch (error) {}
      }
      for (const key of emailKeys) {
        try { email = email || String(storage.getItem(key) || "").trim(); } catch (error) {}
      }
      return normalizeLoggedUser({ name, email });
    }

    function resolveLoggedRequesterIdentity() {
      const directCandidates = [
        window.SEEL_CURRENT_USER, window.currentUser, window.loggedUser,
        window.authUser, window.usuarioLogado, window.supplyFlowUser,
        window.user, window.appUser, window.userProfile, window.sessionUser
      ];
      for (const candidate of directCandidates) {
        const user = normalizeLoggedUser(candidate);
        if (user) return user;
      }

      const localUser = readLoggedUserFromStorage(window.localStorage) || readLoggedUserFromStorage(window.sessionStorage);
      if (localUser) return localUser;

      try {
        if (window.parent && window.parent !== window) {
          const parentCandidates = [
            window.parent.SEEL_CURRENT_USER, window.parent.currentUser, window.parent.loggedUser,
            window.parent.authUser, window.parent.usuarioLogado, window.parent.supplyFlowUser,
            window.parent.user, window.parent.appUser, window.parent.userProfile, window.parent.sessionUser
          ];
          for (const candidate of parentCandidates) {
            const user = normalizeLoggedUser(candidate);
            if (user) return user;
          }
          const parentStorageUser = readLoggedUserFromStorage(window.parent.localStorage) || readLoggedUserFromStorage(window.parent.sessionStorage);
          if (parentStorageUser) return parentStorageUser;
        }
      } catch (error) {}

      const params = new URLSearchParams(window.location.search);
      return normalizeLoggedUser({
        name: params.get("userName") || params.get("nome") || params.get("solicitante") || "",
        email: params.get("userEmail") || params.get("email") || params.get("emailSolicitante") || ""
      });
    }

    function applyRequesterIdentity(identity, lockFields = true) {
      const requesterInput = document.getElementById("solicitante");
      const emailInput = document.getElementById("emailSolicitante");
      const hint = document.getElementById("loggedUserHint");
      if (!requesterInput || !emailInput) return;

      const user = normalizeLoggedUser(identity);
      if (user?.name) requesterInput.value = user.name;
      if (user?.email) emailInput.value = user.email;

      const hasName = Boolean(requesterInput.value.trim());
      const hasEmail = Boolean(emailInput.value.trim());
      requesterInput.readOnly = true;
      emailInput.readOnly = true;
      requesterInput.setAttribute("aria-readonly", "true");
      emailInput.setAttribute("aria-readonly", "true");
      requesterInput.classList.add("login-fixed-field");
      emailInput.classList.add("login-fixed-field");

      if (hint) {
        if (hasName && hasEmail) {
          hint.textContent = \`Usuário conectado: \${requesterInput.value} · \${emailInput.value}\`;
          hint.classList.add("login-found");
        } else {
          hint.textContent = "Aguardando a identificação do usuário conectado no aplicativo principal. Nome e e-mail não podem ser digitados manualmente.";
          hint.classList.remove("login-found");
        }
      }
    }

    function setupLoggedRequesterFromHost(forceApply = false) {
      const resolved = resolveLoggedRequesterIdentity();
      if (resolved) loggedRequesterIdentity = resolved;
      if (editingFreightId && !forceApply) return;
      applyRequesterIdentity(loggedRequesterIdentity, true);
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: "REQUEST_CURRENT_USER", source: "gestao-fretes", action: "getCurrentUser" }, "*");
          window.parent.postMessage({ type: "GET_CURRENT_USER", source: "gestao-fretes", action: "getCurrentUser" }, "*");
          window.parent.postMessage({ type: "GET_LOGGED_USER", source: "gestao-fretes", action: "getLoggedUser" }, "*");
          window.parent.postMessage({ type: "REQUEST_USER_SESSION", source: "gestao-fretes", action: "getUserSession" }, "*");
        }
      } catch (error) {}
    }

    window.setFreightLoggedUser = function(user) {
      const normalized = normalizeLoggedUser(user);
      if (!normalized) return false;
      loggedRequesterIdentity = normalized;
      if (!editingFreightId) applyRequesterIdentity(normalized, true);
      return true;
    };

    window.addEventListener("message", event => {
      const payload = event?.data;
      if (!payload || typeof payload !== "object") return;
      const type = String(payload.type || "").toUpperCase();
      if (!["CURRENT_USER", "AUTH_USER", "SEEL_USER", "LOGGED_USER", "USER_SESSION", "CURRENT_USER_RESPONSE", "LOGGED_USER_RESPONSE", "USER_DATA", "USER_INFO", "APP_USER", "USER_PROFILE", "AUTH_STATE", "SESSION_USER", "LOGIN_USER"].includes(type)) return;
      window.setFreightLoggedUser(payload.user || payload.usuario || payload.account || payload.profile || payload.data || payload);
    });

    window.addEventListener("storage", event => {
      if (!event.key || LOGGED_USER_STORAGE_KEYS.includes(event.key) || /user|usuario|email|profile|account|session/i.test(event.key)) {
        setupLoggedRequesterFromHost(true);
      }
    });


    window.addEventListener("focus", () => setupLoggedRequesterFromHost(true));
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) setupLoggedRequesterFromHost(true);
    });

    let loggedRequesterSyncAttempts = 0;
    const loggedRequesterSyncTimer = window.setInterval(() => {
      loggedRequesterSyncAttempts += 1;
      if (!editingFreightId) setupLoggedRequesterFromHost(true);
      if ((loggedRequesterIdentity?.name && loggedRequesterIdentity?.email) || loggedRequesterSyncAttempts >= 30) {
        window.clearInterval(loggedRequesterSyncTimer);
      }
    }, 1000);

    initializeFreightFormEditor();
    setupObservationsLimit();
    setupInitialDateUrgencyLogic(false);
    setupGoogleMapsLinkFields();
    setupLocationInputModes(false);
    setupFreightAddressAutocomplete();
    setupLoggedRequesterFromHost(true);

    document.getElementById("freightForm").addEventListener("submit", function(event) {
      event.preventDefault();
      setupLoggedRequesterFromHost(true);
      const requesterName = document.getElementById("solicitante")?.value.trim();
      const requesterEmail = document.getElementById("emailSolicitante")?.value.trim();
      if (!requesterName || !requesterEmail) {
        setupLoggedRequesterFromHost(true);
        alert("Não foi possível identificar o nome e o e-mail do usuário conectado. Acesse o módulo pelo aplicativo principal e tente novamente.");
        return;
      }
      createFreight();
    });

    document.getElementById("freightForm").addEventListener("reset", function() {
      window.setTimeout(() => {
        cancelFreightEdit(false);
        setupObservationsLimit();
        setupVehicleFormLogic(false);
        setupInitialDateUrgencyLogic(false);
        setupGoogleMapsLinkFields();
        setupLocationInputModes(false);
        setupFreightAddressAutocomplete();
        setupLoggedRequesterFromHost(true);
      }, 0);
    });

    let isKanbanPhaseSelectorActive = false;

    setInterval(() => {
      if (document.getElementById("kanban")?.classList.contains("active")) {
        updateKanbanLiveValues();
      }
      if (document.getElementById("dashboard")?.classList.contains("active")) renderDashboard();
    }, 1000);
    renderAll();
    bindDashboardFilters();
    bindFreightReportControls();
    bindSupplyFlowSearch();
    setupGooglePlacesConfiguration();
    activateGoogleMapsIfConfigured();

    function showTab(id, button) {
      document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
      });

      const target = document.getElementById(id);
      if (target) {
        target.classList.add("active");
      }

      document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
      });

      if (button) {
        button.classList.add("active");
      } else {
        const foundButton = Array.from(document.querySelectorAll(".tab")).find(tab => {
          const attr = tab.getAttribute("onclick") || "";
          return attr.includes(\`'\${id}'\`) || attr.includes(\`"\${id}"\`);
        });
        if (foundButton) foundButton.classList.add("active");
      }

      if (id === "kanban") renderKanban();
      if (id === "mapa") renderMap();
      if (id === "cotacao") renderQuotes();
      if (id === "dashboard") renderDashboard();
      if (id === "report") { bindFreightReportControls(); renderFreightReport(); }
      if (id === "history") renderHistory();
      if (id === "editor") renderFreightFormEditor();
      updateSupplyFlowPage(id);
    }



    const SUPPLY_FLOW_PAGE_META = {
      form: ["Solicitações de frete", "Cadastre e acompanhe fretes, prazos, cotações, rotas e entregas."],
      kanban: ["Kanban de fretes", "Controle operacional por etapa, prazo, semáforo e tempo em fase."],
      dashboard: ["Dashboard de fretes", "Indicadores gerenciais, semáforo de filas e médias de tempo por fase."],
      report: ["Relatório de fretes", "Consulte e exporte os fretes entregues com SLA, transportadora, saving e dados principais."],
      mapa: ["Mapa de rotas", "Acompanhe coleta, entrega, rota e evolução operacional dos fretes."],
      cotacao: ["Mapa de cotações", "Compare transportadoras, condições comerciais e saving por frete."],
      history: ["Histórico operacional", "Consulte entradas, saídas e tempos registrados em cada etapa."],
      editor: ["Editor do formulário", "Configure perguntas, seções, tipos, opções e ordem do formulário de fretes."]
    };

    function updateSupplyFlowPage(id) {
      const meta = SUPPLY_FLOW_PAGE_META[id] || SUPPLY_FLOW_PAGE_META.form;
      const title = document.getElementById("sfPageTitle");
      const subtitle = document.getElementById("sfPageSubtitle");
      if (title) title.textContent = meta[0];
      if (subtitle) subtitle.textContent = meta[1];
    }

    function bindSupplyFlowSearch() {
      const input = document.getElementById("sfGlobalSearch");
      if (!input || input.dataset.bound === "1") return;
      input.dataset.bound = "1";
      input.addEventListener("input", () => {
        const search = document.getElementById("searchInput");
        if (search) search.value = input.value;
        showTab("kanban");
        renderKanban();
      });
    }

    function bindDashboardFilters() {
      ["dashboardSearch","dashboardPhase","dashboardUrgency","dashboardTraffic","dashboardObra","dashboardDateFrom","dashboardDateTo"].forEach(id => {
        const element = document.getElementById(id);
        if (!element || element.dataset.bound === "1") return;
        element.dataset.bound = "1";
        element.addEventListener(element.tagName === "INPUT" ? "input" : "change", renderDashboard);
      });
    }

    function populateDashboardFilters() {
      const select = document.getElementById("dashboardObra");
      if (!select) return;
      const current = select.value;
      const obras = [...new Set(freights.map(freight => freight.numeroObra || freight.obra || "Sem obra").filter(Boolean))]
        .sort((a,b) => String(a).localeCompare(String(b), "pt-BR", { numeric: true }));
      select.innerHTML = \`<option value="">Todas</option>\${obras.map(obra => \`<option value="\${escapeHtml(obra)}">\${escapeHtml(obra)}</option>\`).join("")}\`;
      if (obras.includes(current)) select.value = current;
    }

    function getDashboardFilteredFreights() {
      const search = (document.getElementById("dashboardSearch")?.value || "").trim().toLowerCase();
      const phase = document.getElementById("dashboardPhase")?.value || "";
      const urgency = document.getElementById("dashboardUrgency")?.value || "";
      const traffic = document.getElementById("dashboardTraffic")?.value || "";
      const obra = document.getElementById("dashboardObra")?.value || "";
      const dateFrom = document.getElementById("dashboardDateFrom")?.value || "";
      const dateTo = document.getElementById("dashboardDateTo")?.value || "";
      const fromTime = dateFrom ? new Date(\`\${dateFrom}T00:00:00\`).getTime() : null;
      const toTime = dateTo ? new Date(\`\${dateTo}T23:59:59\`).getTime() : null;

      return freights.filter(freight => {
        const haystack = [freight.id, freight.numeroRM, freight.numeroObra, freight.obra, freight.solicitante, freight.origem, freight.destino, freight.enderecoColeta, freight.enderecoEntrega, freight.linkGoogleMapsColeta, freight.linkGoogleMapsEntrega, freight.materiais, freight.transportadora, freight.fornecedorNome]
          .map(value => String(value || "").toLowerCase()).join(" ");
        const createdTime = new Date(freight.createdAt || 0).getTime();
        const freightObra = freight.numeroObra || freight.obra || "Sem obra";
        return (!search || haystack.includes(search))
          && (!phase || freight.status === phase)
          && (!urgency || getFreightUrgency(freight) === urgency)
          && (!traffic || getTrafficStatus(freight).key === traffic)
          && (!obra || freightObra === obra)
          && (fromTime === null || createdTime >= fromTime)
          && (toTime === null || createdTime <= toTime);
      });
    }

    function clearDashboardFilters() {
      ["dashboardSearch","dashboardPhase","dashboardUrgency","dashboardTraffic","dashboardObra","dashboardDateFrom","dashboardDateTo"].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
      });
      renderDashboard();
    }


    function deepClone(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function makeEditorKey(prefix, value) {
      const safe = String(value || "item").normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return \`\${prefix}:\${safe || Date.now()}:\${Math.random().toString(36).slice(2,7)}\`;
    }

    function captureDefaultFreightFormSchema() {
      const grid = document.querySelector("#freightForm .form-grid");
      if (!grid) return [];
      let sectionNumber = 0;
      return Array.from(grid.children).map((node) => {
        if (node.classList.contains("form-section-title")) {
          sectionNumber += 1;
          return {
            key: \`section:base-\${sectionNumber}\`,
            kind: "section",
            title: node.textContent.trim(),
            visible: true,
            custom: false
          };
        }
        const control = node.querySelector("input,select,textarea");
        if (!control || !control.id) return null;
        const label = (node.querySelector("label")?.textContent || control.id).replace(/\\s*\\*+\\s*$/, "").trim();
        const tag = control.tagName.toLowerCase();
        const type = tag === "textarea" ? "textarea" : tag === "select" ? "select" : (control.type || "text");
        const options = tag === "select" ? Array.from(control.options).map(option => ({ value: option.value, text: option.textContent })) : [];
        return {
          key: \`field:\${control.id}\`,
          kind: "field",
          id: control.id,
          label,
          type,
          placeholder: control.getAttribute("placeholder") || "",
          required: control.required,
          full: node.classList.contains("full"),
          visible: true,
          options,
          min: control.getAttribute("min") || "",
          step: control.getAttribute("step") || "",
          custom: false
        };
      }).filter(Boolean);
    }

    function loadFreightFormSchema() {
      try {
        const stored = JSON.parse(localStorage.getItem(FORM_EDITOR_STORAGE_KEY));
        return Array.isArray(stored) && stored.length ? stored : deepClone(defaultFreightFormSchema);
      } catch (error) {
        return deepClone(defaultFreightFormSchema);
      }
    }

    function saveFreightFormSchema(showStatus = true) {
      localStorage.setItem(FORM_EDITOR_STORAGE_KEY, JSON.stringify(freightFormSchema));
      if (showStatus) updateFormEditorStatus("Alterações salvas");
    }

    function initializeFreightFormEditor() {
      defaultFreightFormSchema = captureDefaultFreightFormSchema();
      freightFormSchema = loadFreightFormSchema();
      ensureUrgencyFieldInSchema();
      ensureInitialInformationAndSlaFieldsInSchema();
      ensureGoogleMapsLinkFieldsInSchema();
      ensureVehicleLogicFieldsInSchema();
      renderFreightFormFromSchema(false);
    }

    function ensureInitialInformationAndSlaFieldsInSchema() {
      let initialSectionIndex = freightFormSchema.findIndex(item => item.kind === "section" && /obras?\\s*\\/|departamento|informa.*iniciais/i.test(item.title || ""));
      if (initialSectionIndex < 0) {
        freightFormSchema.unshift({ key: "section:initial-info", kind: "section", title: "Informações iniciais", visible: true, custom: false });
        initialSectionIndex = 0;
      } else {
        freightFormSchema[initialSectionIndex].title = "Informações iniciais";
        freightFormSchema[initialSectionIndex].visible = true;
      }

      const initialTemplates = [
        {
          key: "field:numeroRM", kind: "field", id: "numeroRM", label: "Número da RM",
          type: "text", placeholder: "Ex.: 17901", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:numeroObra", kind: "field", id: "numeroObra", label: "Número da Obra / Departamento",
          type: "text", placeholder: "Ex.: 949", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:solicitante", kind: "field", id: "solicitante", label: "Solicitante",
          type: "text", placeholder: "Carregando usuário conectado...", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false, loginManaged: true
        },
        {
          key: "field:emailSolicitante", kind: "field", id: "emailSolicitante", label: "E-mail",
          type: "email", placeholder: "Carregando e-mail do usuário...", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false, loginManaged: true
        },
        {
          key: "field:telefoneSolicitante", kind: "field", id: "telefoneSolicitante", label: "Telefone do Solicitante",
          type: "tel", placeholder: "Ex.: 21980931551", required: false, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:urgencia", kind: "field", id: "urgencia", label: "Urgência",
          type: "select", placeholder: "", required: true, full: false, visible: true,
          options: [{ value: "NORMAL", text: "NORMAL" }, { value: "URGENTE", text: "URGENTE" }],
          min: "", step: "", custom: false
        },
        {
          key: "field:dataSolicitacao", kind: "field", id: "dataSolicitacao", label: "Data da solicitação",
          type: "date", placeholder: "", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:dataColetaMaterial", kind: "field", id: "dataColetaMaterial", label: "Data da Coleta do Material",
          type: "date", placeholder: "", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:horarioColeta", kind: "field", id: "horarioColeta", label: "Horário da coleta",
          type: "time", placeholder: "", required: true, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        }
      ];

      const controlledIds = new Set(initialTemplates.map(item => item.id));
      freightFormSchema = freightFormSchema.filter(item => !(item.kind === "field" && controlledIds.has(item.id)));
      initialSectionIndex = freightFormSchema.findIndex(item => item.kind === "section" && item.title === "Informações iniciais");
      freightFormSchema.splice(initialSectionIndex + 1, 0, ...initialTemplates.map(deepClone));
      saveFreightFormSchema(false);
    }

    function ensureGoogleMapsLinkFieldsInSchema() {
      const modeTemplates = [
        {
          key: "field:modoLocalColeta", kind: "field", id: "modoLocalColeta",
          label: "Como deseja informar o local de coleta?", type: "select", placeholder: "",
          required: true, full: true, visible: true,
          options: [
            { value: "", text: "Selecione" },
            { value: "ENDERECO", text: "Endereço" },
            { value: "LINK_MAPS", text: "Link do Maps" }
          ],
          min: "", step: "", custom: false
        },
        {
          key: "field:modoLocalEntrega", kind: "field", id: "modoLocalEntrega",
          label: "Como deseja informar o local de entrega?", type: "select", placeholder: "",
          required: true, full: true, visible: true,
          options: [
            { value: "", text: "Selecione" },
            { value: "ENDERECO", text: "Endereço" },
            { value: "LINK_MAPS", text: "Link do Maps" }
          ],
          min: "", step: "", custom: false
        }
      ];

      const linkTemplates = [
        {
          key: "field:linkGoogleMapsColeta", kind: "field", id: "linkGoogleMapsColeta",
          label: "Link do Google Maps — coleta", type: "url", placeholder: "Cole o link completo do local de coleta no Google Maps",
          required: false, full: true, visible: true, options: [], min: "", step: "", custom: false
        },
        {
          key: "field:linkGoogleMapsEntrega", kind: "field", id: "linkGoogleMapsEntrega",
          label: "Link do Google Maps — entrega", type: "url", placeholder: "Cole o link completo do local de entrega no Google Maps",
          required: false, full: true, visible: true, options: [], min: "", step: "", custom: false
        }
      ];

      const controlledIds = new Set([
        "modoLocalColeta", "modoLocalEntrega",
        "linkGoogleMapsColeta", "linkGoogleMapsEntrega"
      ]);
      freightFormSchema = freightFormSchema.filter(item => !(item.kind === "field" && controlledIds.has(item.id)));

      ["enderecoColeta", "cepColeta", "enderecoEntrega", "cepEntrega"].forEach(id => {
        const field = freightFormSchema.find(item => item.kind === "field" && item.id === id);
        if (field) field.required = false;
      });

      let collectionAddressIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "enderecoColeta");
      if (collectionAddressIndex < 0) collectionAddressIndex = freightFormSchema.length;
      freightFormSchema.splice(collectionAddressIndex, 0, deepClone(modeTemplates[0]));

      let collectionLinkIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "cepColeta");
      if (collectionLinkIndex < 0) collectionLinkIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "enderecoColeta");
      collectionLinkIndex = collectionLinkIndex >= 0 ? collectionLinkIndex + 1 : freightFormSchema.length;
      freightFormSchema.splice(collectionLinkIndex, 0, deepClone(linkTemplates[0]));

      let deliveryAddressIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "enderecoEntrega");
      if (deliveryAddressIndex < 0) deliveryAddressIndex = freightFormSchema.length;
      freightFormSchema.splice(deliveryAddressIndex, 0, deepClone(modeTemplates[1]));

      let deliveryLinkIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "cepEntrega");
      if (deliveryLinkIndex < 0) deliveryLinkIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "enderecoEntrega");
      deliveryLinkIndex = deliveryLinkIndex >= 0 ? deliveryLinkIndex + 1 : freightFormSchema.length;
      freightFormSchema.splice(deliveryLinkIndex, 0, deepClone(linkTemplates[1]));

      saveFreightFormSchema(false);
    }

    function ensureVehicleLogicFieldsInSchema() {
      const allImplementOptions = [...new Set(Object.values(VEHICLE_IMPLEMENT_OPTIONS).flat())];
      const templates = [
        {
          key: "field:tipoVeiculo", kind: "field", id: "tipoVeiculo", label: "Tipo de veículo",
          type: "select", placeholder: "", required: true, full: false, visible: true,
          options: [{ value: "", text: "Selecione" }, ...VEHICLE_TYPES.map(value => ({ value, text: value }))],
          min: "", step: "", custom: false
        },
        {
          key: "field:implemento", kind: "field", id: "implemento", label: "Implemento",
          type: "select", placeholder: "", required: false, full: false, visible: true,
          options: [{ value: "", text: "Selecione" }, ...allImplementOptions.map(value => ({ value, text: value }))],
          min: "", step: "", custom: false
        },
        {
          key: "field:capacidadePrancha", kind: "field", id: "capacidadePrancha", label: "Capacidade da prancha (peso)",
          type: "text", placeholder: "Ex.: 30 toneladas", required: false, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:tamanhoPrancha", kind: "field", id: "tamanhoPrancha", label: "Comprimento / tamanho da prancha",
          type: "text", placeholder: "Ex.: 12 metros", required: false, full: false, visible: true,
          options: [], min: "", step: "", custom: false
        },
        {
          key: "field:tracaoVeiculo", kind: "field", id: "tracaoVeiculo", label: "Tração do veículo",
          type: "select", placeholder: "", required: false, full: false, visible: true,
          options: [
            { value: "", text: "Selecione" },
            { value: "Não se aplica", text: "Não se aplica" },
            { value: "Convencional (4x2 / 6x2)", text: "Convencional (4x2 / 6x2)" },
            { value: "Traçado (6x4)", text: "Traçado (6x4)" }
          ],
          min: "", step: "", custom: false
        },
        {
          key: "field:observacoesVeiculoOperacao", kind: "field", id: "observacoesVeiculoOperacao", label: "Observações sobre o veículo / operação",
          type: "textarea", placeholder: "Ex.: acesso fora de estrada, restrição de altura, enlonamento, suspensão a ar ou equipamento específico.",
          required: false, full: true, visible: true, options: [], min: "", step: "", custom: false
        }
      ];

      const templateIds = new Set(templates.map(item => item.id));
      freightFormSchema = freightFormSchema.filter(item => !(item.kind === "field" && templateIds.has(item.id)));

      const infoSectionIndex = freightFormSchema.findIndex(item => item.kind === "section" && /informa.*frete/i.test(item.title || ""));
      let vehicleInsertIndex = infoSectionIndex >= 0 ? infoSectionIndex + 1 : freightFormSchema.length;
      freightFormSchema.splice(vehicleInsertIndex, 0, ...templates.map(deepClone));
      saveFreightFormSchema(false);
    }

    function ensureUrgencyFieldInSchema() {
      if (freightFormSchema.some(item => item.kind === "field" && item.id === "urgencia")) return;
      const urgencyField = defaultFreightFormSchema.find(item => item.kind === "field" && item.id === "urgencia") || {
        key: "field:urgencia",
        kind: "field",
        id: "urgencia",
        label: "Urgência",
        type: "select",
        placeholder: "",
        required: true,
        full: false,
        visible: true,
        options: [{ value: "NORMAL", text: "NORMAL" }, { value: "URGENTE", text: "URGENTE" }],
        min: "",
        step: "",
        custom: false
      };
      const vehicleIndex = freightFormSchema.findIndex(item => item.kind === "field" && item.id === "tipoVeiculo");
      freightFormSchema.splice(vehicleIndex >= 0 ? vehicleIndex + 1 : freightFormSchema.length, 0, deepClone(urgencyField));
      saveFreightFormSchema(false);
    }

    function normalizeVehicleTypeValue(rawValue) {
      const raw = String(rawValue || "").trim();
      if (!raw) return "";
      if (VEHICLE_TYPES.includes(raw)) return raw;
      const normalized = raw.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toUpperCase();
      if (normalized.includes("UTILIT")) return "Utilitário";
      if (normalized === "VUC" || normalized.includes("VEICULO URBANO")) return "VUC";
      if (normalized.includes("3/4") || normalized.includes("3X4") || normalized.includes("TRES QUARTOS")) return "Caminhão 3/4";
      if (normalized.includes("BITRUCK")) return "Bitruck";
      if (normalized.includes("TRUCK")) return "Truck";
      if (normalized.includes("TOCO")) return "Toco";
      if (normalized.includes("MUNCK") || normalized.includes("MUNK")) return "Munck";
      if (normalized.includes("PRANCHA")) return "Prancha";
      if (normalized.includes("CARRETA")) return "Carreta";
      return raw;
    }

    function setVehicleDynamicFieldState(fieldId, visible, required, clearWhenHidden = true) {
      const control = document.getElementById(fieldId);
      if (!control) return;
      const wrapper = control.closest("[data-form-key]") || control.parentElement;
      if (wrapper) {
        wrapper.classList.toggle("vehicle-dynamic-hidden", !visible);
        wrapper.classList.toggle("vehicle-dynamic-required", visible && required);
      }
      control.disabled = !visible;
      control.required = Boolean(visible && required);
      if (!visible && clearWhenHidden) control.value = "";
    }

    function updateVehicleFormFields(preserveValues = false) {
      const typeControl = document.getElementById("tipoVeiculo");
      if (!typeControl) return;

      const selectedType = normalizeVehicleTypeValue(typeControl.value);
      if (selectedType !== typeControl.value && VEHICLE_TYPES.includes(selectedType)) typeControl.value = selectedType;

      const implementControl = document.getElementById("implemento");
      const previousImplement = implementControl?.value || "";
      const isPrancha = selectedType === "Prancha";
      const hasVehicleType = VEHICLE_TYPES.includes(selectedType);
      const implementOptions = VEHICLE_IMPLEMENT_OPTIONS[selectedType] || [];

      if (implementControl) {
        implementControl.innerHTML = '<option value="">Selecione</option>' + implementOptions
          .map(option => \`<option value="\${escapeHtml(option)}">\${escapeHtml(option)}</option>\`).join("");

        if (preserveValues && implementOptions.includes(previousImplement)) implementControl.value = previousImplement;
        else if (implementOptions.length === 1 && implementOptions[0] === "Não se aplica") implementControl.value = "Não se aplica";
        else implementControl.value = "";
      }

      setVehicleDynamicFieldState("implemento", hasVehicleType && !isPrancha, hasVehicleType && !isPrancha, false);
      setVehicleDynamicFieldState("capacidadePrancha", isPrancha, isPrancha, !preserveValues);
      setVehicleDynamicFieldState("tamanhoPrancha", isPrancha, isPrancha, !preserveValues);
      setVehicleDynamicFieldState("tracaoVeiculo", VEHICLE_TRACTION_TYPES.has(selectedType), VEHICLE_TRACTION_TYPES.has(selectedType), !preserveValues);
    }

    function setupVehicleFormLogic(preserveValues = true) {
      const typeControl = document.getElementById("tipoVeiculo");
      if (!typeControl) return;
      if (typeControl.dataset.vehicleLogicBound !== "1") {
        typeControl.dataset.vehicleLogicBound = "1";
        typeControl.addEventListener("change", () => updateVehicleFormFields(false));
      }
      updateVehicleFormFields(preserveValues);
    }

    function currentFreightFormValues() {
      const values = {};
      freightFormSchema.filter(item => item.kind === "field").forEach(item => {
        const element = document.getElementById(item.id);
        if (element) values[item.id] = element.value;
      });
      return values;
    }

    function normalizedEditorOptions(item) {
      return (item.options || []).map(option => typeof option === "string" ? { value: option, text: option } : { value: String(option.value ?? option.text ?? ""), text: String(option.text ?? option.value ?? "") });
    }

    function freightFormControlHtml(item) {
      const required = item.required ? " required" : "";
      const placeholder = item.placeholder ? \` placeholder="\${escapeHtml(item.placeholder)}"\` : "";
      const min = item.min !== undefined && item.min !== "" ? \` min="\${escapeHtml(item.min)}"\` : "";
      const step = item.step !== undefined && item.step !== "" ? \` step="\${escapeHtml(item.step)}"\` : "";
      if (item.type === "textarea") return \`<textarea id="\${escapeHtml(item.id)}"\${required}\${placeholder}></textarea>\`;
      if (item.type === "select") {
        return \`<select id="\${escapeHtml(item.id)}"\${required}>\${normalizedEditorOptions(item).map(option => \`<option value="\${escapeHtml(option.value)}">\${escapeHtml(option.text)}</option>\`).join("")}</select>\`;
      }
      const safeType = ["text","number","date","time","datetime-local","email","tel","url"].includes(item.type) ? item.type : "text";
      const loginManaged = item.id === "solicitante" || item.id === "emailSolicitante";
      const readonly = item.id === "dataSolicitacao" || loginManaged ? " readonly aria-readonly=\\"true\\"" : "";
      const className = loginManaged ? " class=\\"login-fixed-field\\"" : "";
      const autocomplete = loginManaged ? " autocomplete=\\"off\\"" : "";
      return \`<input id="\${escapeHtml(item.id)}" type="\${safeType}"\${required}\${placeholder}\${min}\${step}\${readonly}\${className}\${autocomplete} />\`;
    }

    function renderFreightFormFromSchema(preserveValues = true) {
      const grid = document.querySelector("#freightForm .form-grid");
      if (!grid) return;
      const values = preserveValues ? currentFreightFormValues() : {};
      grid.innerHTML = freightFormSchema.filter(item => item.visible !== false).map(item => {
        if (item.kind === "section") return \`<div class="form-section-title" data-form-key="\${escapeHtml(item.key)}">\${escapeHtml(item.title || "Nova seção")}</div>\`;
        const wrapperClasses = [];
        if (item.full) wrapperClasses.push("full");
        if (item.id === "solicitante" || item.id === "emailSolicitante") wrapperClasses.push("logged-user-field");
        const classAttr = wrapperClasses.length ? \` class="\${wrapperClasses.join(" ")}"\` : "";
        const identityHint = item.id === "emailSolicitante"
          ? '<div id="loggedUserHint" class="full logged-user-hint">Identificando automaticamente o nome e o e-mail do usuário conectado no aplicativo principal.</div>'
          : "";
        return \`<div\${classAttr} data-form-key="\${escapeHtml(item.key)}"><label>\${escapeHtml(item.label || "Campo")}\${item.required ? " *" : ""}</label>\${freightFormControlHtml(item)}</div>\${identityHint}\`;
      }).join("");
      Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.value = value;
      });
      setupObservationsLimit();
      setupVehicleFormLogic(true);
      setupInitialDateUrgencyLogic(preserveValues);
      setupGoogleMapsLinkFields();
      setupLocationInputModes(preserveValues);
      setupFreightAddressAutocomplete();
      setupLoggedRequesterFromHost(false);
    }

    function editorTypeOptions(selected) {
      const types = [["text","Texto"],["number","Número"],["date","Data"],["time","Hora"],["datetime-local","Data e hora"],["email","E-mail"],["tel","Telefone"],["url","Link / URL"],["select","Lista suspensa"],["textarea","Texto longo"]];
      return types.map(([value,label]) => \`<option value="\${value}" \${selected === value ? "selected" : ""}>\${label}</option>\`).join("");
    }

    function renderFreightFormEditor() {
      const list = document.getElementById("freightFormEditorList");
      if (!list) return;
      populateFormEditorSectionSelect();
      if (!freightFormSchema.length) {
        list.innerHTML = '<div class="form-editor-empty">Nenhuma seção ou campo configurado.</div>';
        return;
      }
      list.innerHTML = freightFormSchema.map((item, index) => {
        if (item.kind === "section") {
          return \`<article class="form-editor-item section-item" data-editor-key="\${escapeHtml(item.key)}">
            <div class="form-editor-order">S\${index + 1}</div>
            <div class="form-editor-content"><div class="form-editor-main-grid section-grid"><label>TÍTULO DA SEÇÃO<input data-editor-prop="title" value="\${escapeHtml(item.title || "")}"></label></div><div class="form-editor-checks"><label><input type="checkbox" data-editor-prop="visible" \${item.visible !== false ? "checked" : ""}> Exibir seção</label></div></div>
            \${editorItemActionHtml(index)}
          </article>\`;
        }
        const optionText = normalizedEditorOptions(item).map(option => option.text).join("\\n");
        return \`<article class="form-editor-item \${item.type === "select" ? "is-select" : ""}" data-editor-key="\${escapeHtml(item.key)}">
          <div class="form-editor-order">\${index + 1}</div>
          <div class="form-editor-content">
            <div class="form-editor-main-grid">
              <label>PERGUNTA<input data-editor-prop="label" value="\${escapeHtml(item.label || "")}"></label>
              <label>TIPO<select data-editor-prop="type">\${editorTypeOptions(item.type)}</select></label>
              <label>EXEMPLO / PLACEHOLDER<input data-editor-prop="placeholder" value="\${escapeHtml(item.placeholder || "")}"></label>
            </div>
            <label class="form-editor-options">OPÇÕES DA LISTA — UMA POR LINHA<textarea data-editor-prop="options">\${escapeHtml(optionText)}</textarea></label>
            <div class="form-editor-checks">
              <label><input type="checkbox" data-editor-prop="required" \${item.required ? "checked" : ""}> Obrigatório</label>
              <label><input type="checkbox" data-editor-prop="full" \${item.full ? "checked" : ""}> Largura total</label>
              <label><input type="checkbox" data-editor-prop="visible" \${item.visible !== false ? "checked" : ""}> Exibir campo</label>
              <span style="font-size:10px;color:#64748b">ID: \${escapeHtml(item.id)}</span>
            </div>
          </div>
          \${editorItemActionHtml(index)}
        </article>\`;
      }).join("");
      bindFreightFormEditorInputs();
    }

    function editorItemActionHtml(index) {
      return \`<div class="form-editor-item-actions">
        <button type="button" title="Mover para cima" onclick="moveFreightFormItem(\${index},-1)">↑</button>
        <button type="button" title="Mover para baixo" onclick="moveFreightFormItem(\${index},1)">↓</button>
        <button class="delete-editor-item" type="button" title="Excluir" onclick="deleteFreightFormItem(\${index})">Excluir</button>
      </div>\`;
    }

    function bindFreightFormEditorInputs() {
      const list = document.getElementById("freightFormEditorList");
      if (!list) return;
      list.querySelectorAll("[data-editor-prop]").forEach(element => {
        const handler = () => {
          const card = element.closest("[data-editor-key]");
          const item = freightFormSchema.find(entry => entry.key === card?.dataset.editorKey);
          if (!item) return;
          const prop = element.dataset.editorProp;
          if (prop === "required" || prop === "full" || prop === "visible") item[prop] = element.checked;
          else if (prop === "options") item.options = element.value.split(/\\n|,/).map(value => value.trim()).filter(Boolean).map(value => ({ value, text: value }));
          else item[prop] = element.value;
          saveFreightFormSchema();
          renderFreightFormFromSchema();
          if (prop === "type") renderFreightFormEditor();
        };
        element.addEventListener(element.tagName === "SELECT" || element.type === "checkbox" ? "change" : "input", handler);
      });
    }

    function populateFormEditorSectionSelect() {
      const select = document.getElementById("editorNewFieldSection");
      if (!select) return;
      const current = select.value;
      const sections = freightFormSchema.filter(item => item.kind === "section");
      select.innerHTML = '<option value="">Final do formulário</option>' + sections.map(section => \`<option value="\${escapeHtml(section.key)}">\${escapeHtml(section.title || "Seção")}</option>\`).join("");
      if (sections.some(section => section.key === current)) select.value = current;
    }

    function addFreightFormSection() {
      const input = document.getElementById("editorNewSectionTitle");
      const title = input?.value.trim();
      if (!title) { alert("Informe o título da nova seção."); return; }
      freightFormSchema.push({ key: makeEditorKey("section", title), kind: "section", title, visible: true, custom: true });
      input.value = "";
      saveFreightFormSchema();
      renderFreightFormFromSchema();
      renderFreightFormEditor();
    }

    function addFreightFormField() {
      const labelInput = document.getElementById("editorNewFieldLabel");
      const typeInput = document.getElementById("editorNewFieldType");
      const sectionInput = document.getElementById("editorNewFieldSection");
      const label = labelInput?.value.trim();
      if (!label) { alert("Informe o nome da pergunta."); return; }
      const type = typeInput?.value || "text";
      const id = \`custom_\${Date.now()}_\${Math.random().toString(36).slice(2,6)}\`;
      const item = { key: \`field:\${id}\`, kind: "field", id, label, type, placeholder: "", required: false, full: type === "textarea", visible: true, options: type === "select" ? [{value:"Selecione",text:"Selecione"}] : [], min: "", step: type === "number" ? "0.01" : "", custom: true };
      let insertAt = freightFormSchema.length;
      const sectionKey = sectionInput?.value || "";
      if (sectionKey) {
        const sectionIndex = freightFormSchema.findIndex(entry => entry.key === sectionKey);
        if (sectionIndex >= 0) {
          insertAt = sectionIndex + 1;
          while (insertAt < freightFormSchema.length && freightFormSchema[insertAt].kind !== "section") insertAt += 1;
        }
      }
      freightFormSchema.splice(insertAt, 0, item);
      labelInput.value = "";
      saveFreightFormSchema();
      renderFreightFormFromSchema();
      renderFreightFormEditor();
    }

    function moveFreightFormItem(index, direction) {
      const target = index + direction;
      if (target < 0 || target >= freightFormSchema.length) return;
      const [item] = freightFormSchema.splice(index, 1);
      freightFormSchema.splice(target, 0, item);
      saveFreightFormSchema();
      renderFreightFormFromSchema();
      renderFreightFormEditor();
    }

    function deleteFreightFormItem(index) {
      const item = freightFormSchema[index];
      if (!item) return;
      const name = item.kind === "section" ? item.title : item.label;
      if (!confirm(\`Excluir "\${name}" do formulário?\`)) return;
      freightFormSchema.splice(index, 1);
      saveFreightFormSchema();
      renderFreightFormFromSchema();
      renderFreightFormEditor();
    }

    function restoreDefaultFreightForm() {
      if (!confirm("Restaurar o formulário original e remover todas as personalizações?")) return;
      freightFormSchema = deepClone(defaultFreightFormSchema);
      saveFreightFormSchema();
      renderFreightFormFromSchema(false);
      renderFreightFormEditor();
      alert("Formulário padrão restaurado.");
    }

    function updateFormEditorStatus(message) {
      const status = document.getElementById("formEditorStatus");
      if (!status) return;
      status.textContent = message;
      clearTimeout(updateFormEditorStatus.timer);
      updateFormEditorStatus.timer = setTimeout(() => status.textContent = "Configuração salva", 1600);
    }

    function confirmFreightFormSaved() {
      saveFreightFormSchema(false);
      updateFormEditorStatus("Configuração salva agora");
    }

    function collectConfiguredFreightFormData() {
      const result = {};
      freightFormSchema.filter(item => item.kind === "field" && item.visible !== false).forEach(item => {
        result[item.id] = { label: item.label, value: value(item.id), type: item.type };
      });
      return result;
    }

    function collectCustomFreightFormData() {
      const result = {};
      freightFormSchema.filter(item => item.kind === "field" && item.custom && item.visible !== false).forEach(item => {
        result[item.id] = { label: item.label, value: value(item.id), type: item.type };
      });
      return result;
    }

    function loadFreights() {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (!Array.isArray(stored)) return [];

        const normalized = stored.map(normalizeLoadedFreight);
        const usedIds = new Set();

        normalized.forEach((freight, index) => {
          let id = normalizeFreightId(freight.id);
          const baseNumber = getFreightIdNumber(id) || index + 1;
          let candidateNumber = baseNumber;

          while (usedIds.has(\`FRT-\${String(candidateNumber).padStart(5, "0")}\`)) {
            candidateNumber += 1;
          }

          id = \`FRT-\${String(candidateNumber).padStart(5, "0")}\`;
          freight.id = id;
          usedIds.add(id);
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        return normalized;
      } catch {
        return [];
      }
    }

    function normalizeFreightId(id) {
      const raw = String(id || "").trim().toUpperCase();
      const match = raw.match(/^FRT-(?:\\d{4}-)?(\\d+)$/);
      if (!match) return raw;
      return \`FRT-\${String(Number(match[1])).padStart(5, "0")}\`;
    }

    function getFreightIdNumber(id) {
      const normalized = normalizeFreightId(id);
      const match = normalized.match(/^FRT-(\\d+)$/);
      return match ? Number(match[1]) : 0;
    }

    function normalizeLoadedFreight(freight) {
      const normalized = freight && typeof freight === "object" ? freight : {};
      const createdAt = normalized.createdAt || new Date().toISOString();
      normalized.id = normalizeFreightId(normalized.id);
      normalized.status = PHASES.includes(normalized.status) ? normalized.status : PHASES[0];
      normalized.urgencia = getFreightUrgency(normalized);
      normalized.prioridade = normalized.urgencia;
      normalized.formularioErrado = normalized.formularioErrado === true || String(normalized.formularioErrado).toLowerCase() === "true";
      normalized.tipoVeiculo = normalizeVehicleTypeValue(normalized.tipoVeiculo || normalized.veiculoEspecial || normalized.formData?.tipoVeiculo?.value || "");
      normalized.veiculoEspecial = normalized.tipoVeiculo;
      normalized.implemento = normalized.implemento || normalized.formData?.implemento?.value || "";
      normalized.capacidadePrancha = normalized.capacidadePrancha || normalized.formData?.capacidadePrancha?.value || "";
      normalized.tamanhoPrancha = normalized.tamanhoPrancha || normalized.formData?.tamanhoPrancha?.value || "";
      normalized.tracaoVeiculo = normalized.tracaoVeiculo || normalized.formData?.tracaoVeiculo?.value || "";
      normalized.observacoesVeiculoOperacao = normalized.observacoesVeiculoOperacao || normalized.formData?.observacoesVeiculoOperacao?.value || "";
      normalized.dataSolicitacao = String(normalized.dataSolicitacao || normalized.formData?.dataSolicitacao?.value || dateToInputValue(new Date(createdAt))).slice(0, 10);
      normalized.observacoes = String(normalized.observacoes || "").slice(0, 240);
      normalized.numeroOC = String(normalized.numeroOC || normalized.numeroOc || normalized.ordemCompra || "").trim().slice(0, 40);
      normalized.numeroCTE = String(normalized.numeroCTE || normalized.numeroCte || normalized.cte || "").trim().slice(0, 60);
      if (!Array.isArray(normalized.history) || !normalized.history.length) {
        normalized.history = [{ phase: normalized.status, enteredAt: createdAt, exitedAt: null }];
      }
      normalized.history = normalized.history.filter(entry => entry && entry.phase && entry.enteredAt).map(entry => ({
        phase: PHASES.includes(entry.phase) ? entry.phase : normalized.status,
        enteredAt: entry.enteredAt,
        exitedAt: entry.exitedAt || null
      }));
      return normalized;
    }

    function saveFreights() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freights));
    }

    function createFreight() {
      const now = new Date().toISOString();
      const isEditing = Boolean(editingFreightId);
      const existing = isEditing ? freights.find(item => item.id === editingFreightId) : null;

      if (isEditing && !existing) {
        cancelFreightEdit(false);
        alert("Não foi possível localizar a solicitação para edição.");
        return;
      }

      const selectedUrgency = value("urgencia") || "NORMAL";
      const requestDateValue = value("dataSolicitacao") || dateToInputValue(new Date());
      const minimumCollectionDate = getMinimumCollectionDateValue(selectedUrgency, requestDateValue);
      const selectedCollectionDate = value("dataColetaMaterial");
      if (!selectedCollectionDate || selectedCollectionDate < minimumCollectionDate) {
        const collectionControl = document.getElementById("dataColetaMaterial");
        if (collectionControl) {
          collectionControl.value = minimumCollectionDate;
          collectionControl.min = minimumCollectionDate;
          collectionControl.focus();
        }
        alert(\`A data da coleta deve ser a partir de \${formatDateOnlyPtBr(minimumCollectionDate)}, conforme o prazo de \${FREIGHT_REQUEST_SLA_DAYS[selectedUrgency]} dias úteis para \${selectedUrgency}.\`);
        return;
      }


      const collectionLocationMode = value("modoLocalColeta");
      const deliveryLocationMode = value("modoLocalEntrega");
      const collectionAddressValue = value("enderecoColeta");
      const collectionCepValue = value("cepColeta");
      const deliveryAddressValue = value("enderecoEntrega");
      const deliveryCepValue = value("cepEntrega");
      const collectionMapsLinkValue = value("linkGoogleMapsColeta");
      const deliveryMapsLinkValue = value("linkGoogleMapsEntrega");

      if (!collectionLocationMode) {
        alert("Escolha se o local de coleta será informado por Endereço ou Link do Maps.");
        document.getElementById("modoLocalColeta")?.focus();
        return;
      }
      if (collectionLocationMode === LOCATION_INPUT_MODES.ADDRESS && (!collectionAddressValue || !collectionCepValue)) {
        alert("Preencha obrigatoriamente o endereço e o CEP do local de coleta.");
        document.getElementById(!collectionAddressValue ? "enderecoColeta" : "cepColeta")?.focus();
        return;
      }
      if (collectionLocationMode === LOCATION_INPUT_MODES.MAPS && !collectionMapsLinkValue) {
        alert("Cole obrigatoriamente o link do Google Maps do local de coleta.");
        document.getElementById("linkGoogleMapsColeta")?.focus();
        return;
      }

      if (!deliveryLocationMode) {
        alert("Escolha se o local de entrega será informado por Endereço ou Link do Maps.");
        document.getElementById("modoLocalEntrega")?.focus();
        return;
      }
      if (deliveryLocationMode === LOCATION_INPUT_MODES.ADDRESS && (!deliveryAddressValue || !deliveryCepValue)) {
        alert("Preencha obrigatoriamente o endereço e o CEP do local de entrega.");
        document.getElementById(!deliveryAddressValue ? "enderecoEntrega" : "cepEntrega")?.focus();
        return;
      }
      if (deliveryLocationMode === LOCATION_INPUT_MODES.MAPS && !deliveryMapsLinkValue) {
        alert("Cole obrigatoriamente o link do Google Maps do local de entrega.");
        document.getElementById("linkGoogleMapsEntrega")?.focus();
        return;
      }

      if (collectionLocationMode === LOCATION_INPUT_MODES.MAPS && !isGoogleMapsLink(collectionMapsLinkValue)) {
        alert("O link informado para a coleta não é um link válido do Google Maps.");
        document.getElementById("linkGoogleMapsColeta")?.focus();
        return;
      }
      if (deliveryLocationMode === LOCATION_INPUT_MODES.MAPS && !isGoogleMapsLink(deliveryMapsLinkValue)) {
        alert("O link informado para a entrega não é um link válido do Google Maps.");
        document.getElementById("linkGoogleMapsEntrega")?.focus();
        return;
      }

      const formValues = {
        numeroRM: value("numeroRM"),
        dataSolicitacao: requestDateValue,
        numeroObra: value("numeroObra"),
        obra: "Obra/Depto " + value("numeroObra"),
        solicitante: value("solicitante"),
        telefoneSolicitante: value("telefoneSolicitante"),
        emailSolicitante: value("emailSolicitante"),
        tipoMovimentacao: value("tipoMovimentacao"),
        particularidadeObra: value("particularidadeObra"),
        modoLocalColeta: collectionLocationMode,
        enderecoColeta: collectionLocationMode === LOCATION_INPUT_MODES.ADDRESS ? collectionAddressValue : "",
        cepColeta: collectionLocationMode === LOCATION_INPUT_MODES.ADDRESS ? collectionCepValue : "",
        linkGoogleMapsColeta: collectionLocationMode === LOCATION_INPUT_MODES.MAPS ? collectionMapsLinkValue : "",
        modoLocalEntrega: deliveryLocationMode,
        enderecoEntrega: deliveryLocationMode === LOCATION_INPUT_MODES.ADDRESS ? deliveryAddressValue : "",
        cepEntrega: deliveryLocationMode === LOCATION_INPUT_MODES.ADDRESS ? deliveryCepValue : "",
        linkGoogleMapsEntrega: deliveryLocationMode === LOCATION_INPUT_MODES.MAPS ? deliveryMapsLinkValue : "",
        origem: collectionLocationMode === LOCATION_INPUT_MODES.ADDRESS ? collectionAddressValue : "",
        destino: deliveryLocationMode === LOCATION_INPUT_MODES.ADDRESS ? deliveryAddressValue : "",
        dataColetaMaterial: value("dataColetaMaterial"),
        horarioColeta: value("horarioColeta"),
        dataColetaDesejada: combineDateTime(value("dataColetaMaterial"), value("horarioColeta")),
        tipoVeiculo: normalizeVehicleTypeValue(value("tipoVeiculo")),
        implemento: value("implemento"),
        capacidadePrancha: value("capacidadePrancha"),
        tamanhoPrancha: value("tamanhoPrancha"),
        tracaoVeiculo: value("tracaoVeiculo"),
        observacoesVeiculoOperacao: value("observacoesVeiculoOperacao"),
        freteCompartilhado: value("freteCompartilhado"),
        operadorDescarga: value("operadorDescarga"),
        responsavelRecebimento: value("responsavelRecebimento"),
        ordemColeta: value("ordemColeta"),
        pedidoCompra: value("pedidoCompra"),
        notaFiscal: value("notaFiscal"),
        materiais: value("materiais"),
        dimensoesCarga: value("dimensoesCarga"),
        tipoMaterial: value("materiais").slice(0, 80) || "Carga geral",
        pesoTotalCarga: value("pesoTotalCarga"),
        peso: value("pesoTotalCarga"),
        valorTotalCarga: value("valorTotalCarga"),
        totalPecas: value("totalPecas"),
        volumes: value("totalPecas"),
        fornecedorNome: value("fornecedorNome"),
        fornecedorCnpj: value("fornecedorCnpj"),
        dataLimiteEntrega: value("dataLimiteEntrega"),
        responsavelSupply: value("responsavelSupply"),
        transportadora: value("transportadora"),
        emailTransportadora: value("emailTransportadora"),
        valorAprovado: value("valorAprovado"),
        dataColetaAgendada: combineDateTime(value("dataColetaMaterial"), value("horarioColeta")),
        observacoes: value("observacoes").slice(0, 240),
        urgencia: selectedUrgency,
        prioridade: selectedUrgency,
        tipoFrete: value("tipoMovimentacao"),
        centroCusto: value("numeroObra"),
        cubagem: existing?.cubagem || "",
        veiculoEspecial: normalizeVehicleTypeValue(value("tipoVeiculo")),
        formData: collectConfiguredFreightFormData(),
        customFields: collectCustomFreightFormData()
      };

      if (isEditing) {
        Object.assign(existing, formValues, { updatedAt: now });
        saveFreights();
        const editedId = existing.id;
        document.getElementById("freightForm").reset();
        cancelFreightEdit(false);
        alert("Solicitação atualizada com sucesso: " + editedId);
        renderAll();
        showTab("kanban");
        return;
      }

      const freight = {
        id: generateId(),
        createdAt: now,
        ...formValues,
        status: "Não iniciado",
        formularioErrado: false,
        observacoesResponsavel: "",
        history: [{ phase: "Não iniciado", enteredAt: now, exitedAt: null }]
      };

      freights.push(freight);
      saveFreights();

      document.getElementById("freightForm").reset();
      cancelFreightEdit(false);
      alert("Solicitação criada com sucesso: " + freight.id);
      renderAll();
    }

    function value(id) {
      const element = document.getElementById(id);
      return element ? element.value.trim() : "";
    }

    function setupObservationsLimit() {
      const textarea = document.getElementById("observacoes");
      if (!textarea) return;
      textarea.maxLength = 240;

      const parent = textarea.parentElement;
      if (parent) parent.classList.add("observations-limit-wrap");

      let counter = document.getElementById("observacoesCounter");
      if (!counter && parent) {
        counter = document.createElement("div");
        counter.id = "observacoesCounter";
        counter.className = "observations-counter";
        parent.appendChild(counter);
      }

      const updateCounter = () => {
        if (textarea.value.length > 240) textarea.value = textarea.value.slice(0, 240);
        if (!counter) return;
        const length = textarea.value.length;
        counter.textContent = \`\${length}/240 caracteres\`;
        counter.classList.toggle("near-limit", length >= 200 && length < 240);
        counter.classList.toggle("at-limit", length >= 240);
      };

      if (textarea.dataset.limitBound !== "1") {
        textarea.dataset.limitBound = "1";
        textarea.addEventListener("input", updateCounter);
      }
      updateCounter();
    }

    function getFreightFormValueMap(freight) {
      return {
        numeroRM: freight.numeroRM || "",
        dataSolicitacao: getFreightRequestDateValue(freight),
        numeroObra: freight.numeroObra || freight.centroCusto || "",
        solicitante: freight.solicitante || "",
        telefoneSolicitante: freight.telefoneSolicitante || "",
        emailSolicitante: freight.emailSolicitante || "",
        tipoMovimentacao: freight.tipoMovimentacao || freight.tipoFrete || "",
        particularidadeObra: freight.particularidadeObra || "",
        dataColetaMaterial: freight.dataColetaMaterial || "",
        horarioColeta: freight.horarioColeta || "",
        modoLocalColeta: freight.modoLocalColeta || ((freight.linkGoogleMapsColeta && !(freight.enderecoColeta || freight.origem)) ? "LINK_MAPS" : "ENDERECO"),
        enderecoColeta: freight.enderecoColeta || freight.origem || "",
        cepColeta: freight.cepColeta || "",
        linkGoogleMapsColeta: freight.linkGoogleMapsColeta || "",
        modoLocalEntrega: freight.modoLocalEntrega || ((freight.linkGoogleMapsEntrega && !(freight.enderecoEntrega || freight.destino)) ? "LINK_MAPS" : "ENDERECO"),
        enderecoEntrega: freight.enderecoEntrega || freight.destino || "",
        cepEntrega: freight.cepEntrega || "",
        linkGoogleMapsEntrega: freight.linkGoogleMapsEntrega || "",
        tipoVeiculo: normalizeVehicleTypeValue(freight.tipoVeiculo || freight.veiculoEspecial || ""),
        implemento: freight.implemento || freight.formData?.implemento?.value || "",
        capacidadePrancha: freight.capacidadePrancha || freight.formData?.capacidadePrancha?.value || "",
        tamanhoPrancha: freight.tamanhoPrancha || freight.formData?.tamanhoPrancha?.value || "",
        tracaoVeiculo: freight.tracaoVeiculo || freight.formData?.tracaoVeiculo?.value || "",
        observacoesVeiculoOperacao: freight.observacoesVeiculoOperacao || freight.formData?.observacoesVeiculoOperacao?.value || "",
        urgencia: getFreightUrgency(freight),
        freteCompartilhado: freight.freteCompartilhado || "NÃO",
        operadorDescarga: freight.operadorDescarga || "Não necessita",
        responsavelSupply: freight.responsavelSupply || "",
        responsavelRecebimento: freight.responsavelRecebimento || "",
        ordemColeta: freight.ordemColeta || "",
        pedidoCompra: freight.pedidoCompra || "",
        notaFiscal: freight.notaFiscal || "",
        pesoTotalCarga: freight.pesoTotalCarga || freight.peso || "",
        valorTotalCarga: freight.valorTotalCarga || "",
        totalPecas: freight.totalPecas || freight.volumes || "",
        dataLimiteEntrega: freight.dataLimiteEntrega || "",
        fornecedorNome: freight.fornecedorNome || "",
        fornecedorCnpj: freight.fornecedorCnpj || "",
        transportadora: freight.transportadora || "",
        emailTransportadora: freight.emailTransportadora || "",
        valorAprovado: freight.valorAprovado || "",
        materiais: freight.materiais || freight.tipoMaterial || "",
        dimensoesCarga: freight.dimensoesCarga || "",
        observacoes: String(freight.observacoes || "").slice(0, 240)
      };
    }

    function startFreightEdit(id) {
      const freight = freights.find(item => item.id === id);
      if (!freight) return;

      editingFreightId = id;
      showTab("form");
      const values = getFreightFormValueMap(freight);

      Object.values(freight.customFields || {}).forEach(field => {
        if (field && field.label) {
          const schemaField = freightFormSchema.find(item => item.kind === "field" && item.custom && item.label === field.label);
          if (schemaField) values[schemaField.id] = field.value || "";
        }
      });

      Object.entries(values).forEach(([fieldId, fieldValue]) => {
        const element = document.getElementById(fieldId);
        if (element) element.value = fieldValue ?? "";
      });

      const title = document.getElementById("freightFormTitle");
      const subtitle = document.getElementById("freightFormSubtitle");
      const banner = document.getElementById("freightEditBanner");
      const submit = document.getElementById("freightSubmitButton");
      const reset = document.getElementById("freightResetButton");
      if (title) title.textContent = \`Editar solicitação \${freight.id}\`;
      if (subtitle) subtitle.textContent = "Altere as informações necessárias e registre os erros encontrados no campo Observações.";
      if (banner) banner.classList.add("active");
      if (submit) submit.textContent = "Salvar alterações";
      if (reset) reset.textContent = "Cancelar edição";
      setupObservationsLimit();
      setupVehicleFormLogic(true);
      setupInitialDateUrgencyLogic(true);
      setupGoogleMapsLinkFields();
      setupLocationInputModes(true);
      applyRequesterIdentity({ name: freight.solicitante, email: freight.emailSolicitante }, true);
      document.getElementById("freightForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function cancelFreightEdit(clearForm = false) {
      editingFreightId = null;
      const title = document.getElementById("freightFormTitle");
      const subtitle = document.getElementById("freightFormSubtitle");
      const banner = document.getElementById("freightEditBanner");
      const submit = document.getElementById("freightSubmitButton");
      const reset = document.getElementById("freightResetButton");
      if (title) title.textContent = "Nova Solicitação de Frete";
      if (subtitle) subtitle.textContent = "Preencha os dados da RM, endereços, carga, documentação e fornecedor. Ao criar, o card entra no Kanban.";
      if (banner) banner.classList.remove("active");
      if (submit) submit.textContent = "Criar solicitação";
      if (reset) reset.textContent = "Limpar formulário";
      window.setTimeout(() => {
        setupInitialDateUrgencyLogic(false);
        setupLoggedRequesterFromHost(true);
      }, 0);
      if (clearForm) document.getElementById("freightForm")?.reset();
    }

    function toggleFreightFormError(id, isWrong, cardElement = null) {
      const freight = freights.find(item => item.id === id);
      if (!freight) return;
      freight.formularioErrado = Boolean(isWrong);
      freight.formularioErradoAtualizadoEm = new Date().toISOString();
      saveFreights();
      if (cardElement) cardElement.classList.toggle("form-error", freight.formularioErrado);
      if (document.getElementById("dashboard")?.classList.contains("active")) renderDashboard();
    }

    function combineDateTime(dateValue, timeValue) {
      if (!dateValue) return "";
      return \`\${dateValue}T\${timeValue || "00:00"}\`;
    }

    function generateId() {
      const existingNumbers = freights
        .map(item => getFreightIdNumber(item.id))
        .filter(number => Number.isFinite(number) && number > 0);
      const nextNumber = existingNumbers.length ? Math.max(...existingNumbers) + 1 : 1;
      return \`FRT-\${String(nextNumber).padStart(5, "0")}\`;
    }

    function getFreightUrgency(freight) {
      const raw = freight?.urgencia || freight?.prioridade || freight?.formData?.urgencia?.value || "NORMAL";
      const normalized = String(raw).normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toUpperCase();
      return normalized.includes("URGENT") ? "URGENTE" : "NORMAL";
    }

    function getFreightAttendanceDeadline(freight) {
      const collectionDate = parseLocalDateInput(freight?.dataColetaMaterial);
      if (collectionDate) {
        const deadline = new Date(collectionDate);
        deadline.setHours(BUSINESS_DAY_END_HOUR, 0, 0, 0);
        return deadline;
      }
      const fallback = new Date(freight?.dataLimiteEntrega || "");
      return Number.isNaN(fallback.getTime()) ? null : fallback;
    }

    function getFreightAttendanceDeadlineValue(freight) {
      const deadline = getFreightAttendanceDeadline(freight);
      return deadline ? deadline.getTime() : Number.POSITIVE_INFINITY;
    }

    function getTrafficStatus(freight) {
      if (freight.status === "Cancelados") {
        return { key: "gray", label: "Cancelado", priority: 6 };
      }
      if (freight.status === "Entregue") {
        return { key: "green", label: "Entregue", priority: 5 };
      }

      const deadline = getFreightAttendanceDeadline(freight);
      if (!deadline) {
        return { key: "yellow", label: "Sem prazo definido", priority: 4 };
      }
      const now = new Date();
      const diffMs = deadline - now;
      const diffHours = diffMs / 1000 / 60 / 60;

      if (diffMs <= 0) return { key: "red", label: "Vencido", priority: 1 };
      if (diffHours <= 24) return { key: "yellow", label: "Em alerta", priority: 2 };
      return { key: "green", label: "No prazo", priority: 3 };
    }

    const BUSINESS_DAY_START_HOUR = 7;
    const BUSINESS_DAY_END_HOUR = 17;
    const BUSINESS_DAY_MS = (BUSINESS_DAY_END_HOUR - BUSINESS_DAY_START_HOUR) * 60 * 60 * 1000;

    function isBusinessDay(date) {
      const day = date.getDay();
      return day >= 1 && day <= 5;
    }

    function getBusinessDurationMs(startValue, endValue) {
      const start = new Date(startValue);
      const end = new Date(endValue);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return 0;

      let total = 0;
      const cursor = new Date(start);
      cursor.setHours(0, 0, 0, 0);
      const lastDay = new Date(end);
      lastDay.setHours(0, 0, 0, 0);

      while (cursor <= lastDay) {
        if (isBusinessDay(cursor)) {
          const dayStart = new Date(cursor);
          dayStart.setHours(BUSINESS_DAY_START_HOUR, 0, 0, 0);
          const dayEnd = new Date(cursor);
          dayEnd.setHours(BUSINESS_DAY_END_HOUR, 0, 0, 0);

          const effectiveStart = start > dayStart ? start : dayStart;
          const effectiveEnd = end < dayEnd ? end : dayEnd;
          if (effectiveEnd > effectiveStart) total += effectiveEnd - effectiveStart;
        }
        cursor.setDate(cursor.getDate() + 1);
      }

      return total;
    }

    function getSignedBusinessDurationMs(startValue, endValue) {
      const start = new Date(startValue);
      const end = new Date(endValue);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
      return end >= start
        ? getBusinessDurationMs(start, end)
        : -getBusinessDurationMs(end, start);
    }

    function getRemainingTime(freight) {
      if (freight.status === "Entregue") return "Processo concluído";
      if (freight.status === "Cancelados") return "Processo cancelado";
      const deadline = getFreightAttendanceDeadline(freight);
      if (!deadline) return "Sem prazo definido";
      return formatBusinessTimerDuration(getSignedBusinessDurationMs(new Date(), deadline), true);
    }

    function getAccumulatedPhaseMs(freight, phase, now = new Date()) {
      const entries = Array.isArray(freight?.history) ? freight.history : [];
      return entries.reduce((sum, entry) => {
        if (entry.phase !== phase || !entry.enteredAt) return sum;
        const start = new Date(entry.enteredAt);
        if (Number.isNaN(start.getTime())) return sum;
        let end;
        if (entry.exitedAt) end = new Date(entry.exitedAt);
        else if (FINAL_PHASES.includes(entry.phase)) end = start;
        else end = now;
        return sum + getBusinessDurationMs(start, end);
      }, 0);
    }

    function getCurrentPhaseTime(freight) {
      return formatBusinessTimerDuration(getAccumulatedPhaseMs(freight, freight.status), false);
    }

    function getCurrentPhaseMs(freight) {
      return getAccumulatedPhaseMs(freight, freight.status);
    }

    function getTotalProcessMs(freight, now = new Date()) {
      const entries = Array.isArray(freight?.history) ? freight.history : [];
      if (!entries.length) {
        const start = new Date(freight?.createdAt || 0);
        return Number.isNaN(start.getTime()) || FINAL_PHASES.includes(freight?.status)
          ? 0
          : getBusinessDurationMs(start, now);
      }
      return entries.reduce((sum, entry) => {
        if (!entry.enteredAt || FINAL_PHASES.includes(entry.phase)) return sum;
        const start = new Date(entry.enteredAt);
        if (Number.isNaN(start.getTime())) return sum;
        const end = entry.exitedAt ? new Date(entry.exitedAt) : now;
        return sum + getBusinessDurationMs(start, end);
      }, 0);
    }

    function getTotalProcessTime(freight) {
      return formatBusinessTimerDuration(getTotalProcessMs(freight), false);
    }

    function formatBusinessTimerDuration(ms, allowNegative = false) {
      const negative = ms < 0;
      const abs = Math.abs(Number(ms) || 0);
      const totalSeconds = Math.floor(abs / 1000);
      const businessDaySeconds = BUSINESS_DAY_MS / 1000;
      const days = Math.floor(totalSeconds / businessDaySeconds);
      const remainingSeconds = totalSeconds % businessDaySeconds;
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;
      const text = \`\${days}d \${String(hours).padStart(2, "0")}h \${String(minutes).padStart(2, "0")}m \${String(seconds).padStart(2, "0")}s\`;
      if (negative && allowNegative) return \`vencido há \${text}\`;
      return text;
    }

    function formatTimerDuration(ms, allowNegative = false) {
      const negative = ms < 0;
      const abs = Math.abs(Number(ms) || 0);
      const totalSeconds = Math.floor(abs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const text = \`\${days}d \${String(hours).padStart(2, "0")}h \${String(minutes).padStart(2, "0")}m \${String(seconds).padStart(2, "0")}s\`;
      if (negative && allowNegative) return \`vencido há \${text}\`;
      return text;
    }

    function formatDuration(ms, allowNegative) {
      const negative = ms < 0;
      const abs = Math.abs(Number(ms) || 0);
      const totalMinutes = Math.floor(abs / 1000 / 60);
      const businessDayMinutes = (BUSINESS_DAY_END_HOUR - BUSINESS_DAY_START_HOUR) * 60;
      const days = Math.floor(totalMinutes / businessDayMinutes);
      const remainingMinutes = totalMinutes % businessDayMinutes;
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      const text = \`\${days}d \${hours}h \${minutes}min\`;
      if (negative && allowNegative) return \`vencido há \${text}\`;
      return text;
    }

    function formatDate(dateValue) {
      if (!dateValue) return "-";
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return "-";
      return date.toLocaleString("pt-BR");
    }

    function renderAll() {
      try { populateObraFilter(); } catch (error) { console.error("Erro filtro obra:", error); }
      try { renderKanban(); } catch (error) { console.error("Erro Kanban:", error); }
      try { renderDashboard(); } catch (error) { console.error("Erro Dashboard:", error); }
      try { renderFreightReport(); } catch (error) { console.error("Erro Relatório:", error); }
      try { renderHistory(); } catch (error) { console.error("Erro Histórico:", error); }
      try { renderMap(); } catch (error) { console.error("Erro Mapa:", error); }
      try { renderQuotes(); } catch (error) { console.error("Erro Mapa de Cotações:", error); }
    }

    function getFilteredFreights() {
      const search = document.getElementById("searchInput")?.value?.toLowerCase() || "";
      const semaforo = document.getElementById("semaforoFilter")?.value || "";
      const obra = document.getElementById("obraFilter")?.value || "";

      return freights.filter(freight => {
        const traffic = getTrafficStatus(freight);

        const searchMatch = !search ||
          (freight.id || "").toLowerCase().includes(search) ||
          (freight.numeroRM || "").toLowerCase().includes(search) ||
          (freight.numeroObra || "").toLowerCase().includes(search) ||
          (freight.obra || "").toLowerCase().includes(search) ||
          (freight.origem || "").toLowerCase().includes(search) ||
          (freight.destino || "").toLowerCase().includes(search) ||
          (freight.enderecoColeta || "").toLowerCase().includes(search) ||
          (freight.enderecoEntrega || "").toLowerCase().includes(search) ||
          (freight.tipoMaterial || "").toLowerCase().includes(search) ||
          (freight.materiais || "").toLowerCase().includes(search);

        const semaforoMatch = !semaforo || traffic.key === semaforo;
        const obraMatch = !obra || (freight.numeroObra || freight.obra) === obra;

        return searchMatch && semaforoMatch && obraMatch;
      });
    }

    function sortFreights(list) {
      const mode = document.getElementById("sortMode")?.value || "deadline";

      return [...list].sort((a, b) => {
        const trafficA = getTrafficStatus(a);
        const trafficB = getTrafficStatus(b);

        if (mode === "deadline") {
          if (trafficA.priority !== trafficB.priority) {
            return trafficA.priority - trafficB.priority;
          }

          return getFreightAttendanceDeadlineValue(a) - getFreightAttendanceDeadlineValue(b);
        }

        if (mode === "phaseTime") {
          return getCurrentPhaseMs(b) - getCurrentPhaseMs(a);
        }

        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    function getCurrentStageVisitMs(freight, now = new Date()) {
      if (!freight || FINAL_PHASES.includes(freight.status)) return 0;
      const entries = Array.isArray(freight.history) ? freight.history : [];
      const currentEntry = [...entries].reverse().find(entry =>
        entry.phase === freight.status && entry.enteredAt && !entry.exitedAt
      );
      const startValue = currentEntry?.enteredAt || freight.createdAt;
      const start = new Date(startValue || 0);
      if (Number.isNaN(start.getTime())) return 0;
      return Math.max(0, now - start);
    }

    function getPhaseAverageMs(items, phase) {
      const durations = items
        .map(freight => getAccumulatedPhaseMs(freight, phase))
        .filter(duration => Number.isFinite(duration) && duration > 0);
      if (!durations.length) return 0;
      return durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
    }

    function getFreightPhaseMeta(phase) {
      return {
        "Não iniciado": { icon: "📥", subtitle: "Solicitação recebida" },
        "Em cotação": { icon: "💬", subtitle: "Cotação em andamento" },
        "Aguardando Validação da Obra": { icon: "⏳", subtitle: "Validação da obra" },
        "Coleta Agendada": { icon: "📅", subtitle: "Coleta programada" },
        "Em transporte": { icon: "🚚", subtitle: "Carga em deslocamento" },
        "Entregue": { icon: "📦", subtitle: "Entrega concluída" },
        "Cancelados": { icon: "⛔", subtitle: "Solicitação encerrada" }
      }[phase] || { icon: "•", subtitle: "Etapa operacional" };
    }

    function renderKanban() {
      const board = document.getElementById("kanbanBoard");
      if (!board) return;

      const filtered = getFilteredFreights();
      board.innerHTML = "";

      PHASES.forEach(phase => {
        const columnFreights = sortFreights(filtered.filter(freight => freight.status === phase));
        const phaseMeta = getFreightPhaseMeta(phase);
        const phaseAverage = getPhaseAverageMs(columnFreights, phase);
        const totalOpen = FINAL_PHASES.includes(phase) ? 0 : columnFreights.length;
        const column = document.createElement("div");
        column.className = "column freight-stage-column";
        column.dataset.phase = phase;

        column.innerHTML = \`
          <div class="column-header freight-stage-header">
            <div class="column-icon">\${phaseMeta.icon}</div>
            <div class="column-copy">
              <h3>\${escapeHtml(phase)}</h3>
              <p>\${escapeHtml(phaseMeta.subtitle)}</p>
            </div>
            <span class="count">\${columnFreights.length}</span>
          </div>

          <div class="freight-stage-summary">
            <div class="freight-stage-summary-row">
              <span>Fila</span>
              <strong class="freight-queue-lights"><i class="queue-red"></i><b>→</b><i class="queue-yellow"></i><b>→</b><i class="queue-green"></i></strong>
            </div>
            <div class="freight-stage-summary-row">
              <span>Tempo médio dos cards</span>
              <strong data-phase-average>\${phaseAverage ? formatTimerDuration(phaseAverage, false) : "0d 00h 00m 00s"}</strong>
            </div>
            <div class="freight-stage-summary-row">
              <span>Total em aberto</span>
              <strong>\${totalOpen}</strong>
            </div>
          </div>

          <div class="freight-stage-cards"></div>
        \`;

        const cardsContainer = column.querySelector(".freight-stage-cards");
        if (!columnFreights.length) {
          cardsContainer.innerHTML = \`<div class="empty">Nenhuma solicitação nesta fase.</div>\`;
        } else {
          columnFreights.forEach(freight => cardsContainer.appendChild(createFreightCard(freight)));
        }

        board.appendChild(column);
      });
    }

    function updateKanbanLiveValues() {
      const board = document.getElementById("kanbanBoard");
      if (!board) return;

      board.querySelectorAll(".freight-card[data-freight-id]").forEach(card => {
        const freight = freights.find(item => String(item.id) === String(card.dataset.freightId));
        if (!freight) return;

        const visit = card.querySelector('[data-live="visit"]');
        const phase = card.querySelector('[data-live="phase"]');
        const total = card.querySelector('[data-live="total"]');
        if (visit) visit.textContent = formatTimerDuration(getCurrentStageVisitMs(freight), false);
        if (phase) phase.textContent = getCurrentPhaseTime(freight);
        if (total) total.textContent = getTotalProcessTime(freight);

        const traffic = getTrafficStatus(freight);
        const trafficBadge = card.querySelector('[data-live="traffic"]');
        const status = card.querySelector('[data-live="status"]');
        if (trafficBadge) {
          trafficBadge.innerHTML = \`\${freightCardIcon("clock")}\${escapeHtml(traffic.label)}\`;
          trafficBadge.className = \`freight-mini-badge traffic-\${traffic.key}\`;
          trafficBadge.dataset.live = "traffic";
        }
        if (status) {
          const liveStatusText = traffic.key === "red" ? "Atrasado" : traffic.key === "yellow" ? "Em alerta" : traffic.key === "green" ? "No prazo" : "Encerrado";
          status.innerHTML = \`\${freightCardIcon(traffic.key === "green" ? "check" : "alert")}\${liveStatusText}\`;
          status.className = \`meta-status \${traffic.key}\`;
          status.dataset.live = "status";
        }
      });

      board.querySelectorAll(".freight-stage-column[data-phase]").forEach(column => {
        const phaseName = column.dataset.phase;
        const phaseFreights = getFilteredFreights().filter(freight => freight.status === phaseName);
        const average = getPhaseAverageMs(phaseFreights, phaseName);
        const averageNode = column.querySelector("[data-phase-average]");
        if (averageNode) averageNode.textContent = average ? formatTimerDuration(average, false) : "0d 00h 00m 00s";
      });
    }


    function freightCardIcon(name) {
      const icons = {
        building: '<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9h.01M9 13h.01M9 17h.01M16 15h.01M16 18h.01"/>',
        clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/>',
        truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
        user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
        file: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
        alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 9v4M12 17h.01"/>',
        check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
        phase: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
        calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        timer: '<path d="M9 2h6M12 6a8 8 0 1 0 8 8"/><path d="M12 10v4l3 2M17 5l2 2"/>',
        mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
        eye: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
        edit: '<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
        note: '<path d="M4 4h16v13H8l-4 4z"/><path d="M8 9h8M8 13h6"/>',
        save: '<path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 17h8"/>',
        route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M7.5 16.5 16.5 7.5M9 6H5v4"/>'
      };
      return \`<svg class="freight-ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">\${icons[name] || icons.file}</svg>\`;
    }

    function createFreightCard(freight) {
      const traffic = getTrafficStatus(freight);
      const card = document.createElement("article");
      const phaseIndex = Math.max(0, PHASES.indexOf(freight.status));
      const maxOperationalIndex = Math.max(1, PHASES.indexOf("Entregue"));
      const progress = freight.status === "Cancelados"
        ? 100
        : Math.round((phaseIndex / maxOperationalIndex) * 100);

      card.className = \`freight-card \${traffic.key} \${freight.status === "Cancelados" ? "cancelled" : ""} \${freight.formularioErrado ? "form-error" : ""}\`;
      card.dataset.freightId = freight.id;
      card.style.setProperty("--phase-progress", \`\${Math.min(progress, 100)}%\`);
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", \`Abrir detalhes da solicitação \${freight.id}\`);

      const phaseOptions = PHASES.map(phase => {
        return \`<option value="\${escapeHtml(phase)}" \${phase === freight.status ? "selected" : ""}>\${escapeHtml(phase)}</option>\`;
      }).join("");

      const solicitante = freight.solicitante || "-";
      const obra = freight.numeroObra || freight.obra || "-";
      const rm = freight.numeroRM || "-";
      const movement = freight.tipoMovimentacao || freight.tipoFrete || "Solicitação de frete";
      const description = freight.particularidadeObra || freight.materiais || freight.tipoMaterial || "Sem descrição informada.";
      const urgency = getFreightUrgency(freight);
      const urgencyShort = urgency === "URGENTE" ? "URG" : "NOR";
      const urgencyLabel = urgency === "URGENTE" ? "URGENTE" : "NORMAL";
      const deadlineText = formatDate(getFreightAttendanceDeadline(freight));
      const remainingText = getRemainingTime(freight);
      const statusText = traffic.key === "red" ? "Atrasado" : traffic.key === "yellow" ? "Em alerta" : traffic.key === "green" ? "No prazo" : "Encerrado";
      const showOcField = ["Coleta Agendada", "Em transporte", "Entregue"].includes(freight.status);
      const numeroOC = String(freight.numeroOC || "").trim();

      card.innerHTML = \`
        <div class="freight-compact-top">
          <div class="freight-compact-title-wrap">
            <div class="freight-compact-id">\${escapeHtml(freight.id)}</div>
            <div class="freight-compact-title">\${freightCardIcon("building")}<span>Obra/Depto \${escapeHtml(obra)}</span></div>
          </div>
          <div class="freight-priority-bubble \${urgency === "URGENTE" ? "urgent" : "normal"}">\${freightCardIcon(urgency === "URGENTE" ? "alert" : "check")}<span>\${urgencyShort}</span></div>
        </div>

        <div class="freight-compact-lines">
          <div><span class="freight-line-icon">\${freightCardIcon("clipboard")}</span><span>RM \${escapeHtml(rm)}</span></div>
          <div><span class="freight-line-icon">\${freightCardIcon("truck")}</span><span>\${escapeHtml(movement)}</span></div>
          <div><span class="freight-line-icon">\${freightCardIcon("user")}</span><span>\${escapeHtml(solicitante)}</span></div>
        </div>

        <div class="freight-compact-description" title="\${escapeHtml(description)}"><span class="freight-description-icon">\${freightCardIcon("file")}</span><span class="freight-description-text">\${escapeHtml(description)}</span></div>

        <div class="freight-compact-badges">
          <span class="freight-mini-badge \${urgency === "URGENTE" ? "urgent" : "normal"}">\${freightCardIcon(urgency === "URGENTE" ? "alert" : "check")}\${urgencyLabel}</span>
          <span class="freight-mini-badge traffic-\${traffic.key}" data-live="traffic">\${freightCardIcon("clock")}\${escapeHtml(traffic.label)}</span>
          <span class="freight-mini-badge phase">\${freightCardIcon("phase")}\${escapeHtml(freight.status)}</span>
          <span class="freight-mini-badge form-error-badge">\${freightCardIcon("alert")}FORMULÁRIO ERRADO</span>
        </div>

        <div class="freight-compact-meta">
          <span>\${freightCardIcon("calendar")}<span>Prazo: <strong>\${deadlineText}</strong></span></span>
          <span class="meta-status \${traffic.key}" data-live="status">\${freightCardIcon(traffic.key === "green" ? "check" : "alert")}\${statusText}</span>
        </div>

        <div class="freight-compact-timer">
          <div><span class="freight-timer-label">\${freightCardIcon("timer")}Na fase agora</span><strong data-live="visit">\${formatTimerDuration(getCurrentStageVisitMs(freight), false)}</strong></div>
          <div><span class="freight-timer-label">\${freightCardIcon("clock")}Acumulado fase</span><strong data-live="phase">\${getCurrentPhaseTime(freight)}</strong></div>
          <div><span class="freight-timer-label">\${freightCardIcon("route")}Total acumulado</span><strong data-live="total">\${getTotalProcessTime(freight)}</strong></div>
        </div>

        \${showOcField ? \`
          <div class="freight-oc-field" data-oc-field>
            <label for="oc-\${escapeHtml(freight.id)}">Nº da OC</label>
            <div class="freight-oc-input-row">
              <input id="oc-\${escapeHtml(freight.id)}" class="freight-oc-input" type="text" maxlength="40" value="\${escapeHtml(numeroOC)}" placeholder="Digite o número da OC" autocomplete="off" />
              <span class="freight-oc-save-status \${numeroOC ? "saved" : ""}" data-oc-status>\${numeroOC ? "Salvo" : "Pendente"}</span>
            </div>
          </div>
        \` : ""}

        <div class="freight-phase-selector-wrap">
          <label>\${freightCardIcon("phase")}Selecionar fase</label>
          <select class="phase-select" aria-label="Selecionar fase da solicitação \${escapeHtml(freight.id)}">
            \${phaseOptions}
          </select>
        </div>

        <label class="freight-form-error-check">
          <input class="form-error-checkbox" type="checkbox" \${freight.formularioErrado ? "checked" : ""} />
          <span>\${freightCardIcon("alert")}Formulário veio errado</span>
        </label>

        <div class="freight-compact-actions">
          <a class="btn-email btn-small" href="\${escapeHtml(buildOutlookComposeUrl(freight))}" target="_blank" rel="noopener noreferrer" data-action="email-quote" title="Abrir cotação no Outlook">\${freightCardIcon("mail")}Enviar por e-mail</a>
          <a class="btn-email btn-email-correction btn-small" href="\${escapeHtml(buildOutlookCorrectionUrl(freight))}" target="_blank" rel="noopener noreferrer" data-action="email-correction" title="Enviar solicitação de correção ao solicitante">\${freightCardIcon("alert")}Enviar correção</a>
          <button class="btn-secondary btn-small" type="button" data-action="details">\${freightCardIcon("eye")}Ver detalhes</button>
          <button class="btn-secondary btn-small" type="button" data-action="edit">\${freightCardIcon("edit")}Editar</button>
        </div>
      \`;

      const phaseSelect = card.querySelector(".phase-select");
      const keepPhaseSelectorOpen = event => {
        event.stopPropagation();
        isKanbanPhaseSelectorActive = true;
      };

      phaseSelect.addEventListener("pointerdown", keepPhaseSelectorOpen);
      phaseSelect.addEventListener("mousedown", keepPhaseSelectorOpen);
      phaseSelect.addEventListener("click", keepPhaseSelectorOpen);
      phaseSelect.addEventListener("focus", () => {
        isKanbanPhaseSelectorActive = true;
      });
      phaseSelect.addEventListener("change", event => {
        event.stopPropagation();
        const selectedPhase = event.target.value;
        isKanbanPhaseSelectorActive = false;
        changePhase(freight.id, selectedPhase);
      });
      phaseSelect.addEventListener("blur", () => {
        window.setTimeout(() => {
          isKanbanPhaseSelectorActive = false;
        }, 180);
      });

      const errorCheckbox = card.querySelector(".form-error-checkbox");
      errorCheckbox?.addEventListener("pointerdown", event => event.stopPropagation());
      errorCheckbox?.addEventListener("click", event => event.stopPropagation());
      errorCheckbox?.addEventListener("change", event => {
        event.stopPropagation();
        toggleFreightFormError(freight.id, event.target.checked, card);
      });
      card.querySelector(".freight-form-error-check")?.addEventListener("click", event => event.stopPropagation());

      const ocInput = card.querySelector(".freight-oc-input");
      const ocStatus = card.querySelector("[data-oc-status]");
      let ocSaveTimer = null;
      const persistOcNumber = () => {
        if (!ocInput) return;
        const value = String(ocInput.value || "").trim().slice(0, 40);
        ocInput.value = value;
        freight.numeroOC = value;
        saveFreights();
        if (ocStatus) {
          ocStatus.textContent = value ? "Salvo" : "Pendente";
          ocStatus.classList.toggle("saved", Boolean(value));
          ocStatus.classList.remove("pending");
        }
        try { renderFreightReport(); } catch (error) { console.error("Erro ao atualizar Nº da OC no relatório:", error); }
      };
      if (ocInput) {
        ["pointerdown", "mousedown", "click", "focus"].forEach(eventName => {
          ocInput.addEventListener(eventName, event => event.stopPropagation());
        });
        ocInput.addEventListener("input", event => {
          event.stopPropagation();
          if (ocInput.value.length > 40) ocInput.value = ocInput.value.slice(0, 40);
          if (ocStatus) {
            ocStatus.textContent = "Salvando";
            ocStatus.classList.remove("saved");
            ocStatus.classList.add("pending");
          }
          window.clearTimeout(ocSaveTimer);
          ocSaveTimer = window.setTimeout(persistOcNumber, 350);
        });
        ocInput.addEventListener("change", event => {
          event.stopPropagation();
          window.clearTimeout(ocSaveTimer);
          persistOcNumber();
        });
        ocInput.addEventListener("blur", () => {
          window.clearTimeout(ocSaveTimer);
          persistOcNumber();
        });
        ocInput.addEventListener("keydown", event => {
          event.stopPropagation();
          if (event.key === "Enter") {
            event.preventDefault();
            ocInput.blur();
          }
        });
      }
      card.querySelector("[data-oc-field]")?.addEventListener("click", event => event.stopPropagation());

      const emailButton = card.querySelector('[data-action="email-quote"]');
      const correctionEmailButton = card.querySelector('[data-action="email-correction"]');
      const detailsButton = card.querySelector('[data-action="details"]');
      const editButton = card.querySelector('[data-action="edit"]');

      emailButton?.addEventListener("click", event => {
        event.stopPropagation();
      });
      correctionEmailButton?.addEventListener("click", event => {
        event.stopPropagation();
        if (!String(freight.emailSolicitante || "").trim()) {
          event.preventDefault();
          alert("O e-mail do solicitante não está disponível. Edite a solicitação ou sincronize o login do aplicativo principal.");
        }
      });
      detailsButton?.addEventListener("click", event => {
        event.stopPropagation();
        openDetails(freight.id);
      });
      editButton?.addEventListener("click", event => {
        event.stopPropagation();
        startFreightEdit(freight.id);
      });

      card.addEventListener("click", event => {
        if (event.target.closest("button, select, option, input, textarea, label")) return;
        openDetails(freight.id);
      });
      card.addEventListener("keydown", event => {
        if ((event.key === "Enter" || event.key === " ") && !event.target.closest("button, select, input, textarea, label")) {
          event.preventDefault();
          openDetails(freight.id);
        }
      });

      return card;
    }


    function quoteEmailValue(value, fallback = "Não informado") {
      const normalized = String(value ?? "").trim();
      return normalized || fallback;
    }

    function quoteEmailCurrency(value) {
      const raw = String(value ?? "").trim();
      if (!raw) return "Não informado";
      return formatCurrency(value);
    }

    function buildFreightQuoteEmailBody(freight) {
      const vehicleParts = [
        quoteEmailValue(freight.tipoVeiculo || freight.veiculoEspecial),
        freight.implemento ? \`Implemento: \${freight.implemento}\` : "",
        freight.tracaoVeiculo ? \`Tração: \${freight.tracaoVeiculo}\` : "",
        freight.capacidadePrancha ? \`Capacidade da prancha: \${freight.capacidadePrancha}\` : "",
        freight.tamanhoPrancha ? \`Tamanho da prancha: \${freight.tamanhoPrancha}\` : ""
      ].filter(Boolean).join(" | ");

      const lines = [
        "Prezado, segue abaixo a solicitação de cotação conforme as informações listadas.",
        "",
        "📌 OBRAS / DEPARTAMENTO",
        "",
        \`Número da RM: \${quoteEmailValue(freight.numeroRM, "NA")}\`,
        \`Número da Obra / Departamento: \${quoteEmailValue(freight.numeroObra || freight.centroCusto || freight.obra)}\`,
        \`Solicitante: \${quoteEmailValue(freight.solicitante)}\`,
        \`Telefone do Solicitante: \${quoteEmailValue(freight.telefoneSolicitante)}\`,
        \`E-mail do Solicitante: \${quoteEmailValue(freight.emailSolicitante)}\`,
        \`Urgência: \${quoteEmailValue(getFreightUrgency(freight))}\`,
        \`Tipo de movimentação: \${quoteEmailValue(freight.tipoMovimentacao || freight.tipoFrete)}\`,
        \`Particularidade da Obra: \${quoteEmailValue(freight.particularidadeObra)}\`,
        "",
        "📍 ENDEREÇOS",
        "",
        "COLETA",
        \`Endereço: \${quoteEmailValue(freight.enderecoColeta || freight.origem)}\`,
        freight.linkGoogleMapsColeta ? \`Google Maps: \${freight.linkGoogleMapsColeta}\` : "",
        \`CEP: \${quoteEmailValue(freight.cepColeta)}\`,
        "",
        "ENTREGA",
        \`Endereço: \${quoteEmailValue(freight.enderecoEntrega || freight.destino)}\`,
        freight.linkGoogleMapsEntrega ? \`Google Maps: \${freight.linkGoogleMapsEntrega}\` : "",
        \`CEP: \${quoteEmailValue(freight.cepEntrega)}\`,
        "",
        "📅 AGENDAMENTO",
        "",
        \`Data da Coleta do Material: \${quoteEmailValue(freight.dataColetaMaterial)}\`,
        \`Horário da coleta: \${quoteEmailValue(freight.horarioColeta)}\`,
        "",
        "🚚 INFORMAÇÕES DO FRETE",
        "",
        \`Tipo de veículo: \${vehicleParts}\`,
        \`Este frete poderá ser compartilhado com outra obra?: \${quoteEmailValue(freight.freteCompartilhado)}\`,
        \`Necessita de operador para descarga: \${quoteEmailValue(freight.operadorDescarga)}\`,
        \`Observações sobre o veículo / operação: \${quoteEmailValue(freight.observacoesVeiculoOperacao)}\`,
        "",
        "👷 RESPONSÁVEL NO RECEBIMENTO",
        "",
        \`Nome e telefone do responsável: \${quoteEmailValue(freight.responsavelRecebimento)}\`,
        "",
        "📄 DOCUMENTAÇÃO / INFORMAÇÕES IMPORTANTES",
        "",
        \`Numeração de Ordem de coleta e/ou Pedido de coleta: \${quoteEmailValue(freight.ordemColeta, "NA")}\`,
        \`Número do pedido de compra: \${quoteEmailValue(freight.pedidoCompra, "NA")}\`,
        \`Este frete requer a emissão de nota fiscal?: \${quoteEmailValue(freight.notaFiscal)}\`,
        "",
        "📦 DETALHES DA CARGA",
        "",
        \`Materiais: \${quoteEmailValue(freight.materiais || freight.tipoMaterial)}\`,
        \`Dimensões total da carga: \${quoteEmailValue(freight.dimensoesCarga)}\`,
        \`Peso total da carga: \${quoteEmailValue(freight.pesoTotalCarga || freight.peso)}\${freight.pesoTotalCarga || freight.peso ? " kg" : ""}\`,
        \`Valor total da carga: \${quoteEmailCurrency(freight.valorTotalCarga)}\`,
        \`Total de peças / volumes: \${quoteEmailValue(freight.totalPecas || freight.volumes)}\`,
        "",
        "🏢 FORNECEDOR / LOCADOR",
        "",
        \`Nome e telefone: \${quoteEmailValue(freight.fornecedorNome)}\`,
        \`CNPJ: \${quoteEmailValue(freight.fornecedorCnpj)}\`,
        "",
        "Atenciosamente,"
      ];

      return lines.join("\\n");
    }

    function buildOutlookComposeUrl(freight) {
      const subject = \`Solicitação de cotação de frete - RM \${quoteEmailValue(freight.numeroRM, "NA")} - Obra \${quoteEmailValue(freight.numeroObra || freight.centroCusto || freight.obra)}\`;
      const body = buildFreightQuoteEmailBody(freight);
      const recipient = String(freight.emailTransportadora || "").trim();
      const params = [];

      if (recipient) params.push(\`to=\${encodeURIComponent(recipient)}\`);
      params.push(\`subject=\${encodeURIComponent(subject)}\`);
      params.push(\`body=\${encodeURIComponent(body)}\`);

      return \`https://outlook.cloud.microsoft/mail/deeplink/compose?\${params.join("&")}\`;
    }

    function buildFreightCorrectionEmailBody(freight) {
      const requesterName = quoteEmailValue(freight.solicitante, "Solicitante");
      const errorNotes = quoteEmailValue(freight.observacoes, "Os erros ainda não foram detalhados. Favor revisar os dados preenchidos na solicitação.");
      const lines = [
        \`Prezado(a) \${requesterName},\`,
        "",
        "Identificamos inconsistências no formulário de Solicitação de Frete abaixo:",
        "",
        \`Solicitação: \${quoteEmailValue(freight.id)}\`,
        \`Número da RM: \${quoteEmailValue(freight.numeroRM, "NA")}\`,
        \`Obra / Departamento: \${quoteEmailValue(freight.numeroObra || freight.centroCusto || freight.obra)}\`,
        \`Data da solicitação: \${quoteEmailValue(getFreightRequestDateValue(freight))}\`,
        \`Urgência: \${quoteEmailValue(getFreightUrgency(freight))}\`,
        "",
        "ERROS ENCONTRADOS",
        errorNotes,
        "",
        "Solicitamos a correção das informações e o reenvio do formulário para continuidade da cotação do frete.",
        "",
        freight.linkGoogleMapsColeta ? \`Link informado para coleta: \${freight.linkGoogleMapsColeta}\` : "",
        freight.linkGoogleMapsEntrega ? \`Link informado para entrega: \${freight.linkGoogleMapsEntrega}\` : "",
        "",
        "Atenciosamente,",
        "Equipe de Fretes"
      ];
      return lines.filter((line, index, array) => line !== "" || array[index - 1] !== "").join("\\n");
    }

    function buildOutlookCorrectionUrl(freight) {
      const subject = \`Correção necessária - Solicitação de Frete \${quoteEmailValue(freight.id)} - RM \${quoteEmailValue(freight.numeroRM, "NA")}\`;
      const body = buildFreightCorrectionEmailBody(freight);
      const recipient = String(freight.emailSolicitante || "").trim();
      const params = [];
      if (recipient) params.push(\`to=\${encodeURIComponent(recipient)}\`);
      params.push(\`subject=\${encodeURIComponent(subject)}\`);
      params.push(\`body=\${encodeURIComponent(body)}\`);
      return \`https://outlook.cloud.microsoft/mail/deeplink/compose?\${params.join("&")}\`;
    }

    function openFreightQuoteInOutlook(id) {
      const freight = freights.find(item => String(item.id) === String(id));
      if (!freight) {
        alert("Não foi possível localizar a solicitação para envio.");
        return;
      }
      window.location.href = buildOutlookComposeUrl(freight);
    }

    function changePhase(id, newPhase) {
      const freight = freights.find(item => item.id === id);
      if (!freight || freight.status === newPhase) return;

      const now = new Date().toISOString();
      if (!Array.isArray(freight.history)) freight.history = [];
      const currentHistory = freight.history[freight.history.length - 1];

      if (currentHistory && !currentHistory.exitedAt) {
        currentHistory.exitedAt = now;
      }

      freight.status = newPhase;
      freight.history.push({
        phase: newPhase,
        enteredAt: now,
        exitedAt: null
      });

      saveFreights();
      renderAll();
    }

    function openDetails(id) {
      const freight = freights.find(item => item.id === id);
      if (!freight) return;

      const traffic = getTrafficStatus(freight);
      const responsibleNote = String(freight.observacoesResponsavel || "").slice(0, 240);
      document.getElementById("modalTitle").innerText = \`\${freight.id} - \${freight.obra}\`;

      const historyRows = freight.history.map(item => \`
        <tr>
          <td>\${item.phase}</td>
          <td>\${formatDate(item.enteredAt)}</td>
          <td>\${formatDate(item.exitedAt)}</td>
          <td>\${formatDuration(getBusinessDurationMs(new Date(item.enteredAt), item.exitedAt ? new Date(item.exitedAt) : new Date()), false)}</td>
        </tr>
      \`).join("");

      document.getElementById("modalContent").innerHTML = \`
        <div class="details-kpi-grid">
          <article class="details-kpi details-kpi-status">
            <span class="details-kpi-label">Semáforo</span>
            <div class="details-status-badge \${traffic.key}">\${escapeHtml(traffic.label)}</div>
          </article>
          <article class="details-kpi details-kpi-time">
            <span class="details-kpi-label">Tempo restante</span>
            <strong class="details-kpi-value details-kpi-value-compact" title="\${escapeHtml(getRemainingTime(freight))}">\${escapeHtml(getRemainingTime(freight))}</strong>
          </article>
          <article class="details-kpi details-kpi-phase">
            <span class="details-kpi-label">Fase atual</span>
            <strong class="details-kpi-value details-kpi-value-compact" title="\${escapeHtml(freight.status)}">\${escapeHtml(freight.status)}</strong>
          </article>
          <article class="details-kpi details-kpi-time">
            <span class="details-kpi-label">Tempo na fase</span>
            <strong class="details-kpi-value details-kpi-value-compact" title="\${escapeHtml(getCurrentPhaseTime(freight))}">\${escapeHtml(getCurrentPhaseTime(freight))}</strong>
          </article>
          <article class="details-kpi details-kpi-money">
            <span class="details-kpi-label">Valor aprovado</span>
            <strong class="details-kpi-value details-kpi-value-money" title="\${escapeHtml(formatCurrency(freight.valorAprovado))}">\${escapeHtml(formatCurrency(freight.valorAprovado))}</strong>
          </article>
        </div>

        <section class="responsible-note-detail-panel" aria-labelledby="responsible-note-detail-title">
          <div class="responsible-note-detail-heading">
            <div class="responsible-note-detail-title" id="responsible-note-detail-title">\${freightCardIcon("note")}OBS do Responsável pelo frete</div>
            <span class="responsible-note-detail-status \${responsibleNote.trim() ? "saved" : ""}" id="detailResponsibleNoteStatus">\${responsibleNote.trim() ? "Salvo" : "Sem observação"}</span>
          </div>
          <p class="responsible-note-detail-help">Campo operacional para preenchimento pelo responsável do frete. Esta observação fica separada das informações enviadas pelo solicitante e aparece no relatório final.</p>
          <textarea id="detailResponsibleNoteInput" class="responsible-note-detail-input" maxlength="240" placeholder="Insira as observações operacionais do responsável pelo frete...">\${escapeHtml(responsibleNote)}</textarea>
          <div class="responsible-note-detail-footer">
            <span class="responsible-note-detail-counter \${responsibleNote.length >= 240 ? "at-limit" : responsibleNote.length >= 200 ? "near-limit" : ""}" id="detailResponsibleNoteCounter">\${responsibleNote.length}/240</span>
            <button class="responsible-note-save-button" type="button" id="detailResponsibleNoteSave">\${freightCardIcon("save")}Salvar observação</button>
          </div>
        </section>

        <div class="panel" style="box-shadow:none; border:1px solid #e5e7eb;">
          <h2>Dados da solicitação</h2>
          <div class="form-grid">
            \${detail("Número da RM", freight.numeroRM)}
            \${detail("Nº da OC", freight.numeroOC || "-")}
            \${detail("Data da solicitação", formatDateOnlyPtBr(getFreightRequestDateValue(freight)))}
            \${detail("Urgência", getFreightUrgency(freight))}
            \${detail("Prazo de atendimento", formatDate(getFreightAttendanceDeadline(freight)))}
            \${detail("Obra / Departamento", freight.numeroObra || freight.obra)}
            \${detail("Solicitante", freight.solicitante)}
            \${detail("Telefone solicitante", freight.telefoneSolicitante)}
            \${detail("E-mail solicitante", freight.emailSolicitante)}
            \${detail("Tipo de movimentação", freight.tipoMovimentacao || freight.tipoFrete)}
            \${detail("Particularidade da obra", freight.particularidadeObra)}
            \${detail("Forma de informar a coleta", freight.modoLocalColeta === "LINK_MAPS" ? "Link do Maps" : "Endereço")}
            \${detail("Endereço de coleta", freight.enderecoColeta || freight.origem)}
            \${detail("Link Google Maps — coleta", freight.linkGoogleMapsColeta || "-")}
            \${detail("CEP coleta", freight.cepColeta)}
            \${detail("Forma de informar a entrega", freight.modoLocalEntrega === "LINK_MAPS" ? "Link do Maps" : "Endereço")}
            \${detail("Endereço de entrega", freight.enderecoEntrega || freight.destino)}
            \${detail("Link Google Maps — entrega", freight.linkGoogleMapsEntrega || "-")}
            \${detail("CEP entrega", freight.cepEntrega)}
            \${detail("Data coleta material", freight.dataColetaMaterial)}
            \${detail("Horário coleta", freight.horarioColeta)}
            \${detail("Tipo de veículo", freight.tipoVeiculo || freight.veiculoEspecial)}
            \${detail("Implemento", freight.implemento || "-")}
            \${detail("Tração do veículo", freight.tracaoVeiculo || "-")}
            \${detail("Capacidade da prancha (peso)", freight.capacidadePrancha || "-")}
            \${detail("Comprimento / tamanho da prancha", freight.tamanhoPrancha || "-")}
            \${detail("Observações sobre o veículo / operação", freight.observacoesVeiculoOperacao || "-", "full")}
            \${detail("Frete compartilhado", freight.freteCompartilhado)}
            \${detail("Operador descarga", freight.operadorDescarga)}
            \${detail("Responsável recebimento", freight.responsavelRecebimento)}
            \${detail("Ordem/Pedido coleta", freight.ordemColeta)}
            \${detail("Pedido de compra", freight.pedidoCompra)}
            \${detail("Nota fiscal", freight.notaFiscal)}
            \${detail("Peso total kg", freight.pesoTotalCarga || freight.peso)}
            \${detail("Valor total carga", formatCurrency(freight.valorTotalCarga))}
            \${detail("Total peças/volumes", freight.totalPecas || freight.volumes)}
            \${detail("Fornecedor / Locador", freight.fornecedorNome)}
            \${detail("CNPJ fornecedor", freight.fornecedorCnpj)}
            \${detail("Transportadora", freight.transportadora)}
            \${detail("E-mail da transportadora", freight.emailTransportadora)}
            \${detail("Coleta agendada", formatDate(freight.dataColetaAgendada))}
            \${detail("Prazo entrega", formatDate(freight.dataLimiteEntrega))}
            \${detail("Materiais / Detalhes da carga", freight.materiais || freight.tipoMaterial || "-", "full")}
            \${detail("Dimensões / Informações complementares", freight.dimensoesCarga || "-", "full")}
            \${detail("Formulário veio errado", freight.formularioErrado ? "SIM" : "NÃO")}
            \${detail("Observações / informações do formulário", freight.observacoes || "-", "full")}
            \${Object.values(freight.customFields || {}).map(field => detail(field.label || "Campo adicional", field.value || "-", field.type === "textarea" ? "full" : "")).join("")}
          </div>
        </div>

        <div class="panel" style="box-shadow:none; border:1px solid #e5e7eb;">
          <h2>Histórico de fases</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fase</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                  <th>Tempo</th>
                </tr>
              </thead>
              <tbody>\${historyRows}</tbody>
            </table>
          </div>
        </div>
      \`;

      setupDetailResponsibleNoteEditor(freight);
      document.getElementById("detailsModal").classList.add("active");
    }

    function setupDetailResponsibleNoteEditor(freight) {
      const input = document.getElementById("detailResponsibleNoteInput");
      const status = document.getElementById("detailResponsibleNoteStatus");
      const counter = document.getElementById("detailResponsibleNoteCounter");
      const saveButton = document.getElementById("detailResponsibleNoteSave");
      if (!input || !freight) return;

      let saveTimer = null;
      const updateCounter = () => {
        if (input.value.length > 240) input.value = input.value.slice(0, 240);
        const length = input.value.length;
        if (counter) {
          counter.textContent = \`\${length}/240\`;
          counter.classList.toggle("near-limit", length >= 200 && length < 240);
          counter.classList.toggle("at-limit", length >= 240);
        }
      };

      const markPending = () => {
        if (!status) return;
        status.textContent = "Alteração pendente";
        status.classList.remove("saved");
        status.classList.add("pending");
      };

      const persist = () => {
        window.clearTimeout(saveTimer);
        const value = String(input.value || "").slice(0, 240);
        input.value = value;
        freight.observacoesResponsavel = value;
        freight.observacoesResponsavelAtualizadaEm = new Date().toISOString();
        saveFreights();
        updateCounter();
        if (status) {
          status.textContent = value.trim() ? "Salvo" : "Sem observação";
          status.classList.toggle("saved", Boolean(value.trim()));
          status.classList.remove("pending");
        }
        try { renderFreightReport(); } catch (error) { console.error("Erro ao atualizar a observação do responsável no relatório:", error); }
      };

      input.addEventListener("input", () => {
        updateCounter();
        markPending();
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(persist, 650);
      });
      input.addEventListener("change", persist);
      input.addEventListener("blur", persist);
      saveButton?.addEventListener("click", persist);
      updateCounter();
    }

    function detail(label, value, cssClass = "") {
      return \`
        <div class="\${cssClass}">
          <label>\${label}</label>
          <div style="font-size:14px; padding:10px; border:1px solid #e5e7eb; border-radius:8px; background:#f9fafb;">
            \${escapeHtml(String(value || "-"))}
          </div>
        </div>
      \`;
    }

    function closeModal(event) {
      if (event && event.target.id !== "detailsModal") return;
      document.getElementById("detailsModal").classList.remove("active");
    }

    function editBasic(id) {
      const freight = freights.find(item => item.id === id);
      if (!freight) return;

      const transportadora = prompt("Transportadora aprovada:", freight.transportadora || "");
      if (transportadora === null) return;

      const valor = prompt("Valor aprovado R$:", freight.valorAprovado || "");
      if (valor === null) return;

      const responsavel = prompt("Responsável Supply Chain:", freight.responsavelSupply || "");
      if (responsavel === null) return;

      const prazo = prompt("Data limite de entrega no formato AAAA-MM-DDTHH:MM:", freight.dataLimiteEntrega || "");
      if (prazo === null) return;

      freight.transportadora = transportadora.trim();
      freight.valorAprovado = valor.trim();
      freight.responsavelSupply = responsavel.trim();
      freight.dataLimiteEntrega = prazo.trim() || freight.dataLimiteEntrega;

      saveFreights();
      renderAll();
    }

    function deleteFreight(id) {
      if (!confirm("Deseja excluir esta solicitação?")) return;
      freights = freights.filter(item => item.id !== id);
      saveFreights();
      renderAll();
    }


    function renderMap() {
      const list = document.getElementById("mapFreightList");
      if (!list) return;

      const activeFreights = sortFreights(
        freights.filter(freight => freight.status !== "Entregue" && freight.status !== "Cancelados")
      );

      if (!activeFreights.length) {
        list.innerHTML = \`<div class="empty">Nenhum frete ativo para exibir no mapa. Crie uma solicitação ou carregue dados de exemplo.</div>\`;
        updateBrazilMap(null);
        return;
      }

      if (!selectedMapFreightId || !activeFreights.some(item => item.id === selectedMapFreightId)) {
        selectedMapFreightId = activeFreights[0].id;
      }

      list.innerHTML = activeFreights.map(freight => {
        const traffic = getTrafficStatus(freight);
        return \`
          <div class="freight-map-item \${traffic.key} \${freight.id === selectedMapFreightId ? "active" : ""}" onclick="selectMapFreight('\${escapeJs(freight.id)}')">
            <strong>\${escapeHtml(freight.id)} | RM \${escapeHtml(freight.numeroRM || "-")} | Obra \${escapeHtml(freight.numeroObra || freight.obra)}</strong>
            <span>\${escapeHtml(getFreightLocationDisplay(freight, "origin"))} → \${escapeHtml(getFreightLocationDisplay(freight, "destination"))}</span>
            <span>\${escapeHtml(traffic.label)} | \${escapeHtml(freight.status)}</span>
            <span>Atendimento: \${formatDate(getFreightAttendanceDeadline(freight))}</span>
          </div>
        \`;
      }).join("");

      const selected = activeFreights.find(item => item.id === selectedMapFreightId);
      updateBrazilMap(selected);
    }

    function selectMapFreight(id) {
      selectedMapFreightId = id;
      renderMap();
    }

    function updateBrazilMap(freight) {
      const mapFreightId = document.getElementById("mapFreightId");
      const mapFreightPhase = document.getElementById("mapFreightPhase");
      const mapFreightRemaining = document.getElementById("mapFreightRemaining");
      const mapFreightPhaseTime = document.getElementById("mapFreightPhaseTime");

      const routesLayer = document.getElementById("brazilRoutesLayer");
      const pointsLayer = document.getElementById("brazilPointsLayer");
      const truckLayer = document.getElementById("brazilTruckLayer");

      if (!routesLayer || !pointsLayer || !truckLayer) return;

      routesLayer.innerHTML = "";
      pointsLayer.innerHTML = "";
      truckLayer.innerHTML = "";

      if (!freight) {
        if (mapFreightId) mapFreightId.textContent = "-";
        if (mapFreightPhase) mapFreightPhase.textContent = "-";
        if (mapFreightRemaining) mapFreightRemaining.textContent = "-";
        if (mapFreightPhaseTime) mapFreightPhaseTime.textContent = "-";
        const frame = document.getElementById("googleRouteFrame");
        if (frame) frame.src = GOOGLE_MAPS_EMBED_FALLBACK_URL;
        updateMapLocationLinks(null);
        updateDeliveryTracker(null);
        return;
      }

      if (mapFreightId) mapFreightId.textContent = freight.id;
      if (mapFreightPhase) mapFreightPhase.textContent = freight.status;
      if (mapFreightRemaining) mapFreightRemaining.textContent = getRemainingTime(freight);
      if (mapFreightPhaseTime) mapFreightPhaseTime.textContent = getCurrentPhaseTime(freight);

      const originText = getFreightMapLocation(freight, "origin");
      const destinationText = getFreightMapLocation(freight, "destination");

      updateMapLocationLinks(freight);
      updateGoogleEmbedRoute(freight);

      const origin = getBrazilCoordinate(originText, "origin");
      const destination = getBrazilCoordinate(destinationText, "destination");

      const path = buildBrazilRoutePath(origin, destination);
      const progress = getPhaseRouteProgress(freight.status);
      const progressPath = buildBrazilRouteProgressPath(origin, destination, progress);
      const truck = getPointOnQuadraticRoute(origin, destination, progress);
      const angle = getRouteAngleAtProgress(origin, destination, progress);
      const routeStops = getKanbanRouteStops(origin, destination, freight.status);
      const moving = freight.status !== "Entregue" && freight.status !== "Cancelados";
      const arrowMarkup = progress > 0.02 && progress < 1 ? buildRouteArrow(origin, destination, Math.min(progress + 0.08, 0.98)) : "";

      routesLayer.innerHTML = \`
        <path class="route-progress-line brazil-route-shadow" d="\${path}"></path>
        <path class="route-base-line brazil-route" d="\${path}"></path>
        <path class="route-progress-line" d="\${progressPath}"></path>
        \${arrowMarkup}
      \`;

      pointsLayer.innerHTML = routeStops.map(stop => \`
        <g transform="translate(\${stop.x}, \${stop.y})">
          <circle class="kanban-route-checkpoint \${stop.css}" r="\${stop.css === 'current' ? 8.5 : 7}"></circle>
          <text class="route-stage-label" x="0" y="-15" text-anchor="middle">\${escapeHtml(stop.shortLabel)}</text>
        </g>
      \`).join("");

      truckLayer.innerHTML = \`
        <g class="brazil-truck" transform="translate(\${truck.x}, \${truck.y}) rotate(\${angle})">
          <ellipse class="truck-position-halo" cx="0" cy="0" rx="24" ry="14"></ellipse>
          <g class="brazil-truck-vehicle \${moving ? 'moving' : ''}">
            <ellipse class="brazil-truck-shadow-shape" cx="-2" cy="14" rx="23" ry="5"></ellipse>
            <rect class="brazil-truck-trailer" x="-29" y="-10" width="34" height="20" rx="3" ry="3"></rect>
            <rect class="brazil-truck-stripe" x="-21" y="-3" width="18" height="2.8" rx="1.4" ry="1.4"></rect>
            <rect class="brazil-truck-stripe" x="-21" y="1.8" width="18" height="2.8" rx="1.4" ry="1.4"></rect>
            <rect class="brazil-truck-front-bumper" x="-33" y="8" width="48" height="4.5" rx="1" ry="1"></rect>
            <path class="brazil-truck-cab-shell" d="M 4 -8 H 15 C 19 -8 23 -3.5 23 0 V 10 H 4 Z"></path>
            <rect class="brazil-truck-window" x="8" y="-4.5" width="6.5" height="5.5" rx="0.8" ry="0.8"></rect>
            <rect class="brazil-truck-window" x="15.4" y="-4.5" width="4.4" height="5.5" rx="0.8" ry="0.8"></rect>
            <rect class="brazil-truck-light" x="22.5" y="3" width="2.2" height="4.8" rx="0.8" ry="0.8"></rect>
            <g class="brazil-wheel-group \${moving ? 'moving' : ''}" transform="translate(-16, 12)">
              <circle class="brazil-truck-wheel" r="6"></circle>
              <circle class="brazil-truck-wheel-inner" r="3.1"></circle>
              <circle class="brazil-truck-wheel-hub" r="1.15"></circle>
            </g>
            <g class="brazil-wheel-group \${moving ? 'moving' : ''}" transform="translate(11, 12)">
              <circle class="brazil-truck-wheel" r="6"></circle>
              <circle class="brazil-truck-wheel-inner" r="3.1"></circle>
              <circle class="brazil-truck-wheel-hub" r="1.15"></circle>
            </g>
          </g>
        </g>
      \`;

      updateDeliveryTracker(freight);
    }


    function updateGoogleEmbedRoute(freight) {
      const frame = document.getElementById("googleRouteFrame");
      if (!frame || !freight) return;

      const origin = getFreightMapLocation(freight, "origin");
      const destination = getFreightMapLocation(freight, "destination");

      if (!origin || !destination) {
        frame.src = GOOGLE_MAPS_EMBED_FALLBACK_URL;
        return;
      }

      const encodedOrigin = encodeURIComponent(origin);
      const encodedDestination = encodeURIComponent(destination);

      frame.src = \`https://www.google.com/maps?output=embed&saddr=\${encodedOrigin}&daddr=\${encodedDestination}\`;
    }


    function updateDeliveryTracker(freight) {
      const title = document.getElementById("trackingTitle");
      const subtitle = document.getElementById("trackingSubtitle");
      const pill = document.getElementById("trackingStatusPill");
      const origin = document.getElementById("trackingOrigin");
      const destination = document.getElementById("trackingDestination");
      const deadline = document.getElementById("trackingDeadline");
      const progress = document.getElementById("trackerProgress");
      const truck = document.getElementById("trackerTruck");
      const steps = document.getElementById("trackerSteps");

      if (!title || !steps || !progress || !truck) return;

      const trackerPhases = [
        { phase: "Não iniciado", label: "Solicitado", detail: "Pedido recebido" },
        { phase: "Em cotação", label: "Cotação", detail: "Buscando transporte" },
        { phase: "Aguardando Validação da Obra", label: "Validação", detail: "Obra aprovando" },
        { phase: "Coleta Agendada", label: "Coleta", detail: "Coleta programada" },
        { phase: "Em transporte", label: "Em rota", detail: "Carga em trânsito" },
        { phase: "Entregue", label: "Entregue", detail: "Entrega concluída" }
      ];

      if (!freight) {
        title.textContent = "Selecione um frete";
        subtitle.textContent = "Status conforme Kanban.";
        pill.textContent = "-";
        origin.textContent = "-";
        destination.textContent = "-";
        deadline.textContent = "-";
        progress.style.width = "0%";
        truck.style.left = "0%";
        steps.innerHTML = trackerPhases.map(item => \`
          <div class="tracker-step">
            <div class="tracker-dot"></div>
            <strong>\${item.label}</strong>
            <span>\${item.detail}</span>
          </div>
        \`).join("");
        return;
      }

      const status = freight.status;
      const currentIndex = status === "Cancelados"
        ? 0
        : Math.max(0, trackerPhases.findIndex(item => item.phase === status));
      const progressPercent = status === "Cancelados"
        ? 0
        : Math.round((currentIndex / (trackerPhases.length - 1)) * 100);

      title.textContent = \`\${freight.id} · RM \${freight.numeroRM || "-"}\`;
      subtitle.textContent = \`Obra \${freight.numeroObra || freight.obra || "-"} · \${freight.solicitante || "Solicitante não informado"}\`;
      pill.textContent = status;
      pill.className = \`tracking-status-pill \${getTrafficStatus(freight).key}\`;
      origin.textContent = getFreightLocationDisplay(freight, "origin");
      destination.textContent = getFreightLocationDisplay(freight, "destination");
      deadline.textContent = \`\${formatDate(freight.dataLimiteEntrega)} · \${getRemainingTime(freight)}\`;

      progress.style.width = \`\${progressPercent}%\`;
      truck.style.left = \`\${progressPercent}%\`;

      if (status === "Entregue" || status === "Cancelados") {
        truck.classList.remove("moving");
      } else {
        truck.classList.add("moving");
      }

      steps.innerHTML = trackerPhases.map((item, index) => {
        let css = "";
        if (status === "Cancelados") {
          css = index === 0 ? "current cancelled" : "";
        } else if (index < currentIndex) {
          css = "done";
        } else if (index === currentIndex) {
          css = "current";
        }

        return \`
          <div class="tracker-step \${css}">
            <div class="tracker-dot"></div>
            <strong>\${item.label}</strong>
            <span>\${item.detail}</span>
          </div>
        \`;
      }).join("");
    }

    function getPhaseRouteProgress(status) {
      const progressByPhase = {
        "Não iniciado": 0.00,
        "Em cotação": 0.08,
        "Aguardando Validação da Obra": 0.18,
        "Coleta Agendada": 0.28,
        "Em transporte": 0.62,
        "Entregue": 1.00,
        "Cancelados": 0.00
      };

      return progressByPhase[status] ?? 0.00;
    }

    function getKanbanRouteStops(origin, destination, currentStatus) {
      const stops = [
        { phase: "Não iniciado", shortLabel: "Início", t: 0.00 },
        { phase: "Em cotação", shortLabel: "Cotação", t: 0.08 },
        { phase: "Aguardando Validação da Obra", shortLabel: "Validação", t: 0.18 },
        { phase: "Coleta Agendada", shortLabel: "Coleta agendada", t: 0.28 },
        { phase: "Em transporte", shortLabel: "Transporte", t: 0.62 },
        { phase: "Entregue", shortLabel: "Entrega", t: 1.00 }
      ];

      const currentProgress = getPhaseRouteProgress(currentStatus);

      return stops.map(stop => {
        const point = getPointOnQuadraticRoute(origin, destination, stop.t);
        let css = "";

        if (currentStatus === "Cancelados") {
          css = stop.t === 0 ? "current" : "";
        } else if (Math.abs(stop.t - currentProgress) < 0.001) {
          css = "current";
        } else if (stop.t < currentProgress) {
          css = "done";
        }

        return {
          ...stop,
          x: point.x,
          y: point.y,
          css
        };
      });
    }

    function buildBrazilRoutePath(origin, destination) {
      const mid = getRouteControlPoint(origin, destination);
      return \`M \${origin.x} \${origin.y} Q \${mid.x} \${mid.y} \${destination.x} \${destination.y}\`;
    }

    function buildBrazilRouteProgressPath(origin, destination, progress) {
      const samples = [];
      const steps = Math.max(2, Math.ceil(progress * 40));

      for (let i = 0; i <= steps; i++) {
        const t = progress === 0 ? 0 : Math.min(progress, (i / steps) * progress);
        samples.push(getPointOnQuadraticRoute(origin, destination, t));
      }

      if (samples.length === 1) samples.push(samples[0]);

      return samples.map((point, index) => {
        return \`\${index === 0 ? "M" : "L"} \${point.x} \${point.y}\`;
      }).join(" ");
    }

    function buildRouteArrow(origin, destination, t) {
      const point = getPointOnQuadraticRoute(origin, destination, t);
      const angle = getRouteAngleAtProgress(origin, destination, t);
      return \`
        <g transform="translate(\${point.x}, \${point.y}) rotate(\${angle})">
          <path class="route-direction-arrow" d="M 0 -8 L 18 0 L 0 8 Z"></path>
        </g>
      \`;
    }

    function getRouteControlPoint(origin, destination) {
      const centerX = (origin.x + destination.x) / 2;
      const centerY = (origin.y + destination.y) / 2;
      const distance = Math.hypot(destination.x - origin.x, destination.y - origin.y);
      const curve = Math.max(42, Math.min(130, distance * 0.26));

      return {
        x: centerX,
        y: centerY - curve
      };
    }

    function getPointOnQuadraticRoute(origin, destination, t) {
      const safeT = Math.max(0, Math.min(1, t));
      const control = getRouteControlPoint(origin, destination);
      const x = Math.pow(1 - safeT, 2) * origin.x + 2 * (1 - safeT) * safeT * control.x + Math.pow(safeT, 2) * destination.x;
      const y = Math.pow(1 - safeT, 2) * origin.y + 2 * (1 - safeT) * safeT * control.y + Math.pow(safeT, 2) * destination.y;

      return { x, y };
    }

    function getRouteAngleAtProgress(origin, destination, t) {
      const t1 = Math.max(0, t - 0.015);
      const t2 = Math.min(1, t + 0.015);
      const p1 = getPointOnQuadraticRoute(origin, destination, t1);
      const p2 = getPointOnQuadraticRoute(origin, destination, t2);
      return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

    function getBrazilCoordinate(text, fallbackType) {
      const latLng = extractLatLngFromMapsValue(text);
      if (latLng && Number.isFinite(latLng.lat) && Number.isFinite(latLng.lng)) {
        const x = Math.max(145, Math.min(655, 145 + ((latLng.lng + 74) / 40) * 510));
        const y = Math.max(95, Math.min(635, 95 + ((5.5 - latLng.lat) / 39.5) * 540));
        return { x, y, label: fallbackType === "origin" ? "Coleta" : "Entrega" };
      }
      const normalized = normalizeText(text);
      const state = extractBrazilState(normalized);

      const coordinates = {
        "AC": { x: 157, y: 260, label: "AC" },
        "AM": { x: 250, y: 205, label: "AM" },
        "RR": { x: 292, y: 105, label: "RR" },
        "RO": { x: 246, y: 308, label: "RO" },
        "PA": { x: 410, y: 210, label: "PA" },
        "AP": { x: 454, y: 126, label: "AP" },
        "TO": { x: 455, y: 315, label: "TO" },
        "MA": { x: 533, y: 245, label: "MA" },
        "PI": { x: 560, y: 293, label: "PI" },
        "CE": { x: 612, y: 274, label: "CE" },
        "RN": { x: 646, y: 298, label: "RN" },
        "PB": { x: 641, y: 320, label: "PB" },
        "PE": { x: 626, y: 342, label: "PE" },
        "AL": { x: 617, y: 366, label: "AL" },
        "SE": { x: 605, y: 388, label: "SE" },
        "BA": { x: 548, y: 408, label: "BA" },
        "MT": { x: 365, y: 360, label: "MT" },
        "MS": { x: 374, y: 468, label: "MS" },
        "GO": { x: 472, y: 415, label: "GO" },
        "DF": { x: 492, y: 396, label: "DF" },
        "MG": { x: 536, y: 470, label: "MG" },
        "ES": { x: 602, y: 494, label: "ES" },
        "RJ": { x: 562, y: 532, label: "RJ" },
        "SP": { x: 487, y: 528, label: "SP" },
        "PR": { x: 445, y: 568, label: "PR" },
        "SC": { x: 453, y: 602, label: "SC" },
        "RS": { x: 438, y: 632, label: "RS" }
      };

      if (state && coordinates[state]) {
        return coordinates[state];
      }

      const cityHints = [
        ["RIO DE JANEIRO", "RJ"], ["CAXIAS", "RJ"], ["BENTO GONCALVES", "RS"], ["PORTO ALEGRE", "RS"],
        ["SAO PAULO", "SP"], ["CAMPINAS", "SP"], ["SANTOS", "SP"], ["GUARULHOS", "SP"],
        ["BELO HORIZONTE", "MG"], ["VITORIA", "ES"], ["SALVADOR", "BA"], ["CURITIBA", "PR"],
        ["FLORIANOPOLIS", "SC"], ["BRASILIA", "DF"], ["GOIANIA", "GO"], ["RECIFE", "PE"],
        ["FORTALEZA", "CE"], ["MANAUS", "AM"], ["BELEM", "PA"], ["CUIABA", "MT"], ["CAMPO GRANDE", "MS"]
      ];

      for (const [city, uf] of cityHints) {
        if (normalized.includes(city)) {
          return coordinates[uf];
        }
      }

      return fallbackType === "origin"
        ? { x: 320, y: 360, label: "Origem" }
        : { x: 520, y: 500, label: "Destino" };
    }

    function extractBrazilState(normalizedText) {
      const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

      for (const uf of states) {
        const regex = new RegExp(\`(^|[^A-Z])\${uf}([^A-Z]|$)\`);
        if (regex.test(normalizedText)) return uf;
      }

      return null;
    }

    function normalizeText(value) {
      return String(value || "")
        .normalize("NFD")
        .replace(/[\\u0300-\\u036f]/g, "")
        .toUpperCase();
    }


    function isValidGoogleMapsApiKey(value) {
      const key = String(value || "").trim();
      if (!key || key.includes("COLE_SUA_CHAVE")) return false;
      if (/^https?:\\/\\//i.test(key) || key.includes("google.com/maps") || key.includes("output=embed")) return false;
      if (/\\s/.test(key)) return false;
      return /^AIza[0-9A-Za-z_-]{20,}$/.test(key);
    }

    function hasConfiguredGoogleMapsKey() {
      return isValidGoogleMapsApiKey(GOOGLE_MAPS_API_KEY);
    }

    function setGooglePlacesConfigStatus(message, type = "") {
      const status = document.getElementById("googlePlacesConfigStatus");
      if (!status) return;
      status.textContent = message;
      status.className = \`google-places-config-status \${type}\`.trim();
    }

    function setupGooglePlacesConfiguration() {
      const keyInput = document.getElementById("googlePlacesApiKeyInput");
      const activateButton = document.getElementById("activateGooglePlacesButton");
      const clearButton = document.getElementById("clearGooglePlacesKeyButton");
      if (!keyInput || !activateButton || !clearButton) return;
      const managedKey = getManagedGoogleMapsApiKey();

      if (isValidGoogleMapsApiKey(managedKey)) {
        GOOGLE_MAPS_API_KEY = managedKey;
        keyInput.value = "";
        keyInput.placeholder = "Chave configurada pelo Supply Flow";
        keyInput.disabled = true;
        activateButton.disabled = true;
        clearButton.disabled = true;
        setGooglePlacesConfigStatus("Google Maps configurado pelo ambiente do Supply Flow. A pesquisa de endereços está ativa para todos os usuários.", "active");
        return;
      }

      if (hasConfiguredGoogleMapsKey()) {
        keyInput.value = GOOGLE_MAPS_API_KEY;
        setGooglePlacesConfigStatus("Chave válida salva. Carregando pesquisa e sugestões do Google Maps...", "loading");
      } else {
        if (GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== GOOGLE_MAPS_API_KEY_FALLBACK) {
          try { localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE); } catch (error) {}
          GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_API_KEY_FALLBACK;
        }
        keyInput.value = "";
        setGooglePlacesConfigStatus("Cole uma chave alfanumérica válida da Google Maps Platform. Links como google.com/maps?...&output=embed não funcionam como chave.", "error");
      }

      if (activateButton.dataset.bound !== "1") {
        activateButton.dataset.bound = "1";
        activateButton.addEventListener("click", () => {
          const key = String(keyInput.value || "").trim();
          if (/^https?:\\/\\//i.test(key) || key.includes("google.com/maps") || key.includes("output=embed")) {
            setGooglePlacesConfigStatus("Esse conteúdo é um link de mapa incorporado, não uma chave de API. Clique em ‘Criar chave no Google Cloud’ e cole aqui a chave alfanumérica gerada.", "error");
            keyInput.focus();
            return;
          }
          if (!isValidGoogleMapsApiKey(key)) {
            setGooglePlacesConfigStatus("Informe uma chave válida da Google Maps Platform, normalmente iniciada por AIza.", "error");
            keyInput.focus();
            return;
          }
          try {
            localStorage.setItem(GOOGLE_MAPS_API_KEY_STORAGE, key);
          } catch (error) {
            setGooglePlacesConfigStatus("Não foi possível salvar a chave neste navegador.", "error");
            return;
          }
          const keyChanged = hasConfiguredGoogleMapsKey() && GOOGLE_MAPS_API_KEY !== key;
          GOOGLE_MAPS_API_KEY = key;
          setGooglePlacesConfigStatus("Ativando Google Maps e Places...", "loading");
          if (keyChanged && googleMapsLoaded) {
            window.location.reload();
            return;
          }
          activateGoogleMapsIfConfigured();
        });
      }

      if (clearButton.dataset.bound !== "1") {
        clearButton.dataset.bound = "1";
        clearButton.addEventListener("click", () => {
          try { localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE); } catch (error) {}
          GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_API_KEY_FALLBACK;
          keyInput.value = "";
          setGooglePlacesConfigStatus("Chave removida. As sugestões online do Google Maps estão desativadas.");
          if (googleMapsLoaded || document.getElementById("googleMapsScript")) window.location.reload();
        });
      }
    }

    function activateGoogleMapsIfConfigured() {
      if (!hasConfiguredGoogleMapsKey()) {
        setGoogleStatus("Google Maps não ativado. Configure a chave na seção Endereços do formulário.", "error");
        setGooglePlacesConfigStatus("Configure a chave para pesquisar fornecedores, empresas, locais e endereços no Google Maps.");
        setupFreightAddressAutocomplete();
        return;
      }
      setGooglePlacesConfigStatus("Carregando pesquisa do Google Maps...", "loading");
      loadGoogleMaps(GOOGLE_MAPS_API_KEY);
    }

    function setGoogleStatus(message, type = "") {
      const status = document.getElementById("googleApiStatus");
      if (status) {
        status.className = \`google-api-status \${type}\`;
        status.innerHTML = message;
      }
    }

    function loadGoogleMaps(apiKey) {
      if (!apiKey || googleMapsLoading || googleMapsLoaded) return;

      googleMapsLoading = true;
      setGoogleStatus("Carregando Google Maps...", "");
      setGooglePlacesConfigStatus("Carregando Maps JavaScript API e Places API...", "loading");

      window.initFreightGoogleMap = async function() {
        googleMapsLoaded = true;
        googleMapsLoading = false;
        try {
          await google.maps.importLibrary("places");
          initializeGoogleMap();
          setupFreightAddressAutocomplete();
          setGoogleStatus("Google Maps ativo. Rotas reais e sugestões de endereço estão disponíveis.", "active");
          setGooglePlacesConfigStatus("Google Maps ativo. As sugestões agora vêm do Google Maps e incluem fornecedores, empresas, obras, estabelecimentos e endereços.", "active");
          renderMap();
        } catch (error) {
          googleMapsLoaded = false;
          setGoogleStatus("Google Maps carregou, mas a Places API não está disponível. Verifique se Places API (New) está habilitada.", "error");
          setGooglePlacesConfigStatus("Places API (New) não disponível para esta chave.", "error");
        }
      };

      const existingScript = document.getElementById("googleMapsScript");
      if (existingScript) existingScript.remove();
      const script = document.createElement("script");
      script.id = "googleMapsScript";
      script.src = \`https://maps.googleapis.com/maps/api/js?key=\${encodeURIComponent(apiKey)}&loading=async&callback=initFreightGoogleMap&libraries=places&language=pt-BR&region=BR&v=weekly\`;
      script.async = true;
      script.defer = true;
      script.onerror = function() {
        googleMapsLoading = false;
        googleMapsLoaded = false;
        setGoogleStatus("Erro ao carregar Google Maps. Verifique a chave, faturamento e permissões das APIs.", "error");
        setGooglePlacesConfigStatus("Não foi possível carregar o Google Maps. Confirme a chave, o faturamento e as APIs habilitadas.", "error");
      };

      document.head.appendChild(script);
    }

    function initializeGoogleMap() {
      const googleMap = document.getElementById("googleMap");
      const fallbackMap = document.getElementById("brazilMapStage");
      if (!googleMap || !window.google || !window.google.maps) return;

      googleMap.classList.add("active");
      if (fallbackMap) fallbackMap.classList.add("hidden");

      if (!googleMapInstance) {
        googleMapInstance = new google.maps.Map(googleMap, {
          center: { lat: -14.235, lng: -51.9253 },
          zoom: 4,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true
        });
      }

      googleDirectionsService = googleDirectionsService || new google.maps.DirectionsService();
      googleDirectionsRenderer = googleDirectionsRenderer || new google.maps.DirectionsRenderer({
        map: googleMapInstance,
        suppressMarkers: true,
        preserveViewport: false,
        polylineOptions: {
          strokeColor: "#2563eb",
          strokeWeight: 6,
          strokeOpacity: 0.88
        }
      });
      ensureTruckOverlayClass();
    }

    function updateGoogleMapForFreight(freight) {
      if (!googleMapsLoaded || !window.google || !window.google.maps || !googleMapInstance || !freight) return;

      const origin = getFreightMapLocation(freight, "origin");
      const destination = getFreightMapLocation(freight, "destination");
      if (!origin || !destination) return;

      initializeGoogleMap();
      clearGoogleMapObjects(false);

      googleDirectionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        function(result, status) {
          if (status !== "OK" || !result) {
            setGoogleStatus("Google Maps ativo, mas a rota não foi encontrada para os endereços informados.", "error");
            return;
          }

          setGoogleStatus("Google Maps ativo. Rota real carregada para o frete selecionado.", "active");
          googleDirectionsRenderer.setDirections(result);

          const route = result.routes[0];
          const leg = route.legs[0];
          googleRoutePath = route.overview_path || [];

          addGoogleMarker(leg.start_location, "Coleta", origin, "origin");
          addGoogleMarker(leg.end_location, "Entrega", destination, "destination");
          animateGoogleTruckAlongRoute(freight);
        }
      );
    }

    function addGoogleMarker(position, title, label, type) {
      const color = type === "origin" ? "#2563eb" : "#dc2626";
      const marker = new google.maps.Marker({
        map: googleMapInstance,
        position,
        title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3
        }
      });
      googleMapMarkers.push(marker);

      const info = new google.maps.InfoWindow({
        content: \`<div style="font-weight:700;color:#0f172a">\${escapeHtml(title)}</div><div style="font-size:12px;color:#475569;max-width:260px">\${escapeHtml(label)}</div>\`
      });
      marker.addListener("click", () => info.open(googleMapInstance, marker));
    }

    function animateGoogleTruckAlongRoute(freight) {
      if (!googleRoutePath.length || !window.google || !window.google.maps) return;

      const progress = getPhaseRouteProgress(freight.status);
      const index = Math.max(0, Math.min(googleRoutePath.length - 1, Math.round((googleRoutePath.length - 1) * progress)));
      const position = googleRoutePath[index];

      if (!googleTruckOverlay) {
        googleTruckOverlay = new TruckOverlay(position, googleMapInstance);
      } else {
        googleTruckOverlay.setPosition(position);
      }
    }

    function clearGoogleMapObjects(clearDirections = true) {
      googleMapMarkers.forEach(marker => marker.setMap(null));
      googleMapMarkers = [];

      if (googleTruckOverlay) {
        googleTruckOverlay.setMap(null);
        googleTruckOverlay = null;
      }

      googleRoutePath = [];

      if (clearDirections && googleDirectionsRenderer) {
        googleDirectionsRenderer.set("directions", null);
      }
    }

    function TruckOverlay(position, map) {
      this.position = position;
      this.div = null;
      this.setMap(map);
    }

    function ensureTruckOverlayClass() {
      if (!window.google || !window.google.maps || window.TruckOverlayReady) return;

      TruckOverlay.prototype = new google.maps.OverlayView();

      TruckOverlay.prototype.onAdd = function() {
        const div = document.createElement("div");
        div.className = "gm-truck";
        div.innerHTML = \`<div class="box"></div><div class="cab"></div><div class="wheel-a"></div><div class="wheel-b"></div>\`;
        this.div = div;
        this.getPanes().overlayMouseTarget.appendChild(div);
      };

      TruckOverlay.prototype.draw = function() {
        if (!this.div) return;
        const projection = this.getProjection();
        const point = projection.fromLatLngToDivPixel(this.position);
        this.div.style.position = "absolute";
        this.div.style.left = \`\${point.x}px\`;
        this.div.style.top = \`\${point.y}px\`;
        this.div.style.transition = "left 900ms ease, top 900ms ease";
      };

      TruckOverlay.prototype.onRemove = function() {
        if (this.div && this.div.parentNode) {
          this.div.parentNode.removeChild(this.div);
        }
        this.div = null;
      };

      TruckOverlay.prototype.setPosition = function(position) {
        this.position = position;
        this.draw();
      };

      window.TruckOverlayReady = true;
    }


    function safeValue(id) {
      const element = document.getElementById(id);
      return element && typeof element.value === "string" ? element.value.trim() : "";
    }


    function safeValue(id) {
      const element = document.getElementById(id);
      return element && typeof element.value === "string" ? element.value.trim() : "";
    }

    function ensureQuotes(freight) {
      if (!freight) return [];
      if (!Array.isArray(freight.quotes)) {
        freight.quotes = [];
      }
      return freight.quotes;
    }

    function renderQuotes() {
      renderQuoteFreightList();
      renderSelectedQuoteWorkspace();
      renderQuoteTotalSaving();
    }

    function renderQuoteFreightList() {
      const list = document.getElementById("quoteFreightList");
      if (!list) return;

      const search = safeValue("quoteSearchInput").toLowerCase();
      let items = freights.slice();

      if (search) {
        items = items.filter(freight => {
          const text = [
            freight.id,
            freight.numeroRM,
            freight.numeroObra,
            freight.obra,
            freight.status,
            freight.enderecoColeta,
            freight.enderecoEntrega,
            freight.origem,
            freight.destino,
            freight.solicitante
          ].join(" ").toLowerCase();

          return text.includes(search);
        });
      }

      if (!items.length) {
        list.innerHTML = \`<div class="empty">Nenhum frete encontrado para cotação.</div>\`;
        return;
      }

      if (!selectedQuoteFreightId || !freights.some(item => item.id === selectedQuoteFreightId)) {
        selectedQuoteFreightId = items[0].id;
      }

      list.innerHTML = items.map(freight => {
        const quotes = ensureQuotes(freight);
        const selected = getSelectedQuote(freight);
        const saving = calculateFreightSaving(freight);
        const quoteStatus = selected ? \`Escolhida: \${selected.carrier}\` : "Sem cotação escolhida";

        return \`
          <div class="quotation-freight-item \${freight.id === selectedQuoteFreightId ? "active" : ""}" onclick="selectQuoteFreight('\${escapeJs(freight.id)}')">
            <strong>\${escapeHtml(freight.id)} · RM \${escapeHtml(freight.numeroRM || "-")}</strong>
            <span>Obra \${escapeHtml(freight.numeroObra || freight.obra || "-")} · \${escapeHtml(freight.status || "-")}</span>
            <span>\${escapeHtml(getFreightLocationDisplay(freight, "origin"))} → \${escapeHtml(getFreightLocationDisplay(freight, "destination"))}</span>
            <span class="quotation-mini-row">
              <span class="quotation-mini-badge">\${quotes.length} cotação(ões)</span>
              <span class="quotation-mini-badge green">Saving \${formatCurrency(saving.value)}</span>
            </span>
            <span style="margin-top:6px;">\${escapeHtml(quoteStatus)}</span>
          </div>
        \`;
      }).join("");
    }

    function selectQuoteFreight(id) {
      selectedQuoteFreightId = id;
      renderQuotes();
    }

    function renderSelectedQuoteWorkspace() {
      const empty = document.getElementById("quoteEmptyState");
      const workspace = document.getElementById("quoteWorkspace");
      if (!empty || !workspace) return;

      const freight = freights.find(item => item.id === selectedQuoteFreightId);

      if (!freight) {
        empty.style.display = "grid";
        workspace.style.display = "none";
        return;
      }

      empty.style.display = "none";
      workspace.style.display = "block";

      const quotes = ensureQuotes(freight);
      const saving = calculateFreightSaving(freight);

      const title = document.getElementById("quoteFreightTitle");
      const route = document.getElementById("quoteFreightRoute");
      const savingEl = document.getElementById("selectedQuoteSaving");
      const savingPct = document.getElementById("selectedQuoteSavingPct");
      const count = document.getElementById("quoteCountLabel");

      if (title) title.textContent = \`\${freight.id} · RM \${freight.numeroRM || "-"} · Obra \${freight.numeroObra || freight.obra || "-"}\`;
      if (route) route.textContent = \`\${getFreightLocationDisplay(freight, "origin")} → \${getFreightLocationDisplay(freight, "destination")}\`;
      if (savingEl) savingEl.textContent = formatCurrency(saving.value);
      if (savingPct) savingPct.textContent = \`\${saving.percent}% sobre a maior cotação\`;
      if (count) count.textContent = \`\${quotes.length} cotação(ões)\`;

      renderQuoteComparisonTable(freight);
    }

    function addQuoteToSelectedFreight() {
      const freight = freights.find(item => item.id === selectedQuoteFreightId);

      if (!freight) {
        alert("Selecione um frete.");
        return;
      }

      const carrier = safeValue("quoteCarrier");
      const price = Number(safeValue("quotePrice"));
      const payment = safeValue("quotePayment");
      const deadline = safeValue("quoteDeadline");
      const validity = safeValue("quoteValidity");
      const notes = safeValue("quoteNotes");

      if (!carrier) {
        alert("Informe a transportadora.");
        return;
      }

      if (!price || price <= 0) {
        alert("Informe um preço válido.");
        return;
      }

      const quotes = ensureQuotes(freight);

      quotes.push({
        id: \`Q-\${Date.now()}-\${Math.floor(Math.random() * 9999)}\`,
        carrier,
        price,
        payment,
        deadline,
        validity,
        notes,
        selected: false,
        createdAt: new Date().toISOString()
      });

      saveFreights();
      clearQuoteForm();
      renderAll();
      showTab("cotacao");
    }

    function clearQuoteForm() {
      ["quoteCarrier", "quotePrice", "quoteDeadline", "quoteValidity", "quoteNotes"].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
      });

      const payment = document.getElementById("quotePayment");
      if (payment) payment.value = "À vista";
    }

    function renderQuoteComparisonTable(freight) {
      const container = document.getElementById("quoteComparisonTable");
      if (!container) return;

      const quotes = ensureQuotes(freight);

      if (!quotes.length) {
        container.innerHTML = \`<div class="empty">Nenhuma cotação cadastrada.</div>\`;
        return;
      }

      const highestPrice = Math.max(...quotes.map(item => Number(item.price) || 0));
      const lowestPrice = Math.min(...quotes.map(item => Number(item.price) || 0));

      container.innerHTML = \`
        <table class="quotation-table">
          <thead>
            <tr>
              <th>Transportadora</th>
              <th>Preço cotado</th>
              <th>Pagamento</th>
              <th>Prazo</th>
              <th>Validade</th>
              <th>Saving potencial</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            \${quotes
              .slice()
              .sort((a, b) => Number(a.price) - Number(b.price))
              .map(quote => {
                const price = Number(quote.price || 0);
                const potentialSaving = Math.max(0, highestPrice - price);
                const potentialPct = highestPrice ? Math.round((potentialSaving / highestPrice) * 100) : 0;
                const isLowest = price === lowestPrice;
                const status = quote.selected
                  ? \`<span class="quotation-badge selected">Escolhida</span>\`
                  : isLowest
                    ? \`<span class="quotation-badge best">Menor preço</span>\`
                    : \`<span class="quotation-badge neutral">Cotada</span>\`;

                return \`
                  <tr class="\${quote.selected ? "selected-row" : isLowest ? "best-row" : ""}">
                    <td>
                      <strong>\${escapeHtml(quote.carrier)}</strong>
                      <div style="margin-top:4px;color:#64748b;font-size:11px;">\${escapeHtml(quote.notes || "-")}</div>
                    </td>
                    <td class="quotation-price">\${formatCurrency(price)}</td>
                    <td>\${escapeHtml(quote.payment || "-")}</td>
                    <td>\${escapeHtml(quote.deadline || "-")}</td>
                    <td>\${quote.validity ? formatDate(quote.validity) : "-"}</td>
                    <td class="quotation-saving-positive">\${formatCurrency(potentialSaving)} · \${potentialPct}%</td>
                    <td>\${status}</td>
                    <td>
                      <div class="quotation-actions">
                        <button class="btn-primary" onclick="selectBestQuote('\${escapeJs(freight.id)}', '\${escapeJs(quote.id)}')">Escolher</button>
                        <button class="btn-danger" onclick="deleteQuote('\${escapeJs(freight.id)}', '\${escapeJs(quote.id)}')">Excluir</button>
                      </div>
                    </td>
                  </tr>
                \`;
              }).join("")}
          </tbody>
        </table>
      \`;
    }

    function selectBestQuote(freightId, quoteId) {
      const freight = freights.find(item => item.id === freightId);
      if (!freight) return;

      const quotes = ensureQuotes(freight);
      quotes.forEach(quote => {
        quote.selected = quote.id === quoteId;
      });

      const selected = quotes.find(quote => quote.id === quoteId);

      if (selected) {
        const saving = calculateFreightSaving(freight);

        freight.transportadora = selected.carrier;
        freight.valorAprovado = String(selected.price);
        freight.valorFreteAprovado = selected.price;
        freight.condicaoPagamento = selected.payment;
        freight.condicaoPagamentoFrete = selected.payment;
        freight.prazoTransportadora = selected.deadline;
        freight.melhorPropostaFrete = selected.carrier;
        freight.savingFrete = saving.value;
        freight.savingFretePercentual = saving.percent;
      }

      saveFreights();
      renderAll();
      showTab("cotacao");
    }

    function deleteQuote(freightId, quoteId) {
      const freight = freights.find(item => item.id === freightId);
      if (!freight) return;

      freight.quotes = ensureQuotes(freight).filter(quote => quote.id !== quoteId);

      const selected = getSelectedQuote(freight);
      if (!selected) {
        freight.savingFrete = 0;
        freight.savingFretePercentual = 0;
      }

      saveFreights();
      renderAll();
      showTab("cotacao");
    }

    function getSelectedQuote(freight) {
      return ensureQuotes(freight).find(quote => quote.selected);
    }

    function calculateFreightSaving(freight) {
      const quotes = ensureQuotes(freight);
      const selected = getSelectedQuote(freight);

      if (quotes.length < 2 || !selected) {
        return { value: 0, percent: 0 };
      }

      const highestPrice = Math.max(...quotes.map(item => Number(item.price) || 0));
      const selectedPrice = Number(selected.price || 0);
      const value = Math.max(0, highestPrice - selectedPrice);
      const percent = highestPrice ? Math.round((value / highestPrice) * 100) : 0;

      return { value, percent };
    }

    function renderQuoteTotalSaving() {
      const totalSavingEl = document.getElementById("quoteTotalSaving");
      const quotedCountEl = document.getElementById("quotedFreightsCount");
      const totalQuotesEl = document.getElementById("totalQuotesCount");

      const totalSaving = freights.reduce((sum, freight) => sum + calculateFreightSaving(freight).value, 0);
      const quotedFreights = freights.filter(freight => ensureQuotes(freight).length > 0).length;
      const totalQuotes = freights.reduce((sum, freight) => sum + ensureQuotes(freight).length, 0);

      if (totalSavingEl) totalSavingEl.textContent = formatCurrency(totalSaving);
      if (quotedCountEl) quotedCountEl.textContent = quotedFreights;
      if (totalQuotesEl) totalQuotesEl.textContent = totalQuotes;
    }


    function renderDashboard() {
      populateDashboardFilters();
      const dashboardFreights = getDashboardFilteredFreights();
      const total = dashboardFreights.length;
      const activeFreights = dashboardFreights.filter(freight => !FINAL_PHASES.includes(freight.status));
      const active = activeFreights.length;
      const deliveredFreights = dashboardFreights.filter(freight => freight.status === "Entregue");
      const delivered = deliveredFreights.length;
      const cancelled = dashboardFreights.filter(freight => freight.status === "Cancelados").length;
      const normal = dashboardFreights.filter(freight => getFreightUrgency(freight) === "NORMAL").length;
      const urgent = dashboardFreights.filter(freight => getFreightUrgency(freight) === "URGENTE").length;
      const normalPct = total ? Math.round((normal / total) * 100) : 0;
      const urgentPct = total ? Math.round((urgent / total) * 100) : 0;
      const wrongForms = dashboardFreights.filter(freight => freight.formularioErrado === true).length;
      const wrongFormsPct = total ? Math.round((wrongForms / total) * 100) : 0;
      const completedDurations = deliveredFreights.map(getTotalProcessMs).filter(ms => Number.isFinite(ms) && ms > 0);
      const averageProcessSlaMs = completedDurations.length ? completedDurations.reduce((sum, ms) => sum + ms, 0) / completedDurations.length : 0;

      const risk = {
        red: activeFreights.filter(freight => getTrafficStatus(freight).key === "red").length,
        yellow: activeFreights.filter(freight => getTrafficStatus(freight).key === "yellow").length,
        green: activeFreights.filter(freight => getTrafficStatus(freight).key === "green").length,
        gray: cancelled
      };

      const inTransit = dashboardFreights.filter(freight => freight.status === "Em transporte").length;
      const scheduled = dashboardFreights.filter(freight => freight.status === "Coleta Agendada").length;
      const validation = dashboardFreights.filter(freight => freight.status === "Aguardando Validação da Obra").length;
      const riskRate = active ? Math.round(((risk.red + risk.yellow) / active) * 100) : 0;
      const deliveredRate = total ? Math.round((delivered / total) * 100) : 0;

      const summary = document.getElementById("dashboardFilterSummary");
      if (summary) summary.textContent = total === freights.length ? \`Base completa · \${total} frete(s)\` : \`\${total} de \${freights.length} frete(s)\`;

      renderExecutiveKpis({ total, active, delivered, cancelled, normal, urgent, normalPct, urgentPct, wrongForms, wrongFormsPct, averageProcessSlaMs, completedSlaCount: completedDurations.length, risk, inTransit, scheduled, validation, riskRate, deliveredRate });
      renderDecisionStrip({ total, active, delivered, risk, inTransit, scheduled, validation, riskRate });
      renderPhaseBarChart(total, dashboardFreights);
      renderRiskDonut(active, risk);
      renderFunnelChart(dashboardFreights);
      renderObraBarChart(dashboardFreights);
      renderDeadlineList(dashboardFreights);
      renderExecutivePhaseAverages(dashboardFreights);
      renderExecutiveInsights({ total, active, delivered, risk, inTransit, scheduled, validation, riskRate }, dashboardFreights);
    }

    function renderExecutiveKpis(data) {
      const container = document.getElementById("executiveKpis");
      if (!container) return;
      container.innerHTML = \`
        <div class="executive-kpi"><span>Solicitações de frete</span><strong>\${data.total}</strong><p>Quantidade total do recorte.</p></div>
        <div class="executive-kpi success"><span>Fretes realizados</span><strong>\${data.delivered}</strong><p>Fase Entregue · \${data.deliveredRate}%.</p></div>
        <div class="executive-kpi warning"><span>Fretes em aberto</span><strong>\${data.active}</strong><p>Demais fases, exceto entregues e cancelados.</p></div>
        <div class="executive-kpi critical"><span>Fretes cancelados</span><strong>\${data.cancelled}</strong><p>Fase Cancelados.</p></div>
        <div class="executive-kpi sla-average"><span>SLA médio do processo</span><strong>\${data.completedSlaCount ? formatDuration(data.averageProcessSlaMs, false) : "-"}</strong><p>\${data.completedSlaCount} frete(s) entregue(s) na base.</p></div>
        <div class="executive-kpi normal"><span>Normal</span><strong>\${data.normal}</strong><p>\${data.normalPct}% das solicitações.</p></div>
        <div class="executive-kpi urgent"><span>Urgente</span><strong>\${data.urgent}</strong><p>\${data.urgentPct}% das solicitações.</p></div>
        <div class="executive-kpi form-error"><span>Formulários com erro</span><strong>\${data.wrongForms}</strong><p>\${data.wrongFormsPct}% dos cards do recorte.</p></div>
      \`;
    }

    function renderDecisionStrip(data) {
      const headline = document.getElementById("decisionHeadline");
      const text = document.getElementById("decisionText");
      if (!headline || !text) return;

      if (!data.total) {
        headline.textContent = "Sem dados";
        text.textContent = "Cadastre fretes para visualizar os indicadores.";
      } else if (data.risk.red > 0) {
        headline.textContent = "Fretes vencidos";
        text.textContent = \`Há \${data.risk.red} frete(s) vencido(s). Acionar responsáveis, transportadora e pendências.\`;
      } else if (data.risk.yellow > 0) {
        headline.textContent = "Fretes em alerta";
        text.textContent = \`Há \${data.risk.yellow} frete(s) em alerta. Acionar obra e transportadora.\`;
      } else if (data.validation > 0) {
        headline.textContent = "Validação pendente";
        text.textContent = \`Existem \${data.validation} frete(s) aguardando validação da obra. Acompanhar validação com a obra.\`;
      } else {
        headline.textContent = "Carteira regular";
        text.textContent = "Carteira sem risco crítico.";
      }
    }

    function renderPhaseBarChart(total, items = freights) {
      const container = document.getElementById("phaseBarChart");
      const totalLabel = document.getElementById("phaseTotalLabel");
      if (!container) return;
      if (totalLabel) totalLabel.textContent = \`\${total} fretes\`;
      const counts = PHASES.map(phase => ({ phase, count: items.filter(freight => freight.status === phase).length }));
      const max = Math.max(1, ...counts.map(item => item.count));
      container.innerHTML = counts.map(item => \`
        <div class="hbar-row">
          <div class="hbar-label">\${escapeHtml(item.phase)}</div>
          <div class="hbar-track"><div class="hbar-fill" style="width:\${Math.max(4, (item.count / max) * 100)}%;"></div></div>
          <div class="hbar-value">\${item.count}</div>
        </div>
      \`).join("");
    }

    function renderRiskDonut(total, risk) {
      const container = document.getElementById("riskDonut");
      if (!container) return;
      if (!total) {
        container.innerHTML = \`<div class="empty">Sem fretes em aberto para exibir.</div>\`;
        return;
      }

      const rows = [
        { label: "Em atraso", value: risk.red, cls: "red" },
        { label: "Em alerta", value: risk.yellow, cls: "orange" },
        { label: "No prazo", value: risk.green, cls: "green" }
      ];

      container.innerHTML = \`
        <div class="semaphore-bar-list">
          \${rows.map(row => {
            const pct = total ? (row.value / total) * 100 : 0;
            return \`
              <div class="semaphore-bar-row">
                <div class="semaphore-bar-label">\${row.label}</div>
                <div class="semaphore-bar-track">
                  <div class="semaphore-bar-fill \${row.cls}" style="width:\${pct}%;"></div>
                </div>
                <div class="semaphore-bar-metric">\${row.value} | \${pct.toFixed(1)}%</div>
              </div>
            \`;
          }).join("")}
        </div>
        <div class="semaphore-total-strip">
          <span>Fretes ativos avaliados</span>
          <strong>\${total}</strong>
        </div>
      \`;
    }

    function renderFunnelChart(items = freights) {
      const container = document.getElementById("funnelChart");
      if (!container) return;
      const groups = [
        { label: "Solicitação / cotação", count: items.filter(f => ["Não iniciado", "Em cotação"].includes(f.status)).length },
        { label: "Validação da obra", count: items.filter(f => f.status === "Aguardando Validação da Obra").length },
        { label: "Coleta agendada", count: items.filter(f => f.status === "Coleta Agendada").length },
        { label: "Em transporte", count: items.filter(f => f.status === "Em transporte").length },
        { label: "Entregue", count: items.filter(f => f.status === "Entregue").length }
      ];
      const max = Math.max(1, ...groups.map(item => item.count));
      container.innerHTML = groups.map(item => \`<div class="funnel-step" style="--w:\${58 + (item.count / max) * 42}%;"><span>\${escapeHtml(item.label)}</span><strong>\${item.count}</strong></div>\`).join("");
    }

    function renderObraBarChart(items = freights) {
      const container = document.getElementById("obraBarChart");
      const summary = document.getElementById("obraSummaryLabel");
      if (!container) return;

      const map = new Map();
      items.forEach(freight => {
        const obra = String(freight.numeroObra || freight.obra || "Sem obra / departamento").trim();
        if (!map.has(obra)) {
          map.set(obra, { obra, count: 0, open: 0, delivered: 0, cancelled: 0 });
        }
        const row = map.get(obra);
        row.count += 1;
        if (freight.status === "Entregue") row.delivered += 1;
        else if (freight.status === "Cancelados") row.cancelled += 1;
        else row.open += 1;
      });

      const allRows = [...map.values()].sort((a, b) => b.count - a.count || a.obra.localeCompare(b.obra, "pt-BR"));
      const rows = allRows.slice(0, 8);
      const total = Math.max(1, items.length);

      if (summary) summary.textContent = \`\${allRows.length} \${allRows.length === 1 ? "unidade" : "unidades"}\`;

      if (!rows.length) {
        container.innerHTML = \`<div class="empty">Sem obras ou departamentos no recorte selecionado.</div>\`;
        return;
      }

      const max = Math.max(1, ...rows.map(item => item.count));
      const rowMarkup = rows.map((item, index) => {
        const share = (item.count / total) * 100;
        const openPct = item.count ? (item.open / item.count) * 100 : 0;
        const deliveredPct = item.count ? (item.delivered / item.count) * 100 : 0;
        const cancelledPct = item.count ? (item.cancelled / item.count) * 100 : 0;
        const barSize = Math.max(8, (item.count / max) * 100);

        return \`
          <div class="obra-ranking-row">
            <div class="obra-rank">\${String(index + 1).padStart(2, "0")}</div>
            <div class="obra-name">
              <strong title="\${escapeHtml(item.obra)}">\${escapeHtml(item.obra)}</strong>
              <span>\${item.open} em aberto · \${item.delivered} entregues · \${item.cancelled} cancelados</span>
            </div>
            <div class="obra-volume-area">
              <div class="obra-volume-track">
                <div class="obra-volume-fill" style="--bar-size:\${barSize.toFixed(1)}%">
                  \${openPct > 0 ? \`<span class="obra-segment-open" style="width:\${openPct.toFixed(1)}%"></span>\` : ""}
                  \${deliveredPct > 0 ? \`<span class="obra-segment-delivered" style="width:\${deliveredPct.toFixed(1)}%"></span>\` : ""}
                  \${cancelledPct > 0 ? \`<span class="obra-segment-cancelled" style="width:\${cancelledPct.toFixed(1)}%"></span>\` : ""}
                </div>
              </div>
              <div class="obra-volume-meta">
                <span>\${share.toFixed(1).replace(".", ",")}% da carteira</span>
                <span>\${item.count === max ? "Maior demanda" : \`\${item.count} solicitações\`}</span>
              </div>
            </div>
            <div class="obra-total">
              <strong>\${item.count}</strong>
              <span>\${item.count === 1 ? "solicitação" : "solicitações"}</span>
            </div>
          </div>
        \`;
      }).join("");

      const remaining = allRows.length - rows.length;
      container.innerHTML = \`
        <div class="obra-ranking-head">
          <span>#</span><span>Unidade</span><span>Composição e participação</span><span style="text-align:right">Volume</span>
        </div>
        \${rowMarkup}
        \${remaining > 0 ? \`<div class="obra-ranking-more">Mais \${remaining} \${remaining === 1 ? "unidade" : "unidades"} fora do ranking principal.</div>\` : ""}
        <div class="obra-ranking-legend">
          <span><i style="background:#155a82"></i>Em aberto</span>
          <span><i style="background:#22c55e"></i>Entregues</span>
          <span><i style="background:#64748b"></i>Cancelados</span>
        </div>
      \`;
    }

    function renderDeadlineList(items = freights) {
      const container = document.getElementById("deadlineList");
      if (!container) return;
      const rows = items.filter(freight => !FINAL_PHASES.includes(freight.status)).sort((a, b) => getFreightAttendanceDeadlineValue(a) - getFreightAttendanceDeadlineValue(b)).slice(0, 6);
      if (!rows.length) {
        container.innerHTML = \`<div class="empty">Sem vencimentos ativos.</div>\`;
        return;
      }
      container.innerHTML = rows.map(freight => {
        const traffic = getTrafficStatus(freight);
        return \`
          <div class="deadline-item">
            <div><strong>\${escapeHtml(freight.id)} · RM \${escapeHtml(freight.numeroRM || "-")}</strong><span>\${escapeHtml(freight.status)} | Atendimento \${formatDate(getFreightAttendanceDeadline(freight))}</span></div>
            <div class="deadline-tag \${traffic.key}">\${escapeHtml(traffic.label)}</div>
          </div>
        \`;
      }).join("");
    }

    function renderExecutivePhaseAverages(items = freights) {
      const container = document.getElementById("phaseAverages");
      if (!container) return;
      const rows = PHASES.filter(phase => !FINAL_PHASES.includes(phase)).map(phase => {
        const durations = items.map(freight => getAccumulatedPhaseMs(freight, phase)).filter(duration => Number.isFinite(duration) && duration > 0);
        const avg = durations.length ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length : 0;
        return { phase, count: durations.length, avg };
      }).filter(item => item.count > 0);
      if (!rows.length) {
        container.innerHTML = \`<div class="empty">Sem médias disponíveis para o recorte selecionado.</div>\`;
        return;
      }
      container.innerHTML = rows.map(item => \`<div class="avg-item"><div><strong>\${escapeHtml(item.phase)}</strong><span>\${item.count} frete(s) com passagem registrada</span></div><strong>\${formatDuration(item.avg, false)}</strong></div>\`).join("");
    }

    function renderExecutiveInsights(data, items = freights) {
      const bottleneck = document.getElementById("bottleneckInsight");
      const sla = document.getElementById("slaInsight");
      const priority = document.getElementById("managementPriority");
      const topPhase = PHASES.map(phase => ({ phase, count: items.filter(freight => freight.status === phase).length })).sort((a, b) => b.count - a.count)[0];
      if (bottleneck) bottleneck.textContent = topPhase && topPhase.count ? \`\${topPhase.phase} (\${topPhase.count})\` : "Sem gargalo identificado";
      if (sla) sla.textContent = data.total ? \`\${data.risk.red + data.risk.yellow} frete(s) em risco · \${data.riskRate}%\` : "Sem dados";
      if (priority) {
        if (data.risk.red > 0) priority.textContent = "Tratar vencidos";
        else if (data.validation > 0) priority.textContent = "Validar com obras";
        else if (data.scheduled > 0) priority.textContent = "Confirmar coleta";
        else priority.textContent = "Acompanhar carteira";
      }
    }

    function renderPhaseAverages() {
      const tbody = document.getElementById("phaseAverages");
      if (!tbody) return;

      tbody.innerHTML = PHASES.map(phase => {
        const durations = [];

        freights.forEach(freight => {
          (Array.isArray(freight.history) ? freight.history : []).forEach(item => {
            if (item.phase === phase) {
              const end = item.exitedAt ? new Date(item.exitedAt) : new Date();
              durations.push(end - new Date(item.enteredAt));
            }
          });
        });

        const sum = durations.reduce((acc, ms) => acc + ms, 0);
        const avg = durations.length ? sum / durations.length : 0;

        return \`
          <tr>
            <td>\${phase}</td>
            <td>\${durations.length ? formatDuration(avg, false) : "-"}</td>
            <td>\${durations.length}</td>
          </tr>
        \`;
      }).join("");
    }

    function renderPhaseCounts() {
      const tbody = document.getElementById("phaseCounts");
      if (!tbody) return;

      tbody.innerHTML = PHASES.map(phase => {
        const count = freights.filter(freight => freight.status === phase).length;
        return \`
          <tr>
            <td>\${phase}</td>
            <td>\${count}</td>
          </tr>
        \`;
      }).join("");
    }


    function getFreightReportRequestDate(freight) {
      return String(freight?.dataSolicitacao || freight?.createdAt || "").slice(0, 10);
    }

    function getFreightDeliveredAt(freight) {
      const deliveredEntries = (Array.isArray(freight?.history) ? freight.history : [])
        .filter(entry => entry?.phase === "Entregue" && entry?.enteredAt);
      return deliveredEntries.length ? deliveredEntries[deliveredEntries.length - 1].enteredAt : "";
    }

    function getFreightReportObra(freight) {
      return freight?.numeroObra || freight?.obra || freight?.centroCusto || "Não informado";
    }

    function getFreightReportOrigin(freight) {
      return getFreightLocationDisplay(freight, "origin") || freight?.enderecoColeta || freight?.origem || "Não informado";
    }

    function getFreightReportDestination(freight) {
      return getFreightLocationDisplay(freight, "destination") || freight?.enderecoEntrega || freight?.destino || "Não informado";
    }

    function getFreightReportSelectedQuote(freight) {
      return getSelectedQuote(freight) || null;
    }

    function getFreightReportCarrier(freight) {
      const selected = getFreightReportSelectedQuote(freight);
      return selected?.carrier || freight?.transportadora || freight?.melhorPropostaFrete || "Não informado";
    }

    function getFreightReportPayment(freight) {
      const selected = getFreightReportSelectedQuote(freight);
      return selected?.payment || freight?.condicaoPagamentoFrete || freight?.condicaoPagamento || "Não informado";
    }

    function getFreightReportApprovedValue(freight) {
      const selected = getFreightReportSelectedQuote(freight);
      const value = Number(selected?.price ?? freight?.valorAprovado ?? freight?.valorFreteAprovado ?? 0);
      return Number.isFinite(value) ? value : 0;
    }

    function getFreightReportSaving(freight) {
      const calculated = calculateFreightSaving(freight);
      const value = Number(freight?.savingFrete ?? calculated.value ?? 0);
      const percent = Number(freight?.savingFretePercentual ?? calculated.percent ?? 0);
      return {
        value: Number.isFinite(value) ? value : 0,
        percent: Number.isFinite(percent) ? percent : 0
      };
    }

    function fillFreightReportFilters() {
      const delivered = freights.filter(freight => freight.status === "Entregue");
      const fill = (id, placeholder, values) => {
        const select = document.getElementById(id);
        if (!select) return;
        const current = select.value;
        const unique = [...new Set(values.filter(Boolean).filter(value => value !== "Não informado"))]
          .sort((a, b) => String(a).localeCompare(String(b), "pt-BR", { numeric: true }));
        select.innerHTML = \`<option value="">\${placeholder}</option>\${unique.map(value => \`<option value="\${escapeHtml(value)}">\${escapeHtml(value)}</option>\`).join("")}\`;
        if (unique.includes(current)) select.value = current;
      };
      fill("freightReportMovement", "Todos os tipos", delivered.map(freight => freight.tipoMovimentacao || freight.tipoFrete || ""));
      fill("freightReportObra", "Todas", delivered.map(getFreightReportObra));
      fill("freightReportCarrier", "Todas", delivered.map(getFreightReportCarrier));
    }

    function getFilteredFreightReportRows() {
      const search = safeValue("freightReportSearch").toLowerCase();
      const urgency = safeValue("freightReportUrgency");
      const movement = safeValue("freightReportMovement");
      const obra = safeValue("freightReportObra");
      const carrier = safeValue("freightReportCarrier");
      const dateFrom = safeValue("freightReportDateFrom");
      const dateTo = safeValue("freightReportDateTo");

      let rows = freights.filter(freight => freight.status === "Entregue");
      if (urgency) rows = rows.filter(freight => getFreightUrgency(freight) === urgency);
      if (movement) rows = rows.filter(freight => String(freight.tipoMovimentacao || freight.tipoFrete || "") === movement);
      if (obra) rows = rows.filter(freight => getFreightReportObra(freight) === obra);
      if (carrier) rows = rows.filter(freight => getFreightReportCarrier(freight) === carrier);
      if (dateFrom) rows = rows.filter(freight => getFreightReportRequestDate(freight) >= dateFrom);
      if (dateTo) rows = rows.filter(freight => getFreightReportRequestDate(freight) <= dateTo);
      if (search) {
        rows = rows.filter(freight => [
          freight.id,
          freight.numeroRM,
          freight.numeroOC,
          freight.numeroCTE,
          getFreightReportObra(freight),
          freight.solicitante,
          freight.emailSolicitante,
          freight.tipoMovimentacao,
          freight.tipoFrete,
          getFreightReportOrigin(freight),
          getFreightReportDestination(freight),
          freight.tipoVeiculo,
          getFreightReportCarrier(freight),
          getFreightReportPayment(freight),
          freight.observacoes,
          freight.observacoesResponsavel
        ].join(" ").toLowerCase().includes(search));
      }
      return rows.sort((a, b) => new Date(getFreightDeliveredAt(b) || 0) - new Date(getFreightDeliveredAt(a) || 0));
    }

    function renderFreightReport() {
      const body = document.getElementById("freightReportBody");
      const empty = document.getElementById("freightReportEmpty");
      const summary = document.getElementById("freightReportSummary");
      if (!body || !empty) return;

      fillFreightReportFilters();
      const allDelivered = freights.filter(freight => freight.status === "Entregue");
      const rows = getFilteredFreightReportRows();
      if (summary) summary.textContent = \`Exibindo \${rows.length} de \${allDelivered.length} frete(s) entregue(s).\`;
      empty.style.display = rows.length ? "none" : "block";

      body.innerHTML = rows.map(freight => {
        const urgency = getFreightUrgency(freight);
        const saving = getFreightReportSaving(freight);
        const approvedValue = getFreightReportApprovedValue(freight);
        const isWrong = freight.formularioErrado === true;
        const collectionDate = freight.dataColetaAgendada || combineDateTime(freight.dataColetaMaterial, freight.horarioColeta);
        return \`
          <tr>
            <td><span class="freight-report-code">\${escapeHtml(freight.id || "-")}</span></td>
            <td><span class="freight-report-main">\${escapeHtml(freight.numeroRM || "-")}</span></td>
            <td><span class="freight-report-main">\${escapeHtml(freight.numeroOC || "-")}</span></td>
            <td>
              <div class="freight-cte-input-wrap">
                <input class="freight-cte-input" type="text" maxlength="60" value="\${escapeHtml(freight.numeroCTE || "")}" placeholder="Inserir Nº do CTE" autocomplete="off" data-freight-cte-id="\${escapeHtml(freight.id)}" aria-label="Número do CTE da solicitação \${escapeHtml(freight.id)}">
                <span class="freight-cte-save-status \${freight.numeroCTE ? "saved" : "pending"}" data-freight-cte-status="\${escapeHtml(freight.id)}">\${freight.numeroCTE ? "Salvo" : "Pendente"}</span>
              </div>
            </td>
            <td><span class="freight-report-main">\${escapeHtml(getFreightReportObra(freight))}</span></td>
            <td><span class="freight-report-main">\${escapeHtml(freight.solicitante || "Não informado")}</span><span class="freight-report-sub">\${escapeHtml(freight.emailSolicitante || "")}</span></td>
            <td><span class="freight-report-badge \${urgency === "URGENTE" ? "urgent" : "normal"}">\${urgency}</span></td>
            <td>\${escapeHtml(freight.tipoMovimentacao || freight.tipoFrete || "Não informado")}</td>
            <td><span class="freight-report-main">\${escapeHtml(getFreightReportOrigin(freight))}</span></td>
            <td><span class="freight-report-main">\${escapeHtml(getFreightReportDestination(freight))}</span></td>
            <td>\${escapeHtml(freight.tipoVeiculo || freight.veiculoEspecial || "Não informado")}</td>
            <td><span class="freight-report-main">\${escapeHtml(getFreightReportCarrier(freight))}</span></td>
            <td><span class="freight-report-money">\${escapeHtml(formatCurrency(approvedValue))}</span></td>
            <td>\${escapeHtml(getFreightReportPayment(freight))}</td>
            <td><span class="freight-report-money">\${escapeHtml(formatCurrency(saving.value))}</span><span class="freight-report-sub">\${saving.percent}%</span></td>
            <td>\${escapeHtml(formatDateOnlyPtBr(getFreightReportRequestDate(freight)))}</td>
            <td>\${escapeHtml(formatDate(collectionDate))}</td>
            <td>\${escapeHtml(formatDate(getFreightDeliveredAt(freight)))}</td>
            <td><span class="freight-report-sla">\${escapeHtml(getTotalProcessTime(freight))}</span></td>
            <td><span class="freight-report-badge \${isWrong ? "error" : "ok"}">\${isWrong ? "COM ERRO" : "CORRETA"}</span></td>
            <td><span class="freight-report-observation">\${escapeHtml(freight.observacoesResponsavel || "-")}</span></td>
          </tr>\`;
      }).join("");
      bindFreightReportCteInputs();
    }

    function updateFreightReportCte(freightId, rawValue, input) {
      const freight = freights.find(item => String(item.id) === String(freightId));
      if (!freight) return;
      const value = String(rawValue || "").trim().slice(0, 60);
      freight.numeroCTE = value;
      saveFreights();
      const status = document.querySelector(\`[data-freight-cte-status="\${CSS.escape(String(freightId))}"]\`);
      if (status) {
        status.textContent = value ? "Salvo" : "Pendente";
        status.className = \`freight-cte-save-status \${value ? "saved" : "pending"}\`;
      }
      if (input && input.value !== value && input.value.trim().length > 60) input.value = value;
    }

    function bindFreightReportCteInputs() {
      document.querySelectorAll("#freightReportBody .freight-cte-input").forEach(input => {
        if (input.dataset.bound === "1") return;
        input.dataset.bound = "1";
        let saveTimer = null;
        const save = () => updateFreightReportCte(input.dataset.freightCteId, input.value, input);
        input.addEventListener("input", () => {
          const status = document.querySelector(\`[data-freight-cte-status="\${CSS.escape(String(input.dataset.freightCteId || ""))}"]\`);
          if (status) {
            status.textContent = "Salvando";
            status.className = "freight-cte-save-status pending";
          }
          clearTimeout(saveTimer);
          saveTimer = setTimeout(save, 350);
        });
        input.addEventListener("change", save);
        input.addEventListener("blur", save);
        input.addEventListener("keydown", event => {
          if (event.key === "Enter") {
            event.preventDefault();
            save();
            input.blur();
          }
        });
      });
    }

    function bindFreightReportControls() {
      ["freightReportSearch","freightReportUrgency","freightReportMovement","freightReportObra","freightReportCarrier","freightReportDateFrom","freightReportDateTo"].forEach(id => {
        const element = document.getElementById(id);
        if (!element || element.dataset.bound === "1") return;
        element.dataset.bound = "1";
        element.addEventListener(element.tagName === "INPUT" ? "input" : "change", renderFreightReport);
      });

      const clear = document.getElementById("clearFreightReportFilters");
      if (clear && clear.dataset.bound !== "1") {
        clear.dataset.bound = "1";
        clear.addEventListener("click", () => {
          ["freightReportSearch","freightReportUrgency","freightReportMovement","freightReportObra","freightReportCarrier","freightReportDateFrom","freightReportDateTo"].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = "";
          });
          renderFreightReport();
        });
      }

      const exportButton = document.getElementById("exportFreightReport");
      if (exportButton && exportButton.dataset.bound !== "1") {
        exportButton.dataset.bound = "1";
        exportButton.addEventListener("click", exportFreightReportExcel);
      }
    }

    function getFreightReportExportRows() {
      return getFilteredFreightReportRows().map(freight => {
        const urgency = getFreightUrgency(freight);
        const saving = getFreightReportSaving(freight);
        const collectionDate = freight.dataColetaAgendada || combineDateTime(freight.dataColetaMaterial, freight.horarioColeta);
        return {
          "Solicitação": freight.id || "",
          "Nº RM": freight.numeroRM || "",
          "Nº da OC": freight.numeroOC || "",
          "Nº do CTE": freight.numeroCTE || "",
          "Obra / departamento": getFreightReportObra(freight),
          "Solicitante": freight.solicitante || "",
          "E-mail do solicitante": freight.emailSolicitante || "",
          "Urgência": urgency,
          "Tipo de movimentação": freight.tipoMovimentacao || freight.tipoFrete || "",
          "Origem": getFreightReportOrigin(freight),
          "Destino": getFreightReportDestination(freight),
          "Tipo de veículo": freight.tipoVeiculo || freight.veiculoEspecial || "",
          "Transportadora aprovada": getFreightReportCarrier(freight),
          "Valor aprovado": getFreightReportApprovedValue(freight),
          "Condição de pagamento": getFreightReportPayment(freight),
          "Saving": saving.value,
          "Saving %": saving.percent,
          "Data da solicitação": formatDateOnlyPtBr(getFreightReportRequestDate(freight)),
          "Data da coleta": formatDate(collectionDate),
          "Data da entrega": formatDate(getFreightDeliveredAt(freight)),
          "SLA total": getTotalProcessTime(freight),
          "Qualidade da solicitação": freight.formularioErrado === true ? "Com erro" : "Correta",
          "OBS do Responsável": freight.observacoesResponsavel || ""
        };
      });
    }

    function exportFreightReportExcelFallback(rows) {
      const headers = Object.keys(rows[0]);
      const escapeXml = value => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      const table = \`<table><thead><tr>\${headers.map(header => \`<th>\${escapeXml(header)}</th>\`).join("")}</tr></thead><tbody>\${rows.map(row => \`<tr>\${headers.map(header => \`<td>\${escapeXml(row[header])}</td>\`).join("")}</tr>\`).join("")}</tbody></table>\`;
      const blob = new Blob(["\\ufeff", table], { type: "application/vnd.ms-excel;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = \`relatorio_fretes_entregues_\${dateToInputValue(new Date())}.xls\`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    }

    function exportFreightReportExcel() {
      const rows = getFreightReportExportRows();
      if (!rows.length) {
        alert("Nenhum frete entregue disponível para exportação.");
        return;
      }
      if (!window.XLSX) {
        exportFreightReportExcelFallback(rows);
        return;
      }
      const worksheet = XLSX.utils.json_to_sheet(rows);
      worksheet["!cols"] = [
        {wch:15},{wch:12},{wch:15},{wch:22},{wch:24},{wch:30},{wch:11},{wch:24},{wch:44},{wch:44},{wch:22},
        {wch:30},{wch:16},{wch:24},{wch:16},{wch:12},{wch:18},{wch:22},{wch:22},{wch:18},{wch:22},{wch:50}
      ];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Fretes Entregues");
      XLSX.writeFile(workbook, \`relatorio_fretes_entregues_\${dateToInputValue(new Date())}.xlsx\`);
    }

    function renderHistory() {
      const tbody = document.getElementById("historyTable");
      if (!tbody) return;

      const rows = [];

      freights.forEach(freight => {
        (Array.isArray(freight.history) ? freight.history : []).forEach(item => {
          rows.push(\`
            <tr>
              <td>\${freight.id}</td>
              <td>\${escapeHtml(freight.obra)}</td>
              <td>\${item.phase}</td>
              <td>\${formatDate(item.enteredAt)}</td>
              <td>\${formatDate(item.exitedAt)}</td>
              <td>\${formatDuration(getBusinessDurationMs(new Date(item.enteredAt), item.exitedAt ? new Date(item.exitedAt) : new Date()), false)}</td>
            </tr>
          \`);
        });
      });

      tbody.innerHTML = rows.length ? rows.join("") : \`
        <tr>
          <td colspan="6">Nenhum histórico disponível.</td>
        </tr>
      \`;
    }

    function populateObraFilter() {
      const filter = document.getElementById("obraFilter");
      if (!filter) return;

      const current = filter.value;
      const obras = [...new Set(freights.map(item => item.numeroObra || item.obra).filter(Boolean))].sort();

      filter.innerHTML = \`<option value="">Todas as obras</option>\` +
        obras.map(obra => \`<option value="\${escapeHtml(obra)}">\${escapeHtml(obra)}</option>\`).join("");

      filter.value = current;
    }

    function clearAllData() {
      if (!confirm("Tem certeza que deseja apagar todas as solicitações salvas neste navegador?")) return;
      freights = [];
      saveFreights();
      renderAll();
    }

    function loadDemoData() {
      const now = new Date();

      const example = {
        numeroRM: "17901",
        numeroObra: "949",
        obra: "Obra/Depto 949",
        solicitante: "CAMILE",
        telefoneSolicitante: "21980931551",
        centroCusto: "949",
        urgencia: "URGENTE",
        prioridade: "URGENTE",
        tipoMovimentacao: "Movimentação entre obras",
        tipoFrete: "Movimentação entre obras",
        particularidadeObra: "RODOVIA",
        enderecoColeta: "R. AÇU, 1500 - DIQUE DE CAXIAIS, RJ",
        cepColeta: "25010-000",
        enderecoEntrega: "RUA CARLOS DREHER NETO, 2944 - SALGADO - BENTO GONÇALVES, RS",
        cepEntrega: "95706-006",
        origem: "R. AÇU, 1500 - DIQUE DE CAXIAIS, RJ",
        destino: "RUA CARLOS DREHER NETO, 2944 - SALGADO - BENTO GONÇALVES, RS",
        dataColetaMaterial: "2026-06-08",
        horarioColeta: "08:00",
        dataColetaDesejada: "2026-06-08T08:00",
        tipoVeiculo: "Caminhão 3/4",
        implemento: "Carroceria Aberta",
        capacidadePrancha: "",
        tamanhoPrancha: "",
        tracaoVeiculo: "",
        observacoesVeiculoOperacao: "Necessário enlonamento durante o transporte.",
        veiculoEspecial: "3X4 como sugestão",
        freteCompartilhado: "NÃO",
        operadorDescarga: "Não necessita",
        responsavelRecebimento: "Amaro = +55 21 99794-1371",
        ordemColeta: "86693",
        pedidoCompra: "86693",
        notaFiscal: "NÃO PRECISA. O FORNECEDOR IRÁ EMITIR A NF.",
        materiais: "Itens: Camisa social manga longa masculina G - 10 un; Camisa social manga longa masculina GG - 10 un; Camisa social manga longa feminina P - 2 un; Camisa social manga longa feminina PP - 2 un; Polo azul feminina P - 2 un; Polo azul feminina PP - 2 un; Jaqueta com refletivo M - 6 un; Jaqueta com refletivo G - 8 un; Jaqueta com refletivo GG - 3 un; Blusa azul sem faixa refletiva M - 25 un; Blusa azul sem faixa refletiva G - 30 un; Blusa azul sem faixa refletiva GG - 30 un; Blusa azul sem faixa refletiva XXG - 25 un. OBRA 967: 29 unidades, peso estimado 16,9 kg, considerar 17 a 20 kg para cotação, valor declarado R$ 2.626,00. Itens: uniforme conjunto de brim forte, uniforme antichama, jaquetas, moletons, camisas sociais e conjuntos de brim. Moletons - 40 unidades.",
        dimensoesCarga: "OBRA 949: 52 conjuntos de brim, aproximadamente 62,4 kg; 40 moletons, aproximadamente 28,0 kg. Peso estimado total da carga: 90,4 kg. Considerar 90 a 100 kg para cotação. Valor declarado: R$ 10.424,00. Total de peças: 92 unidades. OBRA 963: 155 unidades. Peso estimado: 100,5 kg, considerar 100 a 110 kg para cotação. Valor declarado: R$ 10.090,00.",
        tipoMaterial: "Uniformes, moletons, jaquetas e conjuntos de brim",
        totalPecas: "92 unidades + itens complementares das obras 963 e 967",
        volumes: "92 unidades + itens complementares das obras 963 e 967",
        pesoTotalCarga: "145.40",
        peso: "145.40",
        valorTotalCarga: "23140.00",
        fornecedorNome: "SEEL ENGENHARIA",
        fornecedorCnpj: "72.030.927/0001-85",
        responsavelSupply: "",
        transportadora: "",
        valorAprovado: "",
        dataLimiteEntrega: addHours(now, 72),
        dataColetaAgendada: "2026-06-08T08:00",
        observacoes: "Solicitação importada do formulário padrão de frete.",
        status: "Não iniciado"
      };

      const alreadyLoaded = freights.some(item => item.numeroRM === example.numeroRM && item.numeroObra === example.numeroObra);
      if (alreadyLoaded) {
        alert("O exemplo da RM 17901 já foi carregado.");
        return;
      }

      const createdAt = new Date().toISOString();
      freights.push({
        id: generateId(),
        createdAt,
        ...example,
        history: makeDemoHistory(example.status, createdAt)
      });

      saveFreights();
      renderAll();
    }

    function makeDemoHistory(status, createdAt) {
      const statusIndex = PHASES.indexOf(status);
      const history = [];
      let cursor = new Date(createdAt);

      for (let i = 0; i <= statusIndex; i++) {
        const enteredAt = new Date(cursor);
        const exitedAt = i === statusIndex ? null : new Date(cursor.getTime() + (2 + i * 3) * 60 * 60 * 1000);
        history.push({
          phase: PHASES[i],
          enteredAt: enteredAt.toISOString(),
          exitedAt: exitedAt ? exitedAt.toISOString() : null
        });

        if (exitedAt) cursor = exitedAt;
      }

      return history;
    }

    function addHours(date, hours) {
      const d = new Date(date.getTime() + hours * 60 * 60 * 1000);
      const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 16);
    }

    function formatCurrency(value) {
      const number = Number(value);
      if (!value || Number.isNaN(number)) return "-";
      return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }

    function escapeJs(value) {
      return String(value || "").replaceAll("\\\\", "\\\\\\\\").replaceAll("'", "\\\\'").replaceAll('"', '\\\\"');
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }



    /* Autocomplete de endereços do formulário de fretes */
    const FREIGHT_ADDRESS_RECENT_KEY = "gestao_fretes_enderecos_recentes_v1";
    const freightAddressAutocompleteState = {
      timers: new Map(),
      controllers: new Map(),
      activeIndex: new Map(),
      cache: new Map(),
      locationBias: null,
      googleSessionTokens: new Map(),
      googleRequestIds: new Map()
    };

    function normalizeAddressSearch(value) {
      return String(value || "")
        .normalize("NFD")
        .replace(/[\\u0300-\\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\\s]/g, " ")
        .replace(/\\s+/g, " ")
        .trim();
    }

    function getFreightAddressConfigs() {
      return [
        { inputId: "enderecoColeta", cepId: "cepColeta", label: "coleta" },
        { inputId: "enderecoEntrega", cepId: "cepEntrega", label: "entrega" }
      ];
    }

    function getAddressHelper(inputId) {
      return document.getElementById(\`\${inputId}AddressHelper\`);
    }

    function setAddressHelper(inputId, message, type = "") {
      const helper = getAddressHelper(inputId);
      if (!helper) return;
      helper.textContent = message;
      helper.className = \`address-autocomplete-helper \${type}\`.trim();
    }

    function getAddressSuggestionList(inputId) {
      return document.getElementById(\`\${inputId}AddressSuggestions\`);
    }

    function hideAddressSuggestions(inputId) {
      const input = document.getElementById(inputId);
      const list = getAddressSuggestionList(inputId);
      if (list) {
        list.hidden = true;
        list.innerHTML = "";
      }
      if (input) input.setAttribute("aria-expanded", "false");
      freightAddressAutocompleteState.activeIndex.set(inputId, -1);
    }

    function loadRecentFreightAddresses() {
      try {
        const stored = JSON.parse(localStorage.getItem(FREIGHT_ADDRESS_RECENT_KEY));
        return Array.isArray(stored) ? stored : [];
      } catch (error) {
        return [];
      }
    }

    function rememberFreightAddress(suggestion) {
      const label = String(suggestion?.label || "").trim();
      if (!label) return;
      const recent = loadRecentFreightAddresses().filter(item => normalizeAddressSearch(item.label) !== normalizeAddressSearch(label));
      recent.unshift({
        label,
        postcode: String(suggestion.postcode || ""),
        lat: Number.isFinite(Number(suggestion.lat)) ? Number(suggestion.lat) : null,
        lon: Number.isFinite(Number(suggestion.lon)) ? Number(suggestion.lon) : null,
        source: "recent"
      });
      localStorage.setItem(FREIGHT_ADDRESS_RECENT_KEY, JSON.stringify(recent.slice(0, 20)));
    }

    function localFreightAddressSuggestions(query, config) {
      const normalizedQuery = normalizeAddressSearch(query);
      if (!normalizedQuery) return [];
      const words = normalizedQuery.split(" ").filter(Boolean);
      const candidates = [];

      const addCandidate = (label, postcode = "", source = "salvo") => {
        const cleanLabel = String(label || "").trim();
        if (!cleanLabel) return;
        const normalizedLabel = normalizeAddressSearch(cleanLabel);
        const matches = normalizedLabel.includes(normalizedQuery) || words.every(word => normalizedLabel.includes(word));
        if (!matches) return;
        candidates.push({ label: cleanLabel, postcode: String(postcode || ""), source });
      };

      loadRecentFreightAddresses().forEach(item => addCandidate(item.label, item.postcode, "recente"));
      freights.forEach(freight => {
        const collectionAddress = freight.enderecoColeta || freight.origem;
        const deliveryAddress = freight.enderecoEntrega || freight.destino;
        const supplierName = String(freight.fornecedorNome || freight.transportadora || freight.fornecedor || "").trim();
        addCandidate(collectionAddress, freight.cepColeta, "histórico de fretes");
        addCandidate(deliveryAddress, freight.cepEntrega, "histórico de fretes");
        if (supplierName && collectionAddress) addCandidate(\`\${supplierName} - \${collectionAddress}\`, freight.cepColeta, "fornecedor já utilizado");
        if (supplierName && deliveryAddress) addCandidate(\`\${supplierName} - \${deliveryAddress}\`, freight.cepEntrega, "fornecedor já utilizado");
      });

      const seen = new Set();
      return candidates.filter(item => {
        const key = normalizeAddressSearch(item.label);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 6);
    }

    function formatPhotonAddress(feature) {
      const props = feature?.properties || {};
      const parts = [];
      const pushUnique = value => {
        const clean = String(value || "").trim();
        if (!clean) return;
        const normalized = normalizeAddressSearch(clean);
        if (!parts.some(part => normalizeAddressSearch(part) === normalized)) parts.push(clean);
      };

      const street = String(props.street || "").trim();
      const houseNumber = String(props.housenumber || "").trim();
      const name = String(props.name || "").trim();
      if (name && normalizeAddressSearch(name) !== normalizeAddressSearch(street)) pushUnique(name);
      if (street) pushUnique(houseNumber ? \`\${street}, \${houseNumber}\` : street);
      else if (houseNumber && name) pushUnique(\`\${name}, \${houseNumber}\`);
      pushUnique(props.district || props.suburb || props.locality);
      pushUnique(props.city || props.town || props.village || props.municipality || props.county);
      pushUnique(props.state);
      pushUnique(props.postcode);
      pushUnique(props.country || "Brasil");

      const coordinates = Array.isArray(feature?.geometry?.coordinates) ? feature.geometry.coordinates : [];
      return {
        label: parts.join(" - ") || name,
        postcode: String(props.postcode || ""),
        lat: Number(coordinates[1]),
        lon: Number(coordinates[0]),
        source: "sugestão online"
      };
    }

    function mergeAddressSuggestions(localItems, remoteItems) {
      const seen = new Set();
      return [...localItems, ...remoteItems].filter(item => {
        const key = normalizeAddressSearch(item?.label);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 8);
    }

    function selectFreightAddressSuggestion(config, suggestion) {
      const input = document.getElementById(config.inputId);
      const cepInput = document.getElementById(config.cepId);
      if (!input) return;

      input.value = suggestion.label || input.value;
      input.classList.add("address-selected");
      input.dataset.selectedAddress = input.value;
      if (Number.isFinite(Number(suggestion.lat)) && Number.isFinite(Number(suggestion.lon))) {
        input.dataset.latitude = String(suggestion.lat);
        input.dataset.longitude = String(suggestion.lon);
        freightAddressAutocompleteState.locationBias = { lat: Number(suggestion.lat), lon: Number(suggestion.lon) };
      }
      if (cepInput && suggestion.postcode) cepInput.value = suggestion.postcode;

      rememberFreightAddress(suggestion);
      hideAddressSuggestions(config.inputId);
      setAddressHelper(config.inputId, "Endereço selecionado. Revise o número e o complemento antes de salvar.", "success");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      if (cepInput && suggestion.postcode) cepInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function renderFreightAddressSuggestions(config, suggestions) {
      const input = document.getElementById(config.inputId);
      const list = getAddressSuggestionList(config.inputId);
      if (!input || !list) return;
      list.innerHTML = "";
      freightAddressAutocompleteState.activeIndex.set(config.inputId, -1);

      if (!suggestions.length) {
        hideAddressSuggestions(config.inputId);
        setAddressHelper(config.inputId, "Nenhuma sugestão encontrada. Tente o nome do fornecedor/local junto com a cidade ou UF.");
        return;
      }

      suggestions.forEach((suggestion, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "address-suggestion-button";
        button.setAttribute("role", "option");
        button.dataset.suggestionIndex = String(index);
        button.innerHTML = \`
          <span class="address-suggestion-icon">MAP</span>
          <span class="address-suggestion-copy">
            <strong>\${escapeHtml(suggestion.label)}</strong>
            <span class="\${suggestion.source === "Google Maps" ? "google-source" : ""}">\${escapeHtml(suggestion.source || "endereço sugerido")}\${suggestion.postcode ? \` · CEP \${escapeHtml(suggestion.postcode)}\` : ""}</span>
          </span>\`;
        button.addEventListener("mousedown", event => event.preventDefault());
        button.addEventListener("click", event => {
          event.preventDefault();
          if (suggestion.placePrediction) selectGooglePlacePrediction(config, suggestion);
          else selectFreightAddressSuggestion(config, suggestion);
        });
        list.appendChild(button);
      });

      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      setAddressHelper(config.inputId, \`\${suggestions.length} opção(ões) encontrada(s). Pode ser endereço, fornecedor, empresa ou local. Use as setas e Enter para selecionar.\`, "success");
    }

    function moveFreightAddressSuggestionSelection(config, direction) {
      const list = getAddressSuggestionList(config.inputId);
      if (!list || list.hidden) return;
      const buttons = Array.from(list.querySelectorAll(".address-suggestion-button"));
      if (!buttons.length) return;
      let index = Number(freightAddressAutocompleteState.activeIndex.get(config.inputId) ?? -1);
      index = (index + direction + buttons.length) % buttons.length;
      freightAddressAutocompleteState.activeIndex.set(config.inputId, index);
      buttons.forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === index));
      buttons[index].scrollIntoView({ block: "nearest" });
    }

    async function selectGooglePlacePrediction(config, suggestion) {
      const prediction = suggestion?.placePrediction;
      if (!prediction || typeof prediction.toPlace !== "function") {
        selectFreightAddressSuggestion(config, suggestion);
        return;
      }
      setAddressHelper(config.inputId, "Carregando dados completos do local no Google Maps...", "searching");
      try {
        const place = prediction.toPlace();
        await place.fetchFields({ fields: ["displayName", "formattedAddress", "location", "addressComponents"] });
        const placeName = String(place.displayName || "").trim();
        const formattedAddress = String(place.formattedAddress || "").trim();
        const label = placeName && formattedAddress && normalizeAddressSearch(placeName) !== normalizeAddressSearch(formattedAddress)
          ? \`\${placeName} - \${formattedAddress}\`
          : String(formattedAddress || placeName || suggestion.label || "").trim();
        const postal = Array.isArray(place.addressComponents)
          ? place.addressComponents.find(component => Array.isArray(component.types) && component.types.includes("postal_code"))
          : null;
        const postcode = String(postal?.longText || postal?.shortText || "").trim();
        const location = place.location;
        selectFreightAddressSuggestion(config, {
          label,
          postcode,
          lat: typeof location?.lat === "function" ? location.lat() : Number(location?.lat),
          lon: typeof location?.lng === "function" ? location.lng() : Number(location?.lng),
          source: "Google Maps"
        });
        const placesLibrary = await google.maps.importLibrary("places");
        if (placesLibrary?.AutocompleteSessionToken) {
          freightAddressAutocompleteState.googleSessionTokens.set(config.inputId, new placesLibrary.AutocompleteSessionToken());
        }
      } catch (error) {
        setAddressHelper(config.inputId, "O Google Maps encontrou o local, mas não conseguiu carregar os detalhes. Tente selecionar novamente.", "error");
      }
    }

    async function fetchFreightAddressSuggestions(config, query) {
      const normalizedQuery = normalizeAddressSearch(query);
      if (normalizedQuery.length < 3) {
        hideAddressSuggestions(config.inputId);
        setAddressHelper(config.inputId, "Digite pelo menos 3 caracteres para pesquisar no Google Maps.");
        return;
      }

      const localItems = localFreightAddressSuggestions(query, config);
      if (!hasConfiguredGoogleMapsKey()) {
        if (localItems.length) {
          renderFreightAddressSuggestions(config, localItems);
          setAddressHelper(config.inputId, "Exibindo locais já utilizados. Configure a chave acima para pesquisar no Google Maps.");
        } else {
          hideAddressSuggestions(config.inputId);
          setAddressHelper(config.inputId, "Configure a chave acima para pesquisar fornecedores, empresas, locais e endereços no Google Maps.", "error");
        }
        return;
      }

      if (!googleMapsLoaded || !window.google?.maps?.importLibrary) {
        if (localItems.length) renderFreightAddressSuggestions(config, localItems);
        setAddressHelper(config.inputId, "Carregando pesquisa do Google Maps...", "searching");
        activateGoogleMapsIfConfigured();
        return;
      }

      const requestId = Number(freightAddressAutocompleteState.googleRequestIds.get(config.inputId) || 0) + 1;
      freightAddressAutocompleteState.googleRequestIds.set(config.inputId, requestId);
      setAddressHelper(config.inputId, "Pesquisando no Google Maps por endereços, fornecedores, empresas, obras e locais...", "searching");

      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary("places");
        if (!AutocompleteSuggestion?.fetchAutocompleteSuggestions) throw new Error("Google Place Autocomplete indisponível");
        let token = freightAddressAutocompleteState.googleSessionTokens.get(config.inputId);
        if (!token && AutocompleteSessionToken) {
          token = new AutocompleteSessionToken();
          freightAddressAutocompleteState.googleSessionTokens.set(config.inputId, token);
        }
        const request = {
          input: query,
          language: "pt-BR",
          region: "br",
          includedRegionCodes: ["br"],
          sessionToken: token
        };
        const bias = freightAddressAutocompleteState.locationBias;
        if (bias && Number.isFinite(bias.lat) && Number.isFinite(bias.lon)) {
          request.origin = { lat: bias.lat, lng: bias.lon };
        }
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        if (freightAddressAutocompleteState.googleRequestIds.get(config.inputId) !== requestId) return;
        const googleItems = (Array.isArray(suggestions) ? suggestions : [])
          .map(item => item?.placePrediction)
          .filter(Boolean)
          .map(prediction => ({
            label: prediction.text?.toString?.() || "Local encontrado",
            source: "Google Maps",
            postcode: "",
            placePrediction: prediction
          }));
        const finalItems = googleItems.length ? googleItems : localItems;
        renderFreightAddressSuggestions(config, finalItems);
        if (googleItems.length) {
          setAddressHelper(config.inputId, \`\${googleItems.length} sugestão(ões) encontrada(s) no Google Maps. Selecione uma opção para preencher o endereço completo.\`, "success");
        }
      } catch (error) {
        if (localItems.length) {
          renderFreightAddressSuggestions(config, localItems);
          setAddressHelper(config.inputId, "A pesquisa do Google Maps não respondeu. Exibindo locais já utilizados.", "error");
        } else {
          hideAddressSuggestions(config.inputId);
          setAddressHelper(config.inputId, "Não foi possível pesquisar no Google Maps. Verifique a chave e se Places API (New) está habilitada.", "error");
        }
      }
    }

    function scheduleFreightAddressSuggestions(config) {
      const input = document.getElementById(config.inputId);
      if (!input) return;
      const previousTimer = freightAddressAutocompleteState.timers.get(config.inputId);
      if (previousTimer) window.clearTimeout(previousTimer);
      const timer = window.setTimeout(() => fetchFreightAddressSuggestions(config, input.value.trim()), 360);
      freightAddressAutocompleteState.timers.set(config.inputId, timer);
    }

    async function bindGooglePlacesAddressInput(config, input) {
      if (!input || !googleMapsLoaded || !window.google?.maps?.importLibrary) return false;
      try {
        const placesLibrary = await google.maps.importLibrary("places");
        if (!placesLibrary?.AutocompleteSuggestion?.fetchAutocompleteSuggestions) return false;
        input.dataset.googlePlacesBound = "1";
        input.dataset.addressProvider = "google-maps-new";
        if (!freightAddressAutocompleteState.googleSessionTokens.get(config.inputId) && placesLibrary.AutocompleteSessionToken) {
          freightAddressAutocompleteState.googleSessionTokens.set(config.inputId, new placesLibrary.AutocompleteSessionToken());
        }
        setAddressHelper(config.inputId, "Digite endereço, fornecedor, empresa, obra ou local. As sugestões serão pesquisadas no Google Maps.", "success");
        return true;
      } catch (error) {
        input.dataset.googlePlacesBound = "0";
        return false;
      }
    }

    function setupFreightCepLookup(config) {
      const cepInput = document.getElementById(config.cepId);
      const addressInput = document.getElementById(config.inputId);
      if (!cepInput || !addressInput || cepInput.dataset.cepLookupBound === "1") return;
      cepInput.dataset.cepLookupBound = "1";
      let timer = null;
      let controller = null;

      const lookup = () => {
        const digits = cepInput.value.replace(/\\D/g, "");
        if (digits.length !== 8) return;
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(async () => {
          if (controller) controller.abort();
          controller = new AbortController();
          try {
            const response = await fetch(\`https://viacep.com.br/ws/\${digits}/json/\`, { signal: controller.signal });
            if (!response.ok) return;
            const data = await response.json();
            if (data?.erro) return;
            const filledAddress = [data.logradouro, data.bairro, data.localidade, data.uf].filter(Boolean).join(" - ");
            if (filledAddress && (!addressInput.value.trim() || addressInput.dataset.filledByCep === "1")) {
              addressInput.value = filledAddress;
              addressInput.dataset.filledByCep = "1";
              addressInput.classList.add("address-selected");
              setAddressHelper(config.inputId, "Endereço preenchido pelo CEP. Acrescente o número e o complemento.", "success");
              addressInput.dispatchEvent(new Event("input", { bubbles: true }));
            }
          } catch (error) {
            if (error?.name !== "AbortError") console.warn("Não foi possível consultar o CEP.", error);
          }
        }, 350);
      };

      cepInput.addEventListener("input", lookup);
      cepInput.addEventListener("blur", lookup);
    }

    function setupFreightAddressAutocomplete() {
      getFreightAddressConfigs().forEach(config => {
        const input = document.getElementById(config.inputId);
        if (!input) return;
        const host = input.closest("[data-form-key]") || input.parentElement;
        if (!host) return;
        host.classList.add("address-autocomplete-host");
        input.classList.add("address-autocomplete-input");
        input.placeholder = "Digite rua, fornecedor, empresa, obra ou nome do local";
        input.setAttribute("autocomplete", "off");
        input.setAttribute("spellcheck", "false");
        input.setAttribute("role", "combobox");
        input.setAttribute("aria-autocomplete", "list");
        input.setAttribute("aria-expanded", "false");

        let helper = getAddressHelper(config.inputId);
        if (!helper) {
          helper = document.createElement("div");
          helper.id = \`\${config.inputId}AddressHelper\`;
          helper.className = "address-autocomplete-helper";
          helper.textContent = "Digite pelo menos 3 caracteres para pesquisar no Google Maps.";
          host.appendChild(helper);
        }

        let suggestions = getAddressSuggestionList(config.inputId);
        if (!suggestions) {
          suggestions = document.createElement("div");
          suggestions.id = \`\${config.inputId}AddressSuggestions\`;
          suggestions.className = "address-autocomplete-suggestions";
          suggestions.hidden = true;
          suggestions.setAttribute("role", "listbox");
          host.appendChild(suggestions);
        }
        input.setAttribute("aria-controls", suggestions.id);

        if (input.dataset.addressAutocompleteBound !== "1") {
          input.dataset.addressAutocompleteBound = "1";
          input.addEventListener("input", () => {
            if (input.dataset.selectedAddress !== input.value) input.classList.remove("address-selected");
            scheduleFreightAddressSuggestions(config);
          });
          input.addEventListener("focus", () => {
            if (input.value.trim().length >= 3) scheduleFreightAddressSuggestions(config);
          });
          input.addEventListener("blur", () => window.setTimeout(() => hideAddressSuggestions(config.inputId), 180));
          input.addEventListener("keydown", event => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              moveFreightAddressSuggestionSelection(config, 1);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              moveFreightAddressSuggestionSelection(config, -1);
            } else if (event.key === "Enter") {
              const list = getAddressSuggestionList(config.inputId);
              const active = list?.querySelector(".address-suggestion-button.active");
              if (active) {
                event.preventDefault();
                active.click();
              }
            } else if (event.key === "Escape") {
              hideAddressSuggestions(config.inputId);
            }
          });
        }

        void bindGooglePlacesAddressInput(config, input);
        setupFreightCepLookup(config);
      });
    }


    function checkAppTabsHealth() {
      const sections = ["form", "kanban", "dashboard", "report", "mapa", "cotacao", "history", "editor"];
      return sections.map(id => ({
        aba: id,
        existe: Boolean(document.getElementById(id)),
        ativa: Boolean(document.getElementById(id)?.classList.contains("active"))
      }));
    }
<\/script>
</body>
</html>
`;export{e as default};