export const meta = {
  id: "rsc-optimistic",
  title: "React 19 useOptimistic Mutation Pattern",
  description: "Tactile UI update pattern for Server Actions before network roundtrip resolves.",
  icon: "layers",
  category: "Web Engineering",
};

export const snippet = `import { useOptimistic } from 'react';

export function ChapterToggle({ chapter, onToggle }: { chapter: Chapter, onToggle: Function }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    chapter.isCompleted,
    (state, newStatus: boolean) => newStatus
  );

  const handleAction = async () => {
    setOptimisticStatus(!optimisticStatus);
    await onToggle(chapter.id);
  };

  return (
    <button onClick={handleAction}>
      {optimisticStatus ? "Completed" : "Incomplete"}
    </button>
  );
}`;
