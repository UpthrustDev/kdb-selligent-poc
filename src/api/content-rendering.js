// src/api/content-rendering.js

import { parse } from 'querystring';
import fetch from 'node-fetch';

// Helper function to build query parameters
const buildParams = (params, idParam) => {
  let queryParams = '';
  for (const [key, value] of Object.entries(params)) {
    if (key.toUpperCase() !== idParam.toUpperCase()) {
      queryParams += `&${key}=${encodeURIComponent(value)}`;
    }
  }
  return queryParams ? `?${queryParams.slice(1)}` : '';
};

// Helper function to get site URL
const getSiteURL = (req) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  return `${protocol}://${req.headers.host}`;
};

export default async function handler(req, res) {
  const client = "longtale";
  const newDomain = true;
  const defaultID = "kTPsJ%2BzeZKibmRzaXAQUkiZaKUfppJlc6XfeRwUTQh2GVt%2BFxLUfyX0Ksy59ezAcdrS%2BLf94SS";
  const idParam = "ID";

  let domain = newDomain ? "slgnt.eu" : "emsecure.net";
  let parameters = buildParams(req.query, idParam) + buildParams(req.body, idParam);
  let selligentID = req.query[idParam] || defaultID;

  if (client && idParam && selligentID) {
    const cr_url = `/renderers/content/Json/`;
    const optiext = "/optiext/optiextension.dll";
    const xmldoc = `https://${client}.${domain}${cr_url}${encodeURIComponent(selligentID)}${parameters}`;

    try {
      const response = await fetch(xmldoc, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Unable to reach the Selligent platform.');
      }

      const selligentContent = await response.json();
      let { Head: msgHeadStr, Attributes: msgBodyAttrStr, Body: msgBodyStr } = selligentContent;

      // Replace all URLs with your own URL
      msgBodyStr = msgBodyStr.replace(`https://${client}.${domain}${optiext}`, getSiteURL(req));

      res.status(200).json({
        head: msgHeadStr,
        body_attr: msgBodyAttrStr,
        body: msgBodyStr,
      });
    } catch (error) {
      res.status(500).json({
        head: '',
        body_attr: '',
        body: `<script>console.log('[CR_OUTPUT]: ${error.message}')</script>`,
      });
    }
  } else {
    res.status(400).json({
      head: '',
      body_attr: '',
      body: `<script>console.log('[CR_OUTPUT]: Missing the install-name, id parameter name or the Selligent hash. Check the settings')</script>`,
    });
  }
}
