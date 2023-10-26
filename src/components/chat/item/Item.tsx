import { setChatId } from "@/frameworks/redux/sagas";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import editIcon from '@/assets/images/icons/edit.svg'
import confirmIcon from '@/assets/images/icons/confirm.svg'
import Api from "@/frameworks/axios/Api";
type Props = {
  title: string,
  id: number,
}
export default function ChatItem({ id, title }: Props) {
  const [edit, setEdit] = useState(false);
  const [acitveTitle, setAcitveTitle] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setAcitveTitle(title);
  },[])
  const confirmTitle = () => {
    setEdit(false);
    Api.patch(`/chats/${id}`,{
      title: acitveTitle
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    })
  }
  console.log(acitveTitle)
  return (
    <div className="chat__item" onClick={() => { dispatch(setChatId(id)) }}>
      {edit
        ? <>
          <input className="chat__item_input" value={acitveTitle} onChange={e => setAcitveTitle(e.target.value)} />
          <div className="chat__item_icon" onClick={confirmTitle}>
            <img src={confirmIcon} />
          </div>
        </>
        : <>
          <div className="chat__item_title" >
            {acitveTitle}
          </div>
          <div className="chat__item_icon" onClick={() => { setEdit(true) }}>
            <img src={editIcon} />
          </div>
        </>}
    </div>
  )
}