export interface ProposalData {
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  projectOverview: string;
  pagesOverview: string[];
  pagesNote: string;
  paymentCost: string;
  paymentSchedule: string[];
  contactInfo: string;
  references: { title: string; url: string }[];
  addedValue: string[];
  timeline: string[];
  notes: string[];
}

export const generateProposalHtml = (data: ProposalData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposal - ${data.clientName || 'Client'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #E8E4D9;
      margin: 0;
      padding: 0;
      width: 794px; /* A4 Width at 96 DPI */
      height: 1123px; /* A4 Height */
      overflow: hidden; /* For fixed A4 PDF generation */
      color: #000;
    }
    .main-container {
      width: 794px;
      height: 1123px;
      padding: 30px;
      box-sizing: border-box;
      position: relative;
    }
    .card-border {
      border: 1px solid #000;
      border-radius: 20px;
      background-color: transparent;
      padding: 1rem;
    }
    .pink-header {
      background-color: #c53a65;
      color: white;
      border-radius: 9999px; /* full rounded */
      text-align: center;
      padding: 0.25rem 1rem;
      font-weight: 700;
      border: 1px solid #000;
      margin: 0.5rem 0;
      text-transform: uppercase;
    }
    .header-logo {
      color: #d13b63;
      font-weight: 800;
      font-size: 2rem;
      line-height: 1;
      margin-bottom: 0.25rem;
    }
  </style>
</head>
<body>
  <div class="main-container flex flex-col gap-4">
    
    <!-- Top Row -->
    <div class="flex justify-between items-start">
      <!-- Logo Side -->
      <div class="flex flex-col">
        <div class="header-logo pt-2">DIZIGROWW<span style="color:red; font-size:1.5rem">↑</span></div>
        <div class="text-[0.6rem] tracking-[0.2em] font-bold mb-2">DESIGN • DEVELOP • SELL</div>
        <div class="font-bold text-sm">GSTIN: 092500425588TRN</div>
        
        <div class="mt-8 font-bold border-b-2 border-black pb-1 inline-block text-sm">
          CLIENT NAME: <span class="text-blue-700">${data.clientName || ''}</span>
        </div>
        ${(data.clientPhone || data.clientEmail) ? `
        <div class="mt-2 text-xs font-semibold space-y-1">
          ${data.clientPhone ? `<div>PHONE: <span class="text-gray-700 font-normal">${data.clientPhone}</span></div>` : ''}
          ${data.clientEmail ? `<div>EMAIL: <span class="text-gray-700 font-normal">${data.clientEmail}</span></div>` : ''}
        </div>
        ` : ''}
      </div>

      <!-- Contact Info Card -->
      <div class="card-border w-[350px] text-[0.85rem] leading-tight space-y-3">
        <div class="flex items-start gap-2">
          <div class="text-[#c53a65] mt-[2px]">📍</div>
          <div>TECHNOLOGY BUSINESS INCUBATOR-NIET<br/>19, Knowledge Park II, Institutional Area,<br/>Greater Noida, Uttar Pradesh.</div>
        </div>
        <div class="flex items-start gap-2">
          <div class="text-[#c53a65] mt-[2px]">📞</div>
          <div>+91-9450010826</div>
        </div>
        <div class="flex items-start gap-2">
          <div class="text-[#c53a65] mt-[2px]">✉️</div>
          <div>dizigrowwofficial@gmail.com</div>
        </div>
        <div class="flex items-start gap-2">
          <div class="text-[#c53a65] mt-[2px]">🌐</div>
          <div>www.dizigroww.com</div>
        </div>
      </div>
    </div>

    <!-- Main Content 2 Columns -->
    <div class="grid grid-cols-2 gap-6 mt-4 flex-grow">
      
      <!-- Left Column -->
      <div class="flex flex-col gap-4">
        
        <!-- Project Overview -->
        <div class="card-border border-b-[2px] border-r-[2px] text-sm relative">
          <div class="font-bold text-center mb-1">PROJECT OVERVIEW:</div>
          <div class="text-gray-800 leading-snug">
            ${data.projectOverview?.replace(/\n/g, '<br/>') || ''}
          </div>
        </div>

        ${data.pagesOverview && data.pagesOverview.length > 0 ? `
        <div class="pink-header w-[90%] mx-auto relative z-10 translate-y-2">DELIVERABLES</div>
        <div class="card-border pb-6 pt-5 text-sm h-full max-h-[290px] overflow-hidden">
          <div class="font-bold mb-3 uppercase">PAGES OVERVIEW</div>
          <ol class="list-decimal pl-5 space-y-1 mb-4">
            ${data.pagesOverview.map(page => `<li>${page}</li>`).join('')}
          </ol>
          <div class="text-xs font-semibold whitespace-pre-line">
            ${data.pagesNote || ''}
          </div>
        </div>
        ` : ''}

        <div class="pink-header w-[90%] mx-auto relative z-10 translate-y-2">PAYMENT TERMS</div>

        <!-- Payment Terms -->
        <div class="card-border text-sm pt-5">
          <ul class="list-disc pl-5 space-y-1 mb-3">
            <li>The total cost the project will be <b>${data.paymentCost || ''}</b> The payment has to be</li>
            <li>made in ${data.paymentSchedule?.length || 0} installment as follows:</li>
          </ul>
          <ol class="list-decimal pl-5 ml-4 space-y-0 text-sm">
            ${data.paymentSchedule?.map(schedule => `<li>${schedule}</li>`).join('') || ''}
          </ol>
          <div class="mt-4 text-xs font-bold font-inter">
            CONTACT INFORMATION:<br/>
            <span class="font-normal border-b border-black pb-1">For any queries or additional information, please contact: ${data.contactInfo || ''}</span>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="flex flex-col gap-4">
        
        ${data.references && data.references.length > 0 ? `
        <div class="pink-header w-[90%] mx-auto relative z-10 translate-y-2">DESIGN INSPO & Reffence Website</div>
        <div class="card-border pt-6 pb-4 text-center text-lg">
          <div class="flex flex-col items-center justify-center h-full gap-1 text-blue-600 underline">
            ${data.references.map((ref, i) => `<a href="${ref.url}" class="hover:text-blue-800">${ref.title || ('Reference ' + (i+1))}</a>`).join('')}
          </div>
        </div>
        ` : ''}

        ${data.addedValue && data.addedValue.length > 0 ? `
        <div class="pink-header w-[90%] mx-auto relative z-10 translate-y-2">ADDED VALUE</div>
        <div class="card-border pt-6 pb-4 text-sm">
          <ul class="list-disc pl-5 space-y-2">
            ${data.addedValue.map(value => `<li>${value.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${data.timeline && data.timeline.length > 0 ? `
        <div class="pink-header w-[80%] mx-auto relative z-10 translate-y-2">TIMELINE</div>
        <div class="card-border pt-6 pb-4 text-sm">
          <ul class="list-disc pl-5 space-y-1">
            ${data.timeline.map(item => `<li>${item.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${data.notes && data.notes.length > 0 ? `
        <div class="pink-header w-[80%] mx-auto relative z-10 translate-y-2">NOTE</div>
        <div class="card-border pt-6 pb-4 text-xs">
          <ul class="list-disc pl-4 space-y-2 leading-tight">
             ${data.notes.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

      </div>

    </div>
  </div>
</body>
</html>
  `;
};
