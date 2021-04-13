import S from './Loader.module.css'

export default function Loader() {
  return (
    <div className={S.spinner}>
      <div className={S.bounce1}></div>
      <div className={S.bounce2}></div>
      <div className={S.bounce3}></div>
    </div>
  )
}
