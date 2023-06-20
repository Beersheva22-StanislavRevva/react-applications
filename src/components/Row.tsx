import { ReactNode } from "react"

const Row: React.FC<{row: number[]}> = ({row}) => {
    function getDivs(): ReactNode {
        return row.map((num, index) =>
         <div key = {index} style = {{width:10, height:10, backgroundColor: num ?
             'black': 'white', border: 'solid 1 px gray'}}></div>)
    }
    return <section style = {{display:'flex'}}>
        {getDivs()}
    </section>
}
export default Row;