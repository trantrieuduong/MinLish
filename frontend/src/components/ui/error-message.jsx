/**
* @param {{message: string}} props
*/
export default function ErrorMessage({ message }){
    return(
        <div className="alert alert-danger mt-4">{message}</div>
    );
}