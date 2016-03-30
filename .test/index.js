#!/usr/bin/env node
var
  maskpass= require(".."),
  tape= require("tape")

tape("can cleanly copy a passwordless object", function(t){
	var
	  o= {a: 1, b: 2, c: function(){ return 3 }},
	  masked= maskpass(o)

	t.deepEqual(masked, o, "successful clone")
	masked.a= 2
	t.equal(o.a, 1, "changes to masked object do not effect original")
	t.end()
})

tape("can mask an object", function(t){
	var
	  o={
		username: "acidburn",
		password: "<3s0cool",
		pAsswOrd: "capcrazy",
		gibson_password: "randorun",
		some_PASSWORD_caps: "secureit"
	  },
	  stars= "********",
	  masked= maskpass(o)
	t.equal(Object.keys(masked).length, 5, "has same number of slots")
	t.equal(masked.username, "acidburn", "username is preseved")
	t.equal(masked.password, stars, "password is masked")
	t.equal(masked.pAsswOrd, stars, "pAsswOrd is masked")
	t.equal(masked.gibson_password, stars, "gibson_password is masked")
	t.equal(masked.some_PASSWORD_caps, stars, "some_PASSWORD_caps is masked")
	t.end()
})

tape("can mask a number field", function(t){
	var
	  o= {
		myPassword: 5551212
	  },
	  masked= maskpass(o)
	t.equal(masked.myPassword, "*******", "number is masked")
	t.end()
})
