type Tone = "dark" | "light";

function palette(tone: Tone) {
  if (tone === "dark") {
    return {
      stroke: "#7DD3FC",
      muted: "#93C5FD",
      fill: "rgba(37, 99, 235, 0.16)",
      text: "#E0F2FE",
      line: "rgba(125, 211, 252, 0.7)",
    };
  }
  return {
    stroke: "#1D4ED8",
    muted: "#1E40AF",
    fill: "#EFF6FF",
    text: "#1C2838",
    line: "#2563EB",
  };
}

export function ProjectVisual({
  kind,
  tone = "dark",
}: {
  kind: "pactis" | "blinky" | "webhook";
  tone?: Tone;
}) {
  if (kind === "pactis") return <PactisVisual tone={tone} />;
  if (kind === "blinky") return <BlinkyVisual tone={tone} />;
  return <WebhookVisual tone={tone} />;
}

function PactisVisual({ tone }: { tone: Tone }) {
  const color = palette(tone);
  return (
    <svg viewBox="0 0 320 220" role="img" className="h-full w-full">
      <title>Two wallets writing to one ledger</title>
      <rect x="18" y="28" width="120" height="70" rx="12" fill={color.fill} stroke={color.stroke} />
      <text x="36" y="56" fill={color.muted} fontSize="11" fontFamily="ui-monospace, monospace">
        WALLET A
      </text>
      <text x="36" y="78" fill={color.text} fontSize="16" fontFamily="ui-sans-serif, system-ui">
        debit
      </text>
      <rect x="182" y="28" width="120" height="70" rx="12" fill={color.fill} stroke={color.stroke} />
      <text x="200" y="56" fill={color.muted} fontSize="11" fontFamily="ui-monospace, monospace">
        WALLET B
      </text>
      <text x="200" y="78" fill={color.text} fontSize="16" fontFamily="ui-sans-serif, system-ui">
        credit
      </text>
      <path className="flow-line" d="M78 98 V128 H160" fill="none" stroke={color.line} strokeWidth="1.5" />
      <path className="flow-line" d="M242 98 V128 H160" fill="none" stroke={color.line} strokeWidth="1.5" />
      <rect x="70" y="128" width="180" height="64" rx="12" fill={color.fill} stroke={color.stroke} />
      <text x="88" y="154" fill={color.muted} fontSize="11" fontFamily="ui-monospace, monospace">
        LEDGER · SAME TRANSACTION
      </text>
      <text x="88" y="176" fill={color.text} fontSize="13" fontFamily="ui-sans-serif, system-ui">
        idempotency key + lock
      </text>
    </svg>
  );
}

function BlinkyVisual({ tone }: { tone: Tone }) {
  const color = palette(tone);
  const states = ["PENDING", "PAID", "FAILED", "EXPIRED"];
  return (
    <svg viewBox="0 0 320 220" role="img" className="h-full w-full">
      <title>Lightning payment states from pending to a terminal result</title>
      <circle cx="48" cy="58" r="18" fill={color.fill} stroke={color.stroke} />
      <path d="M50 46 L42 60 H50 L46 72 L58 56 H50 Z" fill={color.stroke} />
      <text x="78" y="54" fill={color.muted} fontSize="11" fontFamily="ui-monospace, monospace">
        INVOICE
      </text>
      <text x="78" y="74" fill={color.text} fontSize="14" fontFamily="ui-sans-serif, system-ui">
        then the webhook
      </text>
      {states.map((state, index) => (
        <g key={state} transform={`translate(${24 + (index % 2) * 146}, ${112 + Math.floor(index / 2) * 44})`}>
          <rect width="128" height="32" rx="16" fill={color.fill} stroke={color.stroke} />
          <text x="16" y="21" fill={color.text} fontSize="12" fontFamily="ui-monospace, monospace">
            {state}
          </text>
        </g>
      ))}
    </svg>
  );
}

function WebhookVisual({ tone }: { tone: Tone }) {
  const color = palette(tone);
  const steps = ["Event", "Queue", "Worker", "Retry", "Delivered"];
  return (
    <svg viewBox="0 0 320 220" role="img" className="h-full w-full">
      <title>Webhook event moving through a queue, worker, retry, and delivery</title>
      {steps.map((step, index) => (
        <g key={step} transform={`translate(24, ${18 + index * 40})`}>
          <circle cx="10" cy="12" r="5" fill={color.stroke} className="flow-node" />
          {index < steps.length - 1 ? (
            <path d="M10 18 V34" stroke={color.line} className="flow-line" />
          ) : null}
          <text x="28" y="16" fill={color.text} fontSize="13" fontFamily="ui-monospace, monospace">
            {step}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SystemGraph() {
  return (
    <figure className="relative">
      <svg viewBox="0 0 560 420" className="h-auto w-full" aria-hidden="true">
        <path className="flow-line" d="M150 78 V132" stroke="#67E8F9" fill="none" strokeWidth="1.4" />
        <path className="flow-line" d="M150 176 V230" stroke="#67E8F9" fill="none" strokeWidth="1.4" />
        <path className="flow-line" d="M150 274 V328" stroke="#67E8F9" fill="none" strokeWidth="1.4" />
        <path className="flow-line" d="M250 64 C310 64 330 150 390 150" stroke="#93C5FD" fill="none" strokeWidth="1.2" />
        <path className="flow-line" d="M250 160 C320 160 340 246 390 246" stroke="#93C5FD" fill="none" strokeWidth="1.2" />
        <path className="flow-line" d="M250 256 C320 256 340 342 390 342" stroke="#93C5FD" fill="none" strokeWidth="1.2" />
        <path className="flow-line" d="M470 176 V230" stroke="#67E8F9" fill="none" strokeWidth="1.2" />
        <GraphNode x={40} y={40} label="Frontend" />
        <GraphNode x={40} y={138} label="API" />
        <GraphNode x={40} y={236} label="Services" />
        <GraphNode x={40} y={334} label="Database" />
        <GraphNode x={390} y={40} label="Payments" />
        <GraphNode x={390} y={138} label="Lightning" />
        <GraphNode x={390} y={236} label="Webhooks" />
        <GraphNode x={390} y={334} label="External APIs" />
      </svg>
      <figcaption className="sr-only">
        Abstract network connecting a frontend, API, services, and database with
        payments, Lightning, webhooks, and external APIs.
      </figcaption>
    </figure>
  );
}

function GraphNode({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="160" height="44" rx="12" fill="rgba(37,99,235,0.16)" stroke="#7DD3FC" />
      <circle cx="18" cy="22" r="4" fill="#EC4899" opacity="0.85" />
      <text x="32" y="27" fill="#E0F2FE" fontSize="14" fontFamily="ui-sans-serif, system-ui">
        {label}
      </text>
    </g>
  );
}
