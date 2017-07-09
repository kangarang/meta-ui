pragma solidity ^0.4.8;

// token voting
// import "./HumanStandardToken.sol";

/// @title Ballot
/// @author kangarang
contract Ballot {

    struct Voter {
        bool voted;     // if true, already voted
        uint vote;      // index of voted proposal
    }

    struct Proposal {
        address proposal;   // address of the proposed account
        uint voteCount;     // number of votes
    }

    // address public king;
    // address public wallet;
    // HumanStandardToken public token;

    // state variable that stores a Voter struct for each possible address
    mapping(address => Voter) public voters;

    // dynamic-sized array of Proposal structs
    Proposal[] public proposals;

    // modifier onlyKing {
    //     require(msg.sender == king);
    //     _;
    // }

    function Ballot(
        address[] _proposalNames
    ) {
        // used for declaring the right to vote
        // king = msg.sender;
        
        // for each of the proposals,
        // make a new Proposal struct, 
        // push it to the public array of proposals
        for (uint i = 0; i < _proposalNames.length; i++) {
            proposals.push(Proposal({
                proposal: _proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // only useful if Voters have a weight
    // used for delegating votes to other voters
    // function giveRightToVote(address _voter)
    //     onlyKing
    // {
    //     require(!voters[_voter].voted && (voters[_voter].weight == 0));
    //     voters[_voter].weight = 1;
    // }

    // raise a vote to a proposal
    function vote(uint _proposal) {
        // create a sender variable using the Voter struct
        Voter sender = voters[msg.sender];
        // make sure the sender hasn't voted yet
        require(!sender.voted);
        // set voted to true, and the vote to the index of the _proposal
        sender.voted = true;
        sender.vote = _proposal;
        proposals[_proposal].voteCount += 1;
    }

    // get the winning proposal by looking at all the votes
    function winner() constant returns (uint winner) {
        // start the count at 0
        uint winningVoteCount = 0;
        // loop through proposals
        for (uint p = 0; p < proposals.length; p++) {
            // if a proposal's vote count is greater than the current winning vote count,
            // that proposal is the new winner
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winner = p;
            }
        }
    }

}
