/**
 * Created by claysissing on 18/08/2016.
 */


export function SwdHead () {
    
    const urlData = {
        animate: '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.min.css',
        defer: 'css/defer.min.v2.css'
    }
    
    if( $(".swd-header").size() > 0) {
        if (document.createStyleSheet){
            document.createStyleSheet(urlData.animate);
            document.createStyleSheet(urlData.defer);
        } else {
            $("head").append($("<link rel='stylesheet' href=" + urlData.animate + ">"));
            $("head").append($("<link rel='stylesheet' href=" + urlData.defer + ">"));
        }
    }
}