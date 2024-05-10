const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC"
});

export const formatDateFromMs = (ms) => dateFormatter.format(ms);

export function saveToPdf(input, path) {

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        imgData.fontcolor("black");
        console.log("TEXT CONTENT")
        console.log(canvas.textContent.toString());
        console.log("END TEXT CONTENT");
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(path);
      });
}
