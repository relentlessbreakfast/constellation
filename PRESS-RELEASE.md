# Constellation #

<!-- 
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows. 

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->
 
## _A dependency-aware project management system for GitHub issues_ ##
  > Name the product in a way the reader (i.e. your target customers) will understand.

### Project managers and dev teams now have an interactive project roadmap and dashboard ###

## Summary ##

Constellation is a project management system that interfaces with GitHub to track issues. Constellation tracks and visually represents task/issue dependencies in a *[Hasse diagram](http://en.m.wikipedia.org/wiki/Hasse_diagram)*, a simplified directional graph that gives project managers a visual project roadmap that doubles as a progress dashboard for sub-projects. The state of completion of the project can be assessed at a glance, making it easier to prioritize tasks and make decisions based on the state of the project.

## Problem ##

Existing issue-tracking project managers such as Waffle.io do not track and visually represent the hierarchy of tasks and their dependencies on other tasks, whereas projects inevitably have such hierarchies and dependencies. The hierarchy of tasks currently afforded by Waffle depends on GitHub's milestones, which cannot be nested and only goes one level deep, while having no visual representation of this heirarchy besides a label on each task's Waffle tile. In real life, many projects have sub-projects which contain tasks that can further be broken down into sub-tasks; In order to map out and and manage complex projects with a dashboard, the project management system must be able to handle project hierarchies with greater depth.

## Solution ##

Constellation shows inter-task dependencies as a Hasse diagram, a kind of graph where the arrangement and connections between the nodes immediately conveys the sequence of pre-requisite tasks. Bottle-necks in the project become visually apparent, as do parts of the project that can be completed in parallel. Hasse diagrams are also capable of representing the project at different resolutions; clusters of related tasks and sub-projects can have their inner complexity hidden by being collapsed down into a single node, letting the user see the project map at the appropriate level of detail.

## A word from our developers ##
  > We designed a project management tool that addresses our own project management pain points. Finally, with a tool capable of mapping and planning out projects, and the capability to load up project templates that save you the work of mapping out the tasks that remain the same from project to project, you can plan the use of your time and resources with far less managerial decision making overhead. 

## How to Get Started ##

  To get started, sign in with GitHub, and start placing nodes on the graph space, or chose one of our project templates. Select each node to edit its task details, or convert a node into a sub-project (a cluster of related tasks). Each task you add to the project automatically adds a corresponding GitHub issue. Resolving an issue in GitHub resolves the issue in Constellation.

## Customer Quote ##
	> We used to spend a significant amount of time prioritizing and assigning tasks to keep everyone on our team busy; with Constellation, we no longer need to manually gather the details needed to make a sound decision. Whether any set of tasks can be worked on in parallel or in series is immediately apparent. We make decisions more fluidly and are more efficient with the use of our time and the assignment of our engineers.


## Closing and Call to Action ##
  
  If you use GitHub to manage your project workflow, head over to Constellation and try it out.

