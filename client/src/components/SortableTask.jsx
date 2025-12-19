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
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex gap-2"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-600 pt-6"
        title="Drag task"
      >
        ☰
      </div>

      <div className="flex-1">
        {children}
      </div>
    </li>
  );
});

export default SortableTask;
