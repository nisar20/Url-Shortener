const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ShortURL = require("./models/shortURL");
const generateShortURL = require("./public/shortid");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://nisar:Leovaldez147369@cluster0.h2m1n6y.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls", (req, res) => {
  ShortURL.find({})
    .then((urls) => {
      res.render("index", { urls: urls });
    })
    .catch((err) => {
      console.error("Error retrieving URLs:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/results", (req, res) => {
  const searchTerm = req.query.searchTerm;

  ShortURL.find({
    $or: [
      { originalURL: { $regex: searchTerm, $options: "i" } },
      { shortURL: { $regex: searchTerm, $options: "i" } },
      { notes: { $regex: searchTerm, $options: "i" } },
    ],
  })
    .then((urls) => {
      res.render("results", { urls: urls });
    })
    .catch((err) => {
      console.error("Error searching:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/shorten", (req, res) => {
  const { originalURL, notes } = req.body;

  // Validate the URL format
  const isValidURL = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!isValidURL.test(originalURL)) {
    return res.status(400).send("Invalid URL");
  }

  ShortURL.findOne({ originalURL })
    .then((existingURL) => {
      const shortURL = generateShortURL();

      const newURL = new ShortURL({
        originalURL,
        shortURL,
        notes,
      });

      newURL
        .save()
        .then(() => {
          res.redirect(`/url/${shortURL}`);
        })
        .catch((err) => {
          console.error("Error saving URL:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error("Error finding URL:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/url/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;

  ShortURL.findOne({ shortURL: shortURL })
    .then((url) => {
      if (url) {
        res.render("url", { url: url });
      } else {
        res.status(404).send("URL not found");
      }
    })
    .catch((err) => {
      console.error("Error retrieving URL:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/database", (req, res) => {
  ShortURL.find({})
    .then((urls) => {
      res.render("database", { urls: urls });
    })
    .catch((err) => {
      console.error("Error retrieving URLs:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;

  ShortURL.findOne({ shortURL: shortURL })
    .then((url) => {
      if (url) {
        url.clicks = url.clicks + 1;
        url.save();

        res.redirect(url.originalURL);
      } else {
        res.status(404).send("URL not found");
      }
    })
    .catch((err) => {
      console.error("Error retrieving URL:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/view", (req, res) => {
  ShortURL.find({})
    .then((urls) => {
      res.render("index", { urls: urls });
    })
    .catch((err) => {
      console.error("Error retrieving URLs:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Catch-all route
app.get("*", (req, res) => {
  res.render("index", { urls: [] });
});
