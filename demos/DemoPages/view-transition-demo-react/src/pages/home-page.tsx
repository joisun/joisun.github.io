import React from "react";
import { useNavigate } from "react-router-dom";

const randomName = (l: number = 12) => {
    const base = "asdf ghjk lqwe rtyu iopz xcvb nm"
    let result = ''
    for (let i = 0; i < l; i++) {
        result += base.charAt(Math.random() * base.length)
    }
    const _r = result.split('')
    _r[0] = _r[0].toLocaleUpperCase()
    return _r.join('')
}
export default function () {
    const navigate = useNavigate();
    const getCache = ()=>{
        return +(sessionStorage.getItem('cache-dog-card-index')||0)}
    console.log('getCache',getCache())
    
    const handleClick = (i: number, e: React.MouseEvent<HTMLImageElement>) => {
        // 将当前点击图片的索引存储在 sessionStorage 中
        // 这使我们能在从详情页返回时恢复 view-transition-name，确保平滑的过渡动画
        sessionStorage.setItem('cache-dog-card-index', i + '')

        // 清除所有图片现有的 view-transition-name
        // 这么做是因为：
        // 1. view-transition-name 必须在全局范围内唯一
        // 2. 我们需要为新点击的图片设置新的 view-transition-name
        // 3. 这可以防止在为新目标设置 viewTransitionName 时出错
        for (let img of document.querySelectorAll('img')){
            (img.style as any).viewTransitionName = 'unset'
        }

        // 为被点击的图片设置 view-transition-name
        const target = e.target as HTMLImageElement
        (target.style as any).viewTransitionName = 'dog-card'
        document.startViewTransition(() => {
            navigate(`/detail/${i}`, { unstable_viewTransition: true })
        })
    }
    return (
        <main>
            <h1 className="font-bold text-3xl dark:text-white">Easybuy</h1>
            <h2 className="text-xl mt-2 text-gray-400 dark:text-white/80">Rerum officia hic qui ipsam eveniet non reiciendis.</h2>
            <div className="item-list mt-12 grid grid-cols-4 gap-y-4 gap-x-2">
                {
                    Array.from({ length: 16 }).map((_, index) => (
                        <div className="item " v-for="(image, index) in 16" key={index} >
                            <img  style={ getCache() === index+1 ? {viewTransitionName:'dog-card'} : {}} onClick={e => handleClick(index + 1, e)} className="aspect-square w-full  cursor-pointer hover:border-gray-200 border border-transparent p-1" src={`https://placedog.net/300/300?id=${index + 1}`} alt={`Image ${index + 1}`} />
                            <p className="name font-semibold dark:text-gray-200"> {randomName(8)}</p>
                            <p className="text-gray-500">{randomName(12)}.</p>
                            <p className="text-right font-semibold text-gray-700 text-sm">$99.00</p>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}