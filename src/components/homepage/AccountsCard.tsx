import React from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import Card from './Card'
import { BsArrowLeft, BsArrowRight,} from 'react-icons/bs';
import Button from '../buttons/Button';
import LineChart from '../charts/LineChart';
import useInterval from '@/hooks/useInterval';
import '@/lib/swapText'



const AccountsCard = () => {

    const accountType = React.useRef<HTMLDivElement>(null);

    const timeline = React.useRef(gsap.timeline());

    const accounts = ['Checking', 'Saving', 'Credit']
    const [counter, setCounter] = React.useState(0)

    useInterval(()=>{
        setCounter(prev => prev === 2 ? 0 : prev+1 )
    }, 3000)

    React.useEffect(()=>{
        gsap.ticker.lagSmoothing(false)
        timeline.current.swapText(accountType.current, {
            text: accounts[counter],
            duration: 0.4,
        })
    }, [counter])


  return (
    <Card className={clsx(
        'h-[16rem] w-[20rem]',
        'sm:h-[16rem] sm:w-[25rem]',
        'lg:h-[16rem] lg:w-[32rem]'
    )}> 
        <div className='p-2 w-full h-full flex flex-col items-start'>
            <div className='flex justify-start items-center gap-5 my-2 w-72'>
                <div className=' w-full flex items-baseline gap-10 ml-2 border-b border-gray-500'>
                    <h6 className='mb-1 text-sm font-semibold drop-shadow-md'>
                        Account type:
                    </h6>
                    <h2 
                        className='font-serif uppercase text-xl 
                        sm:text-xl font-normal'
                        ref={accountType}
                    />
                </div>

            </div>
            <div className='w-full h-3/4'>
                <LineChart width='100%' height='100%' externalData={data[counter]} delay={0}/>
            </div>
        </div>
    </Card>
  )
}

export default AccountsCard;


const data = [
    [1200, 3900, 7400, 4800, 4100, 900, 8700, 3200],
    [4200, 1700, 1400, 1800, 1100, 3900, 4700, 9200],
    [7200, 300, 4400, 8800, 8100, 9900, 1700, 4200],
]