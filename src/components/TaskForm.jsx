// edycja zadania 
// dodanie zadania
// lista zadań 
//nadanie id kazdemu zadaniu 
// zadania w liscie musza byc ponumerowae 


import { useState } from "react";

function TaskForm() {
    const [czyAktywne, setCzyAktywne] = useState(false);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("middle");
    const [category, setCategory] = useState("szkola");
    const [list,setList] = useState([]);


    const dodajZadanie = () => {
        e.preventDefault();
        const nazwa = task.trim();
        if (nazwa.lenght < 5 || nazwa.length > 25) return;

        const noweZadanie = {
            id: crypto.randomUUID(),
            task: task,
            category: category,
            priority: priority
        };
        setList(poprzedniaLista => [...poprzedniaLista, noweZadanie]);
        setTask("")
        // [a,b] > nowe zadanie C > ...list > nowa lista [a,b,C]
        
    };

    const edytujZadanie =(id) => {
         const zadnie = list.find(item => item.id ===id);
        if (!zadnie)return;
        
        const nowaNazwa = prompt(
            "podaj nową nazwę", zadnie.task);
        if (nowaNazwa ===null) {return;}
        
        const nazwa = nowaNazwa.trim();
        if (nazwa.length < 5 || nazwa.length > 25){
            alert("nazwa zadania pomiedzy 5 a 25 znakow");
            return;
        }
        setList(poprzedniaLista => poprzedniaLista.map(item => item.id === id ? {...item, task:nazwa} : item));
    };

    const usunZadanie = (id) => {
        setList(poprzedniaLista => poprzedniaLista.filter(item => item.id !== id))
    }

    return (
        <div>
            <h2>Dodaj nowe zadanie</h2>
            <form onSubmit={dodajZadanie}>
                <input
                    type="text"
                    placeholder="Wpisz zadanie..."
                    minLength={5}
                    maxLength={25}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onFocus={()=> setCzyAktywne(true)}
                    onBlur={()=> setCzyAktywne(false)}
                />
                <p>{czyAktywne ? "Typing...": "pole nieaktywne"}</p>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">niski</option>
                    <option value="middle">średni</option>
                    <option value="high">wysoki</option>
                </select>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="szkola">szkoła</option>
                    <option value="dom">dom</option>
                    <option value="praca">praca</option>
                    <option value="inne">inne</option>
                </select>

                <button type="submit">Dodaj</button>
            </form>
            <h3>Liczba zadan: {list.length}</h3>

            <ul>
                {list.map((item, index)=>(
                    <li key ={index}>
                        {item.task}  {item.category}  {item.priority}
                        <button onClick={() => edytujZadanie(item.id)}>Edytuj</button>
                        <button onClick={() => usunZadanie(item.id)}>usun</button>
                    </li>
                ))}    
            </ul>
            <hr />

            <h3>Podgląd zadania</h3>

            <p>Nazwa: {task}</p>
            <p>Priorytet: {priority}</p>
            <p>Kategoria: {category}</p>

            <p>Liczba znaków: {task.length}/25</p>

            {task.length > 0 && task.length < 5 && (
                <p style={{ color: "red" }}>
                    Nazwa zadania jest za krótka
                </p>
            )}
        </div>
    );
}

export default TaskForm;


