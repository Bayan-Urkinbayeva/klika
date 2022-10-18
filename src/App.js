import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

function App() {
    const [singers, setSingers] = useState([])
    const [years, setYears] = useState([])
    const [genres, setGenres] = useState([])
    const [musics, setMusics] = useState([])
    const [filters, setFilters] = useState([])
    const [selected, setSelected] = useState(false)
    const [issorted, setIsSorted] = useState("id")
    const columns = ["id", "singer", "name", "genre", "year" ]
    const pagination = [1,2,3,4,5]

    const delete_cookie =(name) =>  {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

  
    const fetchMusics = async () => {
      try{  
        axios.defaults.withCredentials = true
        const res = await axios.get(`https://klika-backend.herokuapp.com/`,
        {
            sameSite : "none",
            secure: true,
            domain: "kilka-front.herokuapp.com/",
            httpOnly: true
        })
        setMusics(res.data)
        console.log(res.data)
      }
      catch{
        console.log("error")
      }
    };


    const fetchFilters = async() => {
        try{  
            axios.defaults.withCredentials = true
            const res = await axios.get(`https://klika-backend.herokuapp.com/filters`)
            setFilters(res.data)
            setSingers(res.data.singer)
            setGenres(res.data.genres);
            setYears(res.data.year)
            console.log(res.data)
          }
          catch{
            console.log("error")
          }
    }



  const handleClick = (e, num) => {
   setSelected(num)
    document.cookie=`page=${e.target.outerText};domain=kilka-front.herokuapp.com/`
    fetchMusics();
  }



  const handleSort = (sortby) => {
    if(issorted==sortby){
    document.cookie=`column=${sortby};domain=kilka-front.herokuapp.com/`
    document.cookie=`order=asc;`
    fetchMusics()
    setIsSorted(false)
    }
    else{
        document.cookie=`column=${sortby};domain=kilka-front.herokuapp.com/`
        document.cookie=`order=desc;domain=kilka-front.herokuapp.com/`
        fetchMusics()
        setIsSorted(sortby)
    }
}


  const handleChange =(e, filterName) => {
    if(filterName == "singer"){
        if(e.target.value == "all"){
            delete_cookie("singer")
            fetchMusics()
        }
        else{
            document.cookie=`singer=${e.target.value};domain=kilka-front.herokuapp.com/`
            fetchMusics()
        }
    }
    if(filterName=="genre"){
        if(e.target.value == "all"){
            delete_cookie("genre")
            fetchMusics()
        }
        else{
            document.cookie=`genre=${e.target.value};domain=kilka-front.herokuapp.com/`
            fetchMusics()
        }
    }
    if(filterName=="year"){
        if(e.target.value == "all"){
            delete_cookie("year")
            fetchMusics()
        }
        else{
            document.cookie=`year=${e.target.value};domain=kilka-front.herokuapp.com/`
            fetchMusics()
        }
        }
  }


  useEffect(() => {
    delete_cookie("page")
    delete_cookie("genre")
    delete_cookie("year")
    delete_cookie("singer")
    delete_cookie("column")
    delete_cookie("order")
    fetchMusics();
    fetchFilters();
  },[])


  return (
    <div className="flex flex-col">
        <div className="flex space-x-10 m-10">
        <select className="w-40 h-10 border-2 border-gray-200 bg-gray-50" onChange={(e)=>handleChange(e, "singer")}>
            <option value="all">All</option>
            {singers.map((singer) => (
                <option value={singer.id} key={singer.id}>{singer.name}</option>
            ))}
        </select>

        <select className="w-40 h-10 border-2 border-gray-200 bg-gray-50" onChange={(e)=>handleChange(e, "genre")}>
            <option value="all">All</option>
            {genres.map((genre) => (
                <option value={genre.id} key={genre.id}>{genre.name}</option>
            ))}
        </select>

        <select className="w-40 h-10 border-2 border-gray-200 bg-gray-50" onChange={(e)=>handleChange(e, "year")}>
            <option value="all">All</option>
            {years.map((year) => (
                <option value={year} key={year}>{year}</option>
            ))}
        </select>
        </div>
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) =>(
                                <th
                                key={column}
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 " onClick={() => handleSort(column)}
                            >
                                {column}
                                <FontAwesomeIcon className={`ml-2 ${issorted==column  ? "rotate-180" : "rotate-0" }`} icon={faArrowUp} />
                            </th>
                            ) )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {musics.map((music) => (
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
               {pagination.map((num ,index) => (
                <div key={index} className={`w-10 h-10 border-2 border-gray-200 flex justify-center items-center `} style={{ backgroundColor: selected==num ? "#a7a8a7" : "transparent"}} onClick={(e)=> handleClick(e, num)}>{num}</div>
               ))}
               </div>
        </div>
    </div>
</div>
  );
}

export default App;
