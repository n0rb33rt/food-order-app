import Modal from "./Modal.jsx";

export default function Error({title,message}){
    return (
        <Modal className='error' open onClose={null}>
            <h3>{title}</h3>
            <p>{message}</p>
        </Modal>
    )
}