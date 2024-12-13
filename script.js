var _base64 = '';
var _page ='';
$('#cng').click(function () {
  let c = ['red', null, 'blue', null, 'green', 'yellow', null].sort(
    () => 0.5 - Math.random()
  );
  showPdf('pdf-container',_base64, c[0], Number($("#customRange1").val()))
});

$('#file').change(async (ev) => {
  _base64 = await getBase64(ev.target.files[0]);
  showPdf('pdf-container',_base64, 'red',Number($("#customRange1").val()))
});
$("#customRange1").change((ev)=>{
  
  showPdf('pdf-container',_base64, 'red',Number(ev.target.value))
    


})
 function showPdf(id,pdfData, colorList = null,zoom) {
  let container = document.getElementById(id);
  container.innerHTML = '';
  pdfjsLib.getDocument({ data: atob(pdfData) }).promise.then((pdf) => {
    let pageNo = Math.floor(Math.random() * pdf._pdfInfo.numPages + 1);
    pdf.getPage(pageNo).then(function (page) {
      let canvas = document.createElement('canvas');
      canvas.className='load';
      let context = canvas.getContext('2d');

  

      container.appendChild(canvas);
  

      let outputScale = window.devicePixelRatio || 1;

      const viewport = page.getViewport({ scale: zoom});
    
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height =  Math.floor(viewport.height) + "px";
    
        
        page.render({ canvasContext: context, viewport: viewport }).promise.then((resp) => {
          if (colorList != null) {
            context.strokeStyle = colorList;
            context.strokeRect(rn(300), rn(300), rn(300), rn(300));
            context.strokeRect(rn(300), rn(300), rn(300), rn(300));
          }
        });

    });
  });

}
function getBase64(pdfInput) {
  return new Promise((a, b) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      a(e.target.result.split(',')[1]);
    };
    reader.onerror = function (error) {
      console.error('Error reading the file:', error);
      b(error);
    };

    reader.readAsDataURL(pdfInput);
  });
}
function rn(num) {
  return Math.floor(Math.random() * num + 1);
}

