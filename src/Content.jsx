export default function Die(props){
    function changeVal(){

    }
    const styles = {
        backgroundColor: props.isHeld? "#59E391" : "white"
    }
    return (
        <>
            <button className="die" style= {styles} onClick={props.onClick}>{props.value}</button>
        </>
    )
}