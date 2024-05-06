
interface Props {
  title: string;
  url: string;
  companyName: string;
  idJob: string;
}

export const JobCard = ({title, url, companyName, idJob}: Props) => {
  return (
    <div className="px-3 py-2 rounded-lg shadow-lg flex items-center justify-between">
      <div className="flex flex-col gap-2 flex-wrap">
        <h1 className="font-bold text-[14px] text-blue-800">{title}</h1>
        <p className="text-gray-500 text-sm">{companyName}</p>
      </div>
      <div className="flex items-center">
        <button className="px-2 py-2 rounded-md text-xs text-slate-200 font-semibold bg-zinc-800 hover:bg-zinc-600/75 transition ease">Ver más</button>
      </div>
    </div>
  );
}

