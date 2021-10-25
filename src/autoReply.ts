export default async function() {
  const inputEvent = new Event('input', {"bubbles": true, "cancelable": false});
  const clickEvent = new Event('click', {"bubbles": true, "cancelable": false});

  const replyText = [
    '谢谢亲，我们的质量和服务一直都不会让亲失望的，非常感谢！',
    '我们的追求不仅仅是让您吃饱，让您吃的健康和舒心才是我们的最大目标。您的每一个肯定都是对我们小店前进的大大的动力！',
    '哎呀妈呀，收到好评以后头也不疼了，眼也不花了，又能继续干活了！^.^谢谢亲的支持。'
  ];

  // 未回复选项元素
  const noReplyEle = document.querySelector('.filter_list_container').querySelector('span:nth-child(2)');
  // 好评(4-5星)选项元素
  const praise = document.querySelectorAll('.filter_list_container')[1].querySelector('span:nth-child(2)');
  // 进入页面默认点击 未回复 和 好评 选项
  noReplyEle.dispatchEvent(clickEvent) && praise.dispatchEvent(clickEvent);

  const commentListObserver = new MutationObserver(([mutation], observer) => {
    // 评论列表数据
    const commentListBox = document.querySelector('.comment_list_box');
    if (!commentListBox) return;
    commentListObserver.disconnect();

    for(const commentBox of commentListBox.children) {

      const commentObserver = new MutationObserver(([mutation], observer) => {
        if (mutation.addedNodes.length === 0) return;
        const replyBox = mutation.addedNodes[0] as Element;
        const textarea = replyBox.querySelector('textarea');
        setTimeout(() => {
          function setNativeValue(element: HTMLTextAreaElement, value: number | string) {
            const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
            const prototype = Object.getPrototypeOf(element);
            const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
            
            if (valueSetter && valueSetter !== prototypeValueSetter) {
              prototypeValueSetter.call(element, value);
            } else {
              valueSetter.call(element, value);
            }
          }
          setNativeValue(textarea, replyText[Math.floor(Math.random() * 3)]);
          textarea.dispatchEvent(inputEvent);
          const replyBtn = replyBox.querySelector('.send_btn .roo-btn-primary');
          replyBtn.dispatchEvent(clickEvent);
        }, 1500);
      });
      const commentCardContent = commentBox.querySelector(".comment_card_content");
      const showReplyBoxBtn = commentCardContent.querySelector('.btn_list ');
      commentObserver.observe(commentCardContent, { childList: true });
      showReplyBoxBtn.dispatchEvent(clickEvent);
    }
  });

  const tartgetNode = document.querySelectorAll('.loading-data-wrapper')[1]; 
  commentListObserver.observe(tartgetNode, { childList: true })
}