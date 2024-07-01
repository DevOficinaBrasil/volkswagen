import React from 'react'

function page() {
    return (
        <div className='container mx-auto my-5'>

            <div className='my-3'>
                <div className='text-blue-volks-500 font-semibold uppercase text-xl'>
                    Treinamento ao vivo</div>

                <div className='font-normal'>A importância do Óleo Certo para o motor - Maxi Performance</div>
            </div>
            <div className='grid grid-cols-12 gap-10'>
                <div className='col-span-8'>
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                        <iframe
                            src={"https://vimeo.com/event/4386223/embed/interaction"}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                </div>

                <div className='col-span-4'>
                    <iframe src="https://rota.oficinabrasil.com.br/ext-cod/chat/" frameborder="0" className='w-full h-full'></iframe>
                </div>
            </div>
        </div>
    )
}

export default page