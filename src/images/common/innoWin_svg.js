import React from "react"

const innoWinSvg = (props) => {
  return (
      <div className={props.containerClass} onClick={() => props.changeView ? props.changeView("Members") : null}>
        <svg width={props.width} height={props.height} className={props.svgClass}
             viewBox="0 0 17220 17420">
          <g id="Layer_x0020_2">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <path className="fil0" d="M3030 7440c0,-4710 -300,-4410 4410,-4410 1970,0 1570,2520 1560,4310 0,900 -10,1110 460,1590 790,820 1690,560 3460,560 2930,0 2540,390 2540,4500 0,1930 -2290,1470 -4500,1470 -1640,0 -1470,-1550 -1470,-2450 0,-650 0,-1300 0,-1950 10,-1060 60,-990 -510,-1550 -760,-750 -1800,-510 -3500,-510 -1040,10 -2450,-80 -2450,-1560zm7730 -1080c0,-3510 -180,-3330 3330,-3330 1710,0 1370,1700 1370,3330 0,1710 -1700,1370 -3330,1370 -850,0 -1370,-510 -1370,-1370zm-490 -3230l0 3430c0,890 770,1660 1670,1660l3420 0c900,0 1670,-770 1670,-1660l0 -3430c0,-890 -770,-1660 -1670,-1660l-3420 0c-900,0 -1670,770 -1670,1660zm-7240 10860c0,-3280 -50,-3230 3230,-3230 1800,0 1470,1920 1470,3230 0,1800 -1920,1470 -3230,1470 -870,0 -1470,-600 -1470,-1470zm-1950 -2050l0 3810c0,900 770,1670 1660,1670l3820 0c890,0 1660,-770 1660,-1670l0 -3810c0,-900 -770,-1670 -1660,-1670l-3820 0c-890,0 -1660,770 -1660,1670zm-1080 -10280l0 6170c0,580 580,1200 1010,1440 1140,630 5880,-210 7180,350 1140,500 810,2380 810,4180 0,850 -100,1790 190,2350 230,440 850,1070 1480,1070l4890 0c720,0 1660,-940 1660,-1660l0 -4890c0,-590 -580,-1210 -1000,-1450 -1350,-740 -6010,600 -6590,-940 -510,-1340 210,-6180 -330,-7210 -230,-440 -850,-1070 -1470,-1070l-6170 0c-710,0 -1660,950 -1660,1660z"/>
          </g>
        </svg>
      </div>
  )
}
export default innoWinSvg