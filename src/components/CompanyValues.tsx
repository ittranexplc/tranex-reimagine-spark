import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { companyValues } from "@/data/companyValues";

const TILES_QUERY = "(min-width: 640px)";

const numeral = (i: number) => String(i + 1).padStart(2, "0");

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

type HeadingTag = "h3" | "h4";

const ValueTabs = ({ headingAs: Heading }: { headingAs: HeadingTag }) => {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = companyValues.length;

  const focusTab = (i: number) => {
    const next = (i + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(active + 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(count - 1),
    };
    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] right-[10%] bottom-[6px] border-t-2 border-dotted border-secondary/40"
        />
        <div
          role="tablist"
          aria-label="Our values"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="relative grid grid-cols-5 gap-1 md:gap-3"
        >
          {companyValues.map(({ icon: Icon, title }, i) => {
            const selected = active === i;
            return (
              <button
                key={title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActive(i);
                }}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex min-w-0 flex-col items-center gap-3 rounded-xl px-0 pt-2 pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <span
                  className={cn(
                    "flex min-w-0 flex-col items-center gap-2 transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none",
                    selected ? "-translate-y-1" : "translate-y-0",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ring-2 transition-colors duration-300 motion-reduce:transition-none",
                      selected
                        ? "bg-secondary text-secondary-foreground ring-secondary/30 shadow-md"
                        : "bg-secondary/10 text-secondary ring-secondary/25 group-hover:ring-secondary/50",
                    )}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </span>
                  <span
                    className={cn(
                      "max-w-full text-center font-heading font-semibold text-xs md:text-[0.8125rem] lg:text-base leading-tight [overflow-wrap:anywhere] transition-colors duration-300 motion-reduce:transition-none",
                      selected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-0.5 w-8 rounded-full transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                      selected ? "bg-secondary opacity-100 scale-x-100" : "bg-secondary opacity-0 scale-x-0",
                    )}
                  />
                </span>
                <span aria-hidden="true" className="flex h-3.5 w-3.5 items-center justify-center">
                  <span
                    className={cn(
                      "rounded-full transition-transform duration-300 motion-reduce:transition-none",
                      selected
                        ? "h-3.5 w-3.5 bg-secondary ring-4 ring-secondary/20"
                        : "h-2.5 w-2.5 bg-card border-2 border-secondary/50",
                    )}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-6 md:mt-8 grid overflow-hidden rounded-2xl bg-navy-gradient shadow-lg">
        <div aria-hidden="true" className="absolute inset-0 bg-green-deep/25" />
        {companyValues.map(({ title, desc }, i) => {
          const selected = active === i;
          return (
            <div
              key={title}
              role="tabpanel"
              id={`${baseId}-panel-${i}`}
              aria-labelledby={`${baseId}-tab-${i}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "[grid-area:1/1] relative p-6 md:p-10 rounded-2xl",
                "transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
                selected ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-heading font-bold leading-none text-[6rem] md:text-[9rem] text-primary-foreground/10"
              >
                {numeral(i)}
              </span>
              <div className="relative max-w-2xl pr-10 md:pr-24">
                <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-secondary mb-4" />
                <Heading className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-3">{title}</Heading>
                <p className="text-primary-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
              "relative overflow-hidden rounded-xl border bg-background transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none",
              open ? "border-transparent shadow-md" : "border-border",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-navy-gradient transition-opacity duration-300 motion-reduce:transition-none",
                open ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="absolute inset-0 bg-green-deep/25" />
            </div>
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && open) setOpenIndex(null);
              }}
              className="relative flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "w-9 h-9 shrink-0 rounded-full flex items-center justify-center ring-2 transition-colors duration-300 motion-reduce:transition-none max-[319px]:hidden",
                  open ? "bg-secondary text-secondary-foreground ring-secondary/40" : "bg-secondary/10 text-secondary ring-secondary/25",
                )}
              >
                <Icon className="w-[18px] h-[18px]" />
              </span>
              <span className="min-w-0 flex-1 flex flex-col">
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-heading font-bold text-[0.6875rem] leading-none tracking-wider mb-1 transition-colors duration-300 motion-reduce:transition-none",
                    open ? "text-primary-foreground/50" : "text-foreground/30",
                  )}
                >
                  {numeral(i)}
                </span>
                <span
                  className={cn(
                    "font-heading font-semibold text-[0.9375rem] leading-snug [overflow-wrap:anywhere] transition-colors duration-300 motion-reduce:transition-none",
                    open ? "text-primary-foreground" : "text-foreground",
                  )}
                >
                  {title}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "w-5 h-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none",
                  open ? "rotate-180 text-primary-foreground" : "text-muted-foreground",
                )}
              />
            </button>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="relative">
              <div className="px-2.5 pb-4 pt-1 animate-in fade-in-0 slide-in-from-top-1 duration-300 motion-reduce:animate-none">
                <span aria-hidden="true" className="block h-0.5 w-10 rounded-full bg-secondary mb-3" />
                <p className="text-sm leading-relaxed text-primary-foreground">{desc}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const CompanyValues = ({ headingAs = "h4" }: { headingAs?: HeadingTag }) => {
  const showTiles = useMediaQuery(TILES_QUERY);
  return showTiles ? <ValueTabs headingAs={headingAs} /> : <ValueAccordion />;
};

export default CompanyValues;
