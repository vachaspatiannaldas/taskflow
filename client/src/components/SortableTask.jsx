import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';

const SortableTask = memo(({ task, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <li ref={setNodeRef} style={style} className="rounded-lg">
      <div className="hidden sm:flex items-start gap-2">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-slate-400 hover:text-slate-600 pt-5 select-none"
          title="Drag task"
        >
          ☰
        </span>

        <div className="flex-1">{children}</div>
      </div>

      <div
        className="sm:hidden"
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    </li>
  );
});

export default SortableTask;
