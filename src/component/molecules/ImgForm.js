import { PhotoIcon } from '@heroicons/react/24/solid'

function ImageForm({image, ...props}){
    return(
        <>
            {image ?
                <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <img src={image} style={{ width: '100%', height: '400px', textAlign: 'center' }} />
                </div>:
                <div>
                    <PhotoIcon className="mx-auto h-150 w-150 text-gray-300" style = {{height : '300px', width : '100%'}}aria-hidden="true" />
                </div>
            }
        </>
    )
}

export default ImageForm;