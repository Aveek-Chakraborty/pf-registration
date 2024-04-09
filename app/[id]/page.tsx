"use client";

import { useState } from "react";

export default function SuccessPage({ params }: any) {
    return (
        <div className="h-screen max:h-screen-auto flex flex-col justify-center items-center bg-gradient-to-br from-orange-500/35 via-blue-300 to-purple-400/40">
            <div className="bg-white rounded-[10px] p-10 flex flex-col justify-between">
                <h2 className="font-semibold text-green-600 text-xl">Successfully registered!</h2>
                <h4 className="text-center">Unique Code: {params.id}</h4>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATkSURBVO3BQY4cSRIEQdNA/f/Lujz6KYBEejWbsyaCf6RqyUnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXok5eA/CQ1E5BJzQ2QGzU3QG7U3AC5UTMB+Ulq3jipWnRSteikatEny9RsArJJzQTkBsiNmgnIjZo31GwCsumkatFJ1aKTqkWffBmQJ9Q8oeYGyKRmUjMBeUPNBGQCcqPmCSBPqPmmk6pFJ1WLTqoWffKPA/IGkEnNE0Bu1ExAJjX/JSdVi06qFp1ULfrkH6fmBsgTQCY1N2omIE8AmdT8y06qFp1ULTqpWvTJl6n5SUAmNU+omYBMan4TNb/JSdWik6pFJ1WLPlkG5CcBmdRMQCY1m4BMaiYgk5oJyBNAfrOTqkUnVYtOqhZ98pKa30zNBGRSMwF5Qs0E5Ak1N2r+JSdVi06qFp1ULfrkJSCTmgnIjZoJyBNqboBMaiYgbwC5UTMBmdTcAJnU3ACZ1ExAbtS8cVK16KRq0UnVok9eUvOEmgnIjZpvUvMEkBs1E5AbIDdqJiC/2UnVopOqRSdViz55CcikZlIzAZnU3ACZ1LwB5EbNBORGzQRkUnMD5A01E5AJyI2aTSdVi06qFp1ULfrkJTU3QCY1E5AbNROQGzVvAHlDzQ2QGzUTkEnNE2omIBOQSc0bJ1WLTqoWnVQtwj/yg4BMaiYgN2pugLyh5gkgT6j5JiA3aiYgk5o3TqoWnVQtOqlahH/kBwGZ1DwBZFLzBpAbNW8AuVFzA+RGzRtAJjVvnFQtOqladFK16JNlQCY1N0AmNROQSc0E5Ak1k5obIJOaGyBvAHkDyN90UrXopGrRSdWiT14CMqmZgExqboBMaiYgT6i5AXKjZgIyqblRMwGZgExqNqn5SSdVi06qFp1ULcI/sgjIpGYCcqNmAjKpmYBMaiYgT6h5A8gmNTdAnlDzTSdVi06qFp1ULcI/8kVAJjVvAHlCzRNAJjXfBORGzQRkUvObnFQtOqladFK16JOXgExqJjVPALlRMwGZ1ExAnlCzCcikZhOQSc3fdFK16KRq0UnVok9eUnMD5EbNjZobNROQbwLyhJo3gNyomYDcqJmATGreOKladFK16KRq0SfLgGwCMqmZgDyhZgIyAZnUPKHmBsgmIE8AmdRsOqladFK16KRq0SfL1Lyh5jcBcqPmBsikZgIyqXkCyKTmBsgEZFLzxknVopOqRSdViz55CchPUnOjZgJyo2YCMql5AsgNkCeATGpugDyhZtNJ1aKTqkUnVYs+WaZmE5AngExqnlDzBJAn1ExAbtQ8oeYJIJOaN06qFp1ULTqpWvTJlwF5Qs0Tam6A3Ki5AfKEmjeAbALyk06qFp1ULTqpWvTJPw7IpGZS8wSQGzUTkAnIpOYNNROQGyCTmgnIpGbTSdWik6pFJ1WLPvk/A2RSM6mZgNyomYDcAJnUvKFmAjIBmdRMQCY1b5xULTqpWnRSteiTL1PzTWomIJOaGyA3aiYgTwC5AfIGkBs1E5BJzaaTqkUnVYtOqhZ9sgzITwJyA2RSMwGZ1NyomYBsUvMEkEnN33RSteikatFJ1SL8I1VLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkX/A1ILOFUfK4WnAAAAAElFTkSuQmCC"></img>
            </div>
        </div>
    )
}