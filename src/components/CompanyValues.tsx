import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent, type FocusEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { companyValues } from "@/data/companyValues";

type Value = (typeof companyValues)[number];

const TILES_QUERY = "(min-width: 640px)";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : true,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
};

const ValueTile = ({ icon: Icon, title, desc }: Value) => {
  const id = useId();
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [override, setOverride] = useState<boolean | null>(null);

  const expanded = override ?? (hovered || keyboardFocus);
  const lastPointerType = useRef<string | null>(null);

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      setHovered(true);
      setOverride(null);
    }
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      setHovered(false);
      setOverride(null);
    }
  };
  const onFocus = (e: FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches(":focus-visible")) setKeyboardFocus(true);
  };
  const onBlur = () => {
    setKeyboardFocus(false);
    setOverride(null);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOverride(false);
  };
  const onClick = (e: MouseEvent) => {
    if (e.detail !== 0 && lastPointerType.current === "mouse") {
      setOverride(null);
      return;
    }
    setOverride(!expanded);
  };

  return (
    <li className="flex min-w-0 grow-0 shrink-0 basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={descId}
        aria-labelledby={titleId}
        aria-describedby={expanded ? descId : undefined}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => (lastPointerType.current = e.pointerType)}
        onClick={onClick}
        className={cn(
          "grid w-full min-w-0 text-left rounded-xl border p-5 bg-background",
          "transition-[border-color,box-shadow,background-color] duration-300 motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          expanded ? "border-secondary/50 shadow-md bg-card" : "border-border hover:border-secondary/40",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "[grid-area:1/1] flex flex-col items-center justify-center text-center gap-3 py-2",
            "transition-[opacity,transform] duration-300 motion-reduce:transition-none motion-reduce:transform-none",
            expanded ? "invisible opacity-0 scale-95" : "visible opacity-100 scale-100",
          )}
        >
          <span className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-secondary" />
          </span>
          <span className="font-heading font-semibold text-lg text-foreground">{title}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </span>

        <span className="[grid-area:1/1] flex min-w-0 flex-col gap-3">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className={cn(
                "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 motion-reduce:transition-none",
                expanded ? "bg-secondary text-secondary-foreground" : "bg-secondary/10 text-secondary",
                expanded ? "visible" : "invisible",
              )}
              aria-hidden="true"
            >
              <Icon className="w-5 h-5" />
            </span>
            <span
              id={titleId}
              className={cn("min-w-0 font-heading font-semibold text-lg text-foreground", expanded ? "" : "opacity-0")}
            >
              {title}
            </span>
          </span>
          <span
            id={descId}
            className={cn(
              "block text-sm leading-relaxed text-muted-foreground",
              "transition-[opacity,transform] duration-300 motion-reduce:transition-none motion-reduce:transform-none",
              expanded ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-1",
            )}
          >
            {desc}
          </span>
        </span>
      </button>
    </li>
  );
};

const ValueTiles = () => (
  <ul className="flex flex-wrap justify-center gap-4">
    {companyValues.map((value) => (
      <ValueTile key={value.title} {...value} />
    ))}
  </ul>
);

const ValueAccordion = () => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="flex flex-col gap-3">
      {companyValues.map(({ icon: Icon, title, desc }, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={title}
            className={cn(
              "rounded-xl border bg-background transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none",
              open ? "border-secondary/50 shadow-md bg-card" : "border-border",
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && open) setOpenIndex(null);
              }}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 motion-reduce:transition-none max-[359px]:hidden",
                  open ? "bg-secondary text-secondary-foreground" : "bg-secondary/10 text-secondary",
                )}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0 flex-1 font-heading font-semibold text-base text-foreground [overflow-wrap:anywhere]">{title}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none",
                  open && "rotate-180 text-secondary",
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-300 motion-reduce:transition-none",
                open ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-3 pb-4 pt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const CompanyValues = () => {
  const showTiles = useMediaQuery(TILES_QUERY);
  return showTiles ? <ValueTiles /> : <ValueAccordion />;
};

export default CompanyValues;
