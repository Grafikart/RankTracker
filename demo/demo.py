from trueskill import Rating, quality_1vs1, rate_1vs1, TrueSkill
env = TrueSkill(mu=30, sigma=8.33)
alice, bob = env.create_rating(), env.create_rating()  # assign Alice and Bob's ratings
print(quality_1vs1(alice, bob))
