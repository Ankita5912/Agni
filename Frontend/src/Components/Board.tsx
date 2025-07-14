export default function Board() {
  return (
    <div className="flex md:flex-row md:overflow-auto gap-4 flex-col">
      <div className="w-xs h-96 border bg-border">
          <h1 className="">subtask heading</h1>
      </div>
      <div className="text-md">+</div>
    </div>
  );
}
