import Item from "./Item"

const Items = ({fileNames, unityContext}) => {
    return (
        <div>
           { fileNames.map((item) => (
                <Item itemName={item.toString()} unityContext={unityContext}></Item>
            ))}
        </div>
    )
}

export default Items
