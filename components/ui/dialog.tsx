"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type DialogProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

type WithClassName<T = HTMLElement> = React.HTMLAttributes<T> & {
  asChild?: boolean;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function mergeClassName(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useDialog() {
  const context = React.useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used inside Dialog.");
  }

  return context;
}

function Dialog({ children, defaultOpen = false, onOpenChange, open: controlledOpen }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

function DialogTrigger({ asChild = false, children, ...props }: WithClassName) {
  const { setOpen } = useDialog();

  if (asChild && React.isValidElement<{ onClick?: React.MouseEventHandler }>(children)) {
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent) => {
        children.props.onClick?.(event);
        setOpen(true);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(true)} {...props}>
      {children}
    </button>
  );
}

function DialogClose({ asChild = false, children, ...props }: WithClassName) {
  const { setOpen } = useDialog();

  if (asChild && React.isValidElement<{ onClick?: React.MouseEventHandler }>(children)) {
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent) => {
        children.props.onClick?.(event);
        setOpen(false);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(false)} {...props}>
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  const { open, setOpen } = useDialog();
  const [mounted, setMounted] = React.useState(open);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  if (!mounted) return null;

  return (
    <DialogPortal>
      <AnimatePresence
        onExitComplete={() => {
          setMounted(false);
        }}
      >
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[var(--background)]/82 px-4 py-6 backdrop-blur-md"
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={mergeClassName(
                "relative max-h-[85vh] w-full max-w-md flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_24px_64px_rgba(0,0,0,0.5)]",
                className,
              )}
              onMouseDown={(event) => event.stopPropagation()}
              {...props}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={mergeClassName("border-b border-[var(--border)] px-5 py-4 md:px-6", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={mergeClassName(
        "sticky bottom-0 z-10 flex flex-wrap justify-end gap-3 border-t border-[var(--border)] bg-[var(--card)]/92 px-5 py-4 backdrop-blur-xl md:px-6",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={mergeClassName("text-base font-semibold leading-none tracking-tight text-[var(--foreground)]", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={mergeClassName("text-sm leading-normal text-[var(--muted-foreground)]", className)} {...props} />;
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger };
