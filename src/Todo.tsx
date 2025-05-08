import { useState } from "react";
import type { ColumnTodoType, Task } from "../types/column";
import { Column } from "./Column";

const columns: ColumnTodoType[] = [
  {
    id: "TODO",
    title: "pending",
  },
  {
    id: "In_progress",
    title: "in-progress",
  },
  {
    id: "DONE",
    title: "completed",
  },
];

const taskList: Task[] = [
  {
    id: "4606dd0d-3f9d-4099-8ffc-730a090ba45e",
    title: "suffragium thalassinus aestas cunctatio contabesco",
    description:
      "curo curis conspergo capillus assumenda perferendis decimus bardus atque acsi via commodi totidem suppellex arcus sulum sufficio varius",
    status: "completed",
  },
  {
    id: "ea62cc9d-fda0-4d73-a513-0c11f6e1714f",
    title: "curia ventito desparatus",
    description:
      "aegrotatio clarus apud admitto umerus est demens vestigium concido pauci tutis amaritudo odio una aedificium video custodia anser corrigo summa tego ultio soleo vito ara absconditus coaegresco desolo utor strenuus",
    status: "in-progress",
  },
  {
    id: "acd2667a-eba3-4412-b5d7-83ad3d62e9ff",
    title: "quis asper crapula conduco agnitio vitiosus",
    description:
      "pecus cursim cribro vesica demitto corrigo deficio occaecati vereor cunabula adsuesco carus voveo tactus degenero dolor tantum aut surculus deludo coniuratio adicio",
    status: "completed",
  },
  {
    id: "8c4e9846-c007-40c3-8158-ced81bf71e13",
    title: "talio sed cura",
    description:
      "sui stipes reiciendis conforto claustrum conservo omnis celebrer verumtamen beneficium thorax vinculum sol ullam undique sordeo expedita vinum maxime coaegresco rerum sequi",
    status: "pending",
  },
  {
    id: "e4ecd6c1-b9ba-46b9-84f0-c96d690c83e6",
    title: "catena concido alias amita temeritas",
    description:
      "spoliatio communis amplexus decipio crur arto adimpleo apto defessus cubitum ager sulum adhaero curtus fugiat spero peior cupiditate ventito alius turpis balbus capto verumtamen cotidie deputo molestias",
    status: "pending",
  },
  {
    id: "dc5bd623-255c-4a91-9c04-a9c42b7d5c45",
    title: "suppono carmen abundans reprehenderit blanditiis viscus",
    description:
      "cubicularis succedo auctor cupiditate inflammatio tabgo terebro umbra animi excepturi vito adversus trucido tero acervus vesco aperte vespillo suadeo apparatus veritatis cicuta deorsum quos adicio curtus usitas",
    status: "completed",
  },
  {
    id: "440539a7-1e01-453b-adca-e8c1e5c674ec",
    title: "desolo ipsum cariosus adipiscor voluptates amiculum",
    description:
      "cetera atque corrupti toties conatus error templum censura amaritudo arma dicta audentia praesentium unde defluo valens veritatis quis deinde ambulo venia amo contego adstringo ex valeo tenuis deserunt ascit",
    status: "completed",
  },
  {
    id: "80827af9-f897-4d51-ba7f-ed788f3c0821",
    title: "sapiente decens tot combibo alveus",
    description:
      "depopulo accommodo defero saepe eum vulariter defessus amo deorsum thalassinus contigo curto soleo demulceo utrimque subnecto utrimque reprehenderit",
    status: "pending",
  },
  {
    id: "c8540349-01fe-4a3f-808b-87d19c569b85",
    title: "sto ciminatio trepide aestas ventus",
    description:
      "ultra ars aurum vae armarium coruscus paulatim cupiditas alienus vociferor vulticulus verumtamen spectaculum aestas creo valde dedecor velut carcer venia abundans",
    status: "pending",
  },
  {
    id: "b6a1d285-821a-4021-808f-fbf7affeee25",
    title: "aspicio claro vesco abutor amitto adimpleo decet",
    description:
      "thorax abstergo tamquam praesentium communis commemoro vapulus aspernatur commodo perferendis quisquam temporibus credo alo sol abundans sortitus",
    status: "in-progress",
  },
];
const statuses = ["pending", "in-progress", "completed"];
const Todo = () => {
  const [tasks, setTasks] = useState<ColumnTodoType>();

  return (
    <div className="flex  ">
      {columns.map((column) => {
        const fillterTask = taskList.filter(
          (task) => task.status === column.title
        );
        return <Column label={column.title} tasks={fillterTask} />;
      })}
    </div>
  );
};

export default Todo;
