import css from "./Document.module.css"
import {useEffect, useState} from "react";
import sax from "sax"
import fix from 'fix-html';

const Document = ({doc}) => {
    const [img, setImg] = useState(null)
    const [text, setText] = useState(null)

    useEffect(() => {
        let html = "";
        const xmlParser = sax.parser(true);
        xmlParser.ontext = function (t) {
            html = html + t
        }
        xmlParser.onend = function () {
            const paragraphs = [""]
            let paragraph = 0
            let imgSrc = null
            const htmlParser = sax.parser(false);
            htmlParser.ontext = function (t) {
                paragraphs[paragraph] = paragraphs[paragraph] + t.replace(/<\/?[^>]+(>|$)/g, "").replace(/[\n\r]/g, "")
            }
            htmlParser.onopentag = function (node) {
                if (node.name == 'IMG') {
                    imgSrc = node.attributes.SRC
                }
                else {
                    paragraph++
                    paragraphs[paragraph] = ""
                }
            };
            htmlParser.onend = function () {
                setImg(imgSrc)
                setText(paragraphs)
            }
            htmlParser.write(fix(html)).close()
        };
        xmlParser.write(doc.content.markup).close()
    }, [doc.content.markup])

    return (
        <section className={css.document}>
            <div className={css.container}>
                <div className={css.source}>
                <span className={css.date}>
                    {new Date(doc.issueDate).toLocaleDateString()}
                </span>
                    <a href={doc.url} target="_blank" rel="noreferrer">
                        {doc.source.name}
                    </a>
                </div>
                <h3 className={css.head}>
                    {doc.title.text}
                </h3>
                <div className={css.type}>
                    {doc.attributes.isTechNews ? <div>Технические новости</div> : ""}
                    {doc.attributes.isAnnouncement ? <div>Анонсы и события</div> : ""}
                    {doc.attributes.isDigest ? <div>Сводки новостей</div> : ""}
                </div>
                <div className={css.content}>
                    <div className={css.contentContainer}>
                        {img ? <img className={css.img} src={img} alt="" /> : ""}
                        <div className={css.text}>
                            {text ? text.map((item, key) => {return item.length ? <p key={key}>{item}</p> : ""}) : ""}
                        </div>
                    </div>
                </div>
                <div className={css.foot}>
                    <a className={css.readSource} href={doc.url} target="_blank" rel="noreferrer">
                        Читать в источнике
                    </a>
                    <div className={css.words}>
                        {Number(doc.attributes.wordCount).toLocaleString()} слова
                    </div>

                </div>
            </div>
        </section>
    )

}

export default Document