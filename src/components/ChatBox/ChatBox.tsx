import { FC } from 'react';
import './ChatBox.scss';

interface IChatBoxProps {}

export const ChatBox: FC<IChatBoxProps> = () => {

const datas: { type: string; text: string }[] = [
    {type: "input",  text: "割り勘をしてください。あいうえお、かきくけこ、ラインとかどう？ページのタイトルはどうする？",}, 
    {type: "output", text: "金額を教えてください"},
    {type: "input",  text: "５０００円です"},
    {type: "output", text: "何人ですか？"},
    {type: "input",  text: "20人です"}
];

  return (
    <div>
      <section className="chat-box-body">
        {datas.map((data, index) => {
            return (
                <div className={data.type} key={index}>
                    <div className="chat-box-message">{data.text}</div>
                </div>
            );
        })}
      </section>
      <section className="chat-box-footer">
        <input type="text" className="chat-box-input" />
        <button type="submit" className="chat-box-submit">
          ▶
        </button>
      </section>
    </div>
  )
}