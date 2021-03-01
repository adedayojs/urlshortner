import express from 'express';
import validator from 'validator';

import Url from '../models/Urls';

const Redirect = async (req: express.Request, res: express.Response) => {
  const { shortid } = req.query;
  // Return error if short id isn't supplied
  if (!shortid || typeof shortid !== 'string') {
    return res.status(400).json({ msg: 'id not provided' });
  }

  try {
    const URL = await Url.findOne({ shortId: shortid });
    // Return error if url isn't registered otherwise redirect user to associated page
    if (!URL) {
      return res.status(404).json({ msg: 'invalid url id' });
    }
    return res.redirect(URL.url);
  } catch (error) {
    // Error handling
    console.error(error);
    return res.status(500).json({ msg: 'some error occured' });
  }
};

const AddUrl = async (req: express.Request, res: express.Response) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ msg: 'url not provided' });

  if (
    !validator.isURL(url, {
      require_protocol: true,
    })
  )
    return res.status(400).json({ msg: 'invalid url' });

  try {
    // Try to fetch the url from the database
    let URL = await Url.findOne({ url });

    // If it doesnt exist create a new one and send response
    if (!URL) {
      let newURL = new Url({ url });
      await newURL.save();
      return res.status(201).json({ shortId: newURL.shortId, url });
    }

    // if it exists, return the url data for the sake of uniformity
    return res.status(200).json({ shortId: URL.shortId, url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'some error occured' });
  }
};

export { Redirect, AddUrl };
