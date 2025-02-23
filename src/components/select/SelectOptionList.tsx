interface SelectOptionList {
  isOpen: boolean;
  children: React.ReactNode;
}

export function SelectOptionList({ isOpen, children }: SelectOptionList) {
  return (
    <>
      {isOpen ? (
        <div className="absolute left-0 z-10 w-full p-1 border rounded-md top-10 dark:bg-zinc-900 dark:border-zinc-700 light:bg-neutral-200 light:border-neutral-400">
          {children}
        </div>
      ) : null}
    </>
  );
}
