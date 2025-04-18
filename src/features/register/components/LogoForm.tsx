import CMF from '@/../public/CMF.svg'

const LogoForm = ({ className }: { className?: string }) => {
    return (
        <div className={`bg-white rounded-[6px] ${className}`}>
            <img src={CMF} className="w-[92px]"/>
        </div>
    )
}

export default LogoForm