import { Cube } from "@/interfaces/Cube";
import BookmarkFav from "./BookmarkFav";
import Ellipsis from "@/icons/Ellipsis";
import updateCube from "@/lib/updateCube";
import { useTimerStore } from "@/store/timerStore";
import { useCubesModalStore } from "@/store/CubesModalStore";
import Play from "@/icons/Play";
import Stop from "@/icons/Stop";

export default function TableRow({ cube }: { cube: Cube }) {
  const { setCubes } = useTimerStore();
  const { setEditingCube, setModalOpen, setCubeName, setSelectedCategory } =
    useCubesModalStore();
  const setFavorite = (cubeId: string) => {
    const updatedCube = updateCube({ cubeId });
    setCubes(updatedCube);
  };

  function formatDate(msDate: number) {
    const creationDate = new Date(cube.createdAt);
    const month = creationDate.getMonth() + 1;
    const day = creationDate.getDate();
    const year = creationDate.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  }

  const status = cube.solves.session.length > 0;

  return (
    <>
      <div className="table-row h-10 hover:bg-zinc-800 bg-zinc-950">
        <div className="table-cell w-10 align-middle">
          <BookmarkFav
            cubeId={cube.id}
            isChecked={cube.favorite}
            setFavorite={setFavorite}
          />
        </div>
        <div className="table-cell align-middle text-left">{cube.name}</div>
        <div className="table-cell align-middle text-center">
          {cube.category}
        </div>
        <div className="table-cell align-middle text-center">
          {`${cube.solves.session.length}/${cube.solves.all.length}`}
        </div>
        <div className="align-middle text-center hidden md:table-cell">
          {formatDate(cube.createdAt)}
        </div>
        <div className="align-middle text-center hidden md:table-cell">
          {status ? (
            <div className="flex justify-center items-center gap-1">
              <Play />
              <span>Using</span>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <Stop />
              <span>Idle</span>
            </div>
          )}
        </div>
        <div className="table-cell align-middle text-center">
          <button
            className="hover:bg-zinc-800 p-1 px-2 sm:px-2 rounded-md text-white"
            onClick={() => {
              setEditingCube(cube);
              setCubeName(cube.name);
              setSelectedCategory(cube.category);
              setModalOpen(true);
            }}
          >
            <Ellipsis />
          </button>
        </div>
      </div>
    </>
  );
}
