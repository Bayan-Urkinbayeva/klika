import { useEffect, useState } from "react";
import axios from 'axios'
function App() {
    const [singers, setSingers] = useState([])
    const [years, setYears] = useState([])
    const [genres, setGenres] = useState([])
    const [musics, setMusics] = useState([])
    const pagination = [1,2,3,4,5]
    const [selected, setSelected] = useState(1)
    let paginationSize = 5
    let begin = ((selected-1)*paginationSize)+1
    let end = begin+paginationSize
  
    const fetchMusics = async () => {
      try{
        const res = await axios(`http://localhost:8080`)
        setMusics(res.data)
      }
      catch{
        console.log("error")
      }
    };

    const fetchGenres = async () => {
        try{
          const res = await axios(`http://localhost:8080/genres`)
          setGenres(res.data)
        }
        catch{
          console.log("error")
        }
      };

      const fetchSingers = async () => {
        try{
          const res = await axios(`http://localhost:8080/singers`)
          setSingers(res.data)
        }
        catch{
          console.log("error")
        }
      };

      const fetchYears = async () => {
        try{
          const res = await axios(`http://localhost:8080/years`)
          setYears(res.data)
        }
        catch{
          console.log("error")
        }
      };

  useEffect(() => {
    fetchMusics();
    fetchGenres();
    fetchSingers();
    fetchYears();
  },[])
  const handleClick = (e) => {
    setSelected(e.target.outerText)
  }

  return (
    <div className="flex flex-col">
        <div className="flex space-x-10 m-10">
        <select className="w-40 h-10 border-2 border-gray-200 bg-gray-50">
            <option>All</option>
            {singers.map((singer) => (
                <option key={singer.singer}>{singer.singer}</option>
            ))}
        </select>

        <select className="w-40 h-10 border-2 border-gray-200 bg-gray-50">
            <option>All</option>
            {genres.map((genre) => (
                <option key={genre.genre}>{genre.genre}</option>
            ))}
        </select>

        <select className="w-40 h-10 border-2 border-gray-200 bg-gray-50">
            <option>All</option>
            {years.map((year) => (
                <option key={year.year}>{year.year}</option>
            ))}
        </select>

        </div>
        
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500"
                            >
                                singer
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                               Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                               Genre
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                               Year
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {musics.slice(begin-1, end-1).map((music) => (
                         <tr key={music.id}>
                         <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                             {music.id}
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                             {music.singer}
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                             {music.name}
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                             {music.genre}
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                             {music.year}
                         </td>
                     </tr>
                      ))}
                       
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex space-x-2 justify-center">
               {pagination.map((num) => (
                <div className="w-10 h-10 border-2 border-gray-200 bg-gray-50 flex justify-center items-center" onClick={(e)=> handleClick(e)}>{num}</div>
               ))}
               </div>
        </div>
    </div>
</div>
  );
}

export default App;
