import { useParams } from "react-router-dom"
import Show from "../components/Show";


const ShowData = () => {

    const { id } = useParams<{ id: string }>()

    return (
        <>
            {id && <Show id={id} />}
        </>
    )
}

export default ShowData