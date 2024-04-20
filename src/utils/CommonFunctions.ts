export const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
  e.preventDefault();
  e.stopPropagation();
};
