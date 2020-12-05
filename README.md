# Pengjie-Zhou-Xiaowei-Dong-assignment3



#### Describe your data model and schema. How did Mongoose make this easy or hard to express?
We defined three properties in the URL schema: longUrl, shortUrl and date, they are all of 'String' type. The longUrl represents the original URL link, the shortUrl represents the shortened path ID, the date is the current local date when the shortUrl is generated.<br>
Mongoose makes it hard to find the existence of query object. It use callback function to handle the next steps, including errors. I find it difficult to use this way in `deleteOne()` query.

#### Have you worked with databases before? How was this different or similar? If you’ve not worked with databases before, describe your challenges and ease in representing this data.
I used MySQL before. The similarity with MySQL and MongoDB is that we have to generate schemas for user input in both databases. However, the ways of schema design in MySQL and MongoDB are different: We have to adapt objects in code in normalisation due to MySQL's rigid relational structure. In this assignment, MongoDB provides us a more flexible data model and stores data as JSON-like documents. 

#### Respond to some of the questions or considerations from the Error Handling and Complications section of the assignment.
1. *What if the same URL is submitted by multiple users?  Will you return a unique URL each time, or an already existing URL?*<br>
   
   For unbranded and branded url existed in our database, we will return the existed url instesd of creating a new one.<br>
   
2. *What if a user requests a branded URL that already exists.  How will you handle this scenario on the UI?*<br>
   Our application will generate an error message "There exist a branded short url as your input, you can edit it" to notify the user on the duplication.<br>

3. *How will you structure your data in MongoDB?  Will branded and unbranded URLs be stored and/or represented differently?* <br>
   Our application stores the branded and unbranded URLs in the same collection. <br>

4. *How will you handle the case if a user were to supply an invalid URL, or a string that isn’t a URL at all?*<br>

   We use a package called `valid-url` to validate the url. If it is not a valid url, we change the style of input field. There will be an error message "Not a valid url" under the link paste bar to notify the user on the error as well.<br>

5. *After a user deletes, what should you show on the UI?*<br>We assume user don't need to edit/delete unbranded url because they can easily create a new one. So didn't put the edit/delete function there.
   For the delete function, I encountered a problem using the callback of `deleteOne()` to check existence of url. So I use `findOne()` to check first and then `deleteOne()` to delete. If there is no url match the input, there will be a message `No url found for xxx, can't delete it`. If we delete it successfully, there will be a message `Successfully delete xxx`<br>

6. *What if users try to edit a URL that doesn’t exist?*<br>

   We will send a message `No url found for xxx`.<br>

#### Given more time, what additional features, functionality or design changes would you make?
Our current design enables the users to edit/delete any existing urls in the database. Given more time, we may implement functions to let the users to manage the urls they created but to prevent them to edit/delete urls generated by the other users. We are considering either of the two ways to realize this: 

1. Create user login so that each user will have an account to manage their own urls. 

2. Use cookies to identify a user. <br>

Also, the UI is not so friendly for a user without related experience. We can add more instructions.

We can also add feature to refresh the page to remove the previous message.

#### What assumptions, if any, did you make on this assignment?
We assume that once the user choose the generate an unbranded shortUrl, it can neither be edit nor delete (as the specification indicates that "users should NOT be able to modify the unique path ID"), therefore there's no edit/delete function in the Unbranded page. 

By contrast, the user should be able to edit/delete the longUrl and customize the shortenUrl, we thereby realise the edit/delete function in the Branded page. To make user clear on the differences between the "Branded" and "Unbranded" tag, we have given additional instructions on the home page.



Pengjie 'Crisp' Zhou <br>
Xiaowei Dong

