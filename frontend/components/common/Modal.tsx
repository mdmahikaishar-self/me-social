import { ReactNode } from "react";

interface iModalProps {
  className?: string;
  state: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({
  className,
  state,
  onClose,
  children,
}: iModalProps) {
  return state ? (
    <div className="fixed z-20 left-0 top-0 w-screen h-screen">
      {/* Overlay */}
      <div
        className="fixed z-20 w-screen h-screen bg-black opacity-50"
        onClick={() => onClose()}
      />

      {/* Main */}
      <div
        className={`p-4 absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-20`}
      >
        <div className={className}>{children}</div>
      </div>
    </div>
  ) : null;
}
