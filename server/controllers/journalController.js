const Journal = require("../models/journalModel");

async function getJournal(req, res) {
  try {
    const journals = await Journal.find();

    res.status(200).json(journals);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getSingleJournal(req, res) {
  try {
    const journal = await Journal.findById(req.params.journalId);

    if (!journal) {
      return res.status(404).send("Journal not found");
    }

    res.status(200).json(journal);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function postJournal(req, res) {
  const journal = new Journal(req.body);

  try {
    //When we connect to the db then I will uncomment this, for now we can test on postman without this line
    await journal.save();

    res.status(201).send(journal);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function postPageInJournal(req, res) {
  try {
    const journal = await Journal.findById(req.params.journalId);

    if (!journal) {
      return res.status(404).send("Journal not found");
    }

    // my req.body will be a page so I can simply just push it
    journal.pages.push(req.body);

    await journal.save();

    res.status(201).send(journal);
  } catch (error) {
    res.status(500).send(error);
  }
}

//Just updated the title and shortDescription so that the pages in it arent affected
async function updateJournal(req, res) {
  try {
    const { title, shortDescription, color, pattern } = req.body;

    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.journalId,
      { title, shortDescription, color, pattern }, // update only these fields
      { new: true, runValidators: true }
    );

    if (!updatedJournal) {
      return res.status(404).send("Journal not found");
    }

    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//This basically updates the page and analysis is the user wants to do that or else it only updates page using query parameters
async function updatePageInJournal(req, res) {
  const { text, aiAnalysis } = req.body;

  const updateAI = req.query.updateAI === "true";

  try {
    const journal = await Journal.findById(req.params.journalId);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    console.log(journal.pages[0]);
    const pageIndex = journal.pages.findIndex((page) =>
      page.pageId.equals(req.params.pageId)
    );

    if (pageIndex === -1) {
      return res.status(404).json({ message: "Page not found" });
    }

    journal.pages[pageIndex].text = text;

    // If updateAI is true, generate and update AI analysis
    if (updateAI) {
      // I want to update the AI analysis for the page
      journal.pages[pageIndex].aiAnalysis = aiAnalysis;
    }

    await journal.save();

    res.json(journal.pages[pageIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteJournal(req, res) {
  try {
    const deletedJournal = await Journal.findByIdAndDelete(
      req.params.journalId
    );

    if (!deletedJournal) {
      return res.status(404).send("Journal not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deletePageInJournal(req, res) {
  try {
    const journal = await Journal.findById(req.params.journalId);

    //I want to now loop through the whole pages array and see if the pageId matches if it does I delete
    const pageIndex = journal.pages.findIndex((page) =>
      page.pageId.equals(req.params.pageId)
    );

    if (pageIndex > -1) {
      journal.pages.splice(pageIndex, 1);

      await journal.save();

      return res.status(202).send(journal);
    } else {
      res.status(404).send("Page not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getJournal,
  getSingleJournal,
  postJournal,
  postPageInJournal,
  updateJournal,
  updatePageInJournal,
  deleteJournal,
  deletePageInJournal,
};
