import { createContext, useState } from "react"
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recent, setRecent] = useState("")
    const [prev, setPrev] = useState([])
    const [result, setResult] = useState(false)
    const [load, setLoad] = useState(false)
    const [rdata, setRdata] = useState("")
    const [image, setImage] = useState(null);

    const delayPara = (index, nextWord) =>{
        setTimeout(function(){
            setRdata(prev=>prev+nextWord)
        },75*index)
    }
    // console.log(typeof response)

    const newChat = () => {
        setLoad(false)
        setResult(false)
    }

    const _sendMediaMessage = async () => {
        try {
            // Open image picker dialog
            const image = await ImagePicker.openPicker({
                multiple: false,
                cropping: false,
                mediaType: 'photo',
            });

            // Check if an image is selected
            if (image) {
                setSelectedImage(image);

                // Create chat message with the selected image
                const chatMessage = {
                    user: currentUser,
                    createdAt: new Date(),
                    text: "Describe this image in detail",
                    medias: [
                        {
                            url: image.path,
                            fileName: "",
                            type: MediaType.image,
                        }
                    ],
                };

                // Send the chat message
                _sendMessage(chatMessage);
            }
        } catch (error) {
            console.error("Error selecting image:", error);
        }
    }

    const sent = async (prompt) => { 
        setRdata("")
        setLoad(true)
        setResult(true)
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt)
            setRecent(prompt)
        }
        else{
            setPrev(prev=>[...prev,input])
            setRecent(input)
            response = await runChat(input)
        }
        let rArr = response.split("**")
        let nResponse = "";
        for (let i=0; i<rArr.length; i++){
            if(i === 0 || i%2 !== 1){
                nResponse += rArr[i]
            }
            else{
                nResponse += "<b>"+rArr[i]+"</b>"
            }
        }
        let nResponse1 = nResponse.split("*").join("</br>")
        // setRdata(nResponse1)
        let nArr = nResponse1.split(" ");
        for(let j=0; j<nArr.length; j++){
            const nw = nArr[j];
            delayPara(j,nw+" ")
        }
        setLoad(false)
        setInput("")
    }
    
    // sent("what is react js")

    const contextValue = {
        prev,
        setPrev,
        sent,
        setRecent,
        recent,
        result,
        load,
        rdata,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider