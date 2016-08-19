/**
 * Created by claysissing on 18/08/2016.
 */

export function ReadMore() {
    
    let readMore        = document.querySelector('#swd-readBtn'),
        readMoreCl      = readMore.classList,
        arrowBoxDown    = 'arrow-box_down',
        arrowBoxUp      = 'arrow-box_up';
    
    if (readMore) {
        
        readMore.addEventListener('click', (ele) => {
        
            ele.preventDefault();
            document.querySelector('#swd-readMore').classList.toggle('swd-hidden');
            
            if (readMore.classList.contains(arrowBoxDown)) {
                readMoreCl.remove(arrowBoxDown);
                readMoreCl.add(arrowBoxUp);
                $('.swd-readBtn_more').hide();
                $('.swd-readBtn_less').fadeIn();
            } else {
                readMoreCl.remove(arrowBoxUp);
                readMoreCl.add(arrowBoxDown);
                $('.swd-readBtn_less').hide();
                $('.swd-readBtn_more').fadeIn();
            }
        }, false);
    }
}